# Database Schema & Entity Relationships

## 1. Tables Specification
The database schema consists of 27 tables providing complete life and academic management:

1. `profiles`: User identity, wake/sleep hours, display preferences, level, and XP telemetry.
2. `user_preferences`: Theme, accent color, quiet hours, time format, calendar defaults.
3. `projects`: Technical and academic projects, deadlines, progress percentage, total hours logged.
4. `project_milestones`: Discrete sub-deliverables with order indexes and completion dates.
5. `project_work_logs`: Granular time investment records per project.
6. `tasks`: Prioritized to-dos with `smart_priority_score`, deadlines, and duration estimates.
7. `subtasks`: Granular checklist items inside a task.
8. `timetable_events`: Scheduled classes, study slots, workouts, and meetings.
9. `event_occurrences`: Concrete instances of recurring timetable activities.
10. `timetable_templates`: Reusable template schedules (e.g. CS Student, Tech Lead).
11. `timetable_template_items`: Slot blueprints belonging to a template.
12. `habits`: Daily/weekly habits, streak counts, colors, and unit goals.
13. `habit_completions`: Unique `(habit_id, completion_date)` log entries.
14. `focus_sessions`: Pomodoro and deep work durations, distraction counts and notes.
15. `time_logs`: Unplanned time leaks and intentional leisure audits.
16. `record_categories`: User-defined category folders for notes and logs.
17. `record_tags`: Tag keywords for cross-cutting queries.
18. `personal_records`: Life journal entries, mood, sleep, water, expenses, and notes.
19. `goals`: Long-term and short-term vision targets.
20. `goal_milestones`: Checkable milestones for each goal.
21. `daily_reviews`: Evening reflection notes, productivity ratings, and adjustments.
22. `weekly_reviews`: Weekly aggregate metrics, lessons learned, and priorities.
23. `notifications`: Alert queue with `action_type` for missed-event reviews.
24. `reminders`: Dispatched time-based alerts.
25. `saved_locations`: Physical venues with lat/lng coordinates and default flags.
26. `weather_snapshots`: Historic atmospheric condition logs.
27. `user_calendar_preferences`: Custom view toggles and slot durations.

## 2. Row Level Security (RLS)
Every table is locked down with strict multi-tenant user isolation:
```sql
CREATE POLICY "user_isolation_policy" ON table_name
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

