import type { TimetableEvent, ScheduleConflict, Task } from '../types/index.js';

export class SchedulingEngine {
  /**
   * Detects overlaps between scheduled events and insufficient travel times
   */
  public static detectConflicts(events: TimetableEvent[]): ScheduleConflict[] {
    const conflicts: ScheduleConflict[] = [];
    const sorted = [...events].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const evA = sorted[i];
        const evB = sorted[j];

        const startA = new Date(evA.startTime).getTime();
        const endA = new Date(evA.endTime).getTime();
        const startB = new Date(evB.startTime).getTime();
        const endB = new Date(evB.endTime).getTime();

        // If event B starts after event A ends + buffer, no need to check further in sorted array
        const travelBufferA = (evA.travelTimeMinutes || 0) * 60 * 1000;
        if (startB >= endA + travelBufferA) {
          break;
        }

        // Direct overlap
        if (startB < endA) {
          const overlapMinutes = Math.round((Math.min(endA, endB) - Math.max(startA, startB)) / 60000);
          conflicts.push({
            eventA: evA,
            eventB: evB,
            overlapMinutes,
            resolutionSuggestion: `Move "${evB.title}" to start after "${evA.title}" ends at ${new Date(endA).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
          });
        } 
        // Insufficient travel buffer
        else if (startB < endA + travelBufferA) {
          const shortage = Math.round((endA + travelBufferA - startB) / 60000);
          conflicts.push({
            eventA: evA,
            eventB: evB,
            overlapMinutes: shortage,
            resolutionSuggestion: `Add ${shortage} min transit buffer between "${evA.title}" (${evA.location || 'Location'}) and "${evB.title}".`,
          });
        }
      }
    }

    return conflicts;
  }

  /**
   * Computes a Smart Priority Score (0 - 100) for a Task based on urgency, priority & duration
   */
  public static calculateSmartPriority(task: Partial<Task>): number {
    let score = 50;

    // Priority multiplier
    if (task.priority === 'urgent') score += 30;
    else if (task.priority === 'high') score += 20;
    else if (task.priority === 'medium') score += 10;
    else if (task.priority === 'low') score -= 10;

    // Due date urgency
    if (task.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);
      const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) score += 40; // Overdue!
      else if (diffDays === 0) score += 30; // Due today
      else if (diffDays === 1) score += 20; // Due tomorrow
      else if (diffDays <= 3) score += 10;
      else if (diffDays > 7) score -= 10;
    }

    return Math.min(100, Math.max(1, score));
  }

  /**
   * Rule-based Smart Planner Generator
   * Allocates high-priority tasks into free slots between existing events, accounting for energy levels
   */
  public static generatePlan(
    existingEvents: TimetableEvent[],
    tasks: Task[],
    date: string,
    userPreferences: { wakeTime: string; sleepTime: string } = { wakeTime: '07:00', sleepTime: '23:00' }
  ) {
    const dayEvents = existingEvents.filter(e => e.startTime.startsWith(date));
    const sorted = [...dayEvents].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    const pendingTasks = tasks
      .filter(t => !t.isCompleted)
      .sort((a, b) => b.smartPriorityScore - a.smartPriorityScore);

    const recommendations: {
      task: Task;
      suggestedStartTime: string;
      suggestedEndTime: string;
      confidenceScore: number;
      reason: string;
    }[] = [];

    // Base timeline bounds
    let currentSlotTime = new Date(`${date}T${userPreferences.wakeTime}:00`);

    for (const task of pendingTasks) {
      const durationMins = task.estimatedMinutes || 45;
      
      // Look for a gap in sorted events
      let foundSlot = false;
      for (const ev of sorted) {
        const evStart = new Date(ev.startTime);
        const evEnd = new Date(ev.endTime);

        if (evStart.getTime() - currentSlotTime.getTime() >= (durationMins + 15) * 60000) {
          // Found free slot!
          const slotEnd = new Date(currentSlotTime.getTime() + durationMins * 60000);
          recommendations.push({
            task,
            suggestedStartTime: currentSlotTime.toISOString(),
            suggestedEndTime: slotEnd.toISOString(),
            confidenceScore: 92,
            reason: `High priority task allocated to morning/afternoon focus window before "${ev.title}". Includes 15-min buffer.`
          });
          currentSlotTime = new Date(slotEnd.getTime() + 15 * 60000);
          foundSlot = true;
          break;
        }

        if (currentSlotTime < evEnd) {
          currentSlotTime = new Date(evEnd.getTime() + 15 * 60000); // 15 min buffer after event
        }
      }

      if (!foundSlot) {
        const sleepCutoff = new Date(`${date}T${userPreferences.sleepTime}:00`);
        const slotEnd = new Date(currentSlotTime.getTime() + durationMins * 60000);
        if (slotEnd <= sleepCutoff) {
          recommendations.push({
            task,
            suggestedStartTime: currentSlotTime.toISOString(),
            suggestedEndTime: slotEnd.toISOString(),
            confidenceScore: 85,
            reason: `Scheduled in evening deep-work block before sleep window. Fits within daily energy curve.`
          });
          currentSlotTime = new Date(slotEnd.getTime() + 15 * 60000);
        }
      }
    }

    return recommendations;
  }
}

