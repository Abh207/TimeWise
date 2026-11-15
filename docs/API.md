# TimeWise REST API Reference

The backend runs on Express (`http://localhost:5000/api`).

## Endpoints

### Health
- `GET /api/health`: Health status and service timestamp.

### Events & Timetable
- `GET /api/events`: Fetch all scheduled events.
- `POST /api/events`: Schedule a new timetable event.
- `PUT /api/events/:id`: Update event time or details.
- `DELETE /api/events/:id`: Remove event.
- `GET /api/events/conflicts`: Run conflict detection engine on all events.

### Tasks
- `GET /api/tasks`: Fetch all tasks with smart priority scores.
- `POST /api/tasks`: Create task (auto-calculates smart priority score).
- `PUT /api/tasks/:id`: Update task or toggle completion.
- `DELETE /api/tasks/:id`: Delete task.

### Habits & Streaks
- `GET /api/habits`: Fetch habits with streak telemetry.
- `POST /api/habits/:id/toggle`: Toggle completion for a specific date and update streak.

### Smart Planner
- `POST /api/planner/generate`: Execute explainable rule-based scheduler with parameters:
  ```json
  { "date": "2026-11-12" }
  ```

### Notifications
- `GET /api/notifications`: Fetch notification queue.
- `PUT /api/notifications/:id/read`: Mark notification as read.

### Analytics
- `GET /api/analytics/summary`: Returns planned vs actual hours and category distributions.

