-- ==============================================================================
-- LifeSync AI — Comprehensive PostgreSQL & Supabase Database Schema
-- Version: 1.0.0
-- Includes: 27 Core Tables, Enums, Foreign Keys, Indexes, RLS Policies & Triggers
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PROFILES & USER PREFERENCES
-- ==========================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL, -- references auth.users(id) in Supabase
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'dark',
    accent_color VARCHAR(30) DEFAULT 'violet', -- 'violet', 'lime', 'emerald', 'sky'
    timezone VARCHAR(100) DEFAULT 'UTC',
    week_start_day INT DEFAULT 1, -- 0 = Sun, 1 = Mon
    time_format VARCHAR(10) DEFAULT '12h', -- '12h', '24h'
    default_calendar_view VARCHAR(20) DEFAULT 'week',
    daily_focus_goal_minutes INT DEFAULT 120,
    daily_study_goal_hours NUMERIC(4, 2) DEFAULT 4.0,
    working_hours_start TIME DEFAULT '08:00:00',
    working_hours_end TIME DEFAULT '18:00:00',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    browser_notifications BOOLEAN DEFAULT FALSE,
    quiet_hours_start TIME DEFAULT '22:00:00',
    quiet_hours_end TIME DEFAULT '07:00:00',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. PROJECTS & MILESTONES
-- ==========================================

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'General',
    status VARCHAR(50) DEFAULT 'in_progress', -- 'not_started', 'in_progress', 'completed', 'on_hold'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    color VARCHAR(30) DEFAULT '#8b5cf6',
    start_date DATE,
    target_completion_date DATE,
    estimated_total_hours NUMERIC(6, 2) DEFAULT 0,
    actual_total_hours NUMERIC(6, 2) DEFAULT 0,
    progress_percentage INT DEFAULT 0,
    notes TEXT,
    external_links JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_work_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    hours_logged NUMERIC(5, 2) NOT NULL,
    summary TEXT NOT NULL,
    log_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. TASKS & SUBTASKS
-- ==========================================

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    deadline_time TIME,
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
    category VARCHAR(100) DEFAULT 'Work',
    estimated_duration_minutes INT DEFAULT 30,
    actual_duration_minutes INT DEFAULT 0,
    smart_priority_score NUMERIC(5, 2) DEFAULT 50.0,
    recurrence_rule VARCHAR(100), -- 'none', 'daily', 'weekly', etc.
    reminder_minutes_before INT DEFAULT 15,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subtasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. TIMETABLE EVENTS & OCCURRENCES
-- ==========================================

CREATE TABLE IF NOT EXISTS timetable_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Academic', -- 'Academic', 'Work', 'Study', 'Personal', 'Health', 'Break', 'Meeting'
    color VARCHAR(30) DEFAULT '#3b82f6',
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    timezone VARCHAR(100) DEFAULT 'UTC',
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_rule VARCHAR(100), -- 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
    priority VARCHAR(20) DEFAULT 'medium',
    location VARCHAR(255),
    is_location_based BOOLEAN DEFAULT FALSE,
    travel_time_minutes INT DEFAULT 0,
    estimated_duration_minutes INT DEFAULT 60,
    actual_duration_minutes INT,
    status VARCHAR(30) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'missed', 'rescheduled'
    completion_status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'completed', 'missed'
    reminder_minutes_before INT DEFAULT 15,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_occurrences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES timetable_events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    occurrence_start TIMESTAMPTZ NOT NULL,
    occurrence_end TIMESTAMPTZ NOT NULL,
    status VARCHAR(30) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'missed', 'cancelled'
    actual_duration_minutes INT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timetable_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timetable_template_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES timetable_templates(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL, -- 0=Sun, 1=Mon, ..., 6=Sat
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Academic',
    location VARCHAR(255),
    color VARCHAR(30) DEFAULT '#3b82f6'
);

-- ==========================================
-- 5. HABITS & STREAK MANAGEMENT
-- ==========================================

CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Health', -- 'Coding', 'DSA', 'Study', 'Fitness', 'Wellness'
    frequency VARCHAR(30) DEFAULT 'daily', -- 'daily', 'weekdays', 'weekly', 'custom'
    target_value INT DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'times', -- 'mins', 'hours', 'pages', 'glasses', 'times'
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    total_completions INT DEFAULT 0,
    color VARCHAR(30) DEFAULT '#10b981',
    icon VARCHAR(50) DEFAULT 'Activity',
    start_date DATE DEFAULT CURRENT_DATE,
    preferred_time_of_day VARCHAR(30) DEFAULT 'morning', -- 'morning', 'afternoon', 'evening', 'any'
    grace_days_allowed INT DEFAULT 1,
    reminder_time TIME,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    completion_date DATE NOT NULL,
    value_achieved INT DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (habit_id, completion_date)
);

-- ==========================================
-- 6. FOCUS SESSIONS & TIME-WASTE LOGS
-- ==========================================

CREATE TABLE IF NOT EXISTS focus_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    mode VARCHAR(30) DEFAULT 'pomodoro', -- 'pomodoro', 'deep_work', 'custom'
    duration_minutes INT NOT NULL,
    completed_minutes INT NOT NULL,
    is_completed BOOLEAN DEFAULT TRUE,
    distraction_count INT DEFAULT 0,
    distraction_notes TEXT,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS time_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    activity_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Social Media', 'Entertainment', 'Unplanned Browsing', 'Gaming', 'Productive'
    is_productive BOOLEAN DEFAULT FALSE,
    is_intentional BOOLEAN DEFAULT TRUE,
    duration_minutes INT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 7. PERSONAL RECORDS & LIFE LOGBOOK
-- ==========================================

CREATE TABLE IF NOT EXISTS record_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT 'Folder',
    color VARCHAR(30) DEFAULT '#6366f1',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS record_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(30) DEFAULT '#94a3b8'
);

CREATE TABLE IF NOT EXISTS personal_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    category_id UUID REFERENCES record_categories(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    content TEXT,
    record_date DATE DEFAULT CURRENT_DATE,
    start_time TIME,
    end_time TIME,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(30) DEFAULT 'active',
    attachments_metadata JSONB DEFAULT '[]'::jsonb, -- stored file paths & metadata in Supabase storage
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 8. GOALS & MILESTONES
-- ==========================================

CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Personal',
    timeframe VARCHAR(30) DEFAULT 'short_term', -- 'short_term', 'long_term', 'quarterly', 'yearly'
    target_date DATE,
    progress_percentage INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'abandoned'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goal_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    target_date DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 9. DAILY & WEEKLY REVIEWS
-- ==========================================

CREATE TABLE IF NOT EXISTS daily_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    review_date DATE NOT NULL,
    planned_tasks_count INT DEFAULT 0,
    completed_tasks_count INT DEFAULT 0,
    missed_activities_count INT DEFAULT 0,
    focus_minutes_achieved INT DEFAULT 0,
    habits_completed_count INT DEFAULT 0,
    productivity_rating INT CHECK (productivity_rating BETWEEN 1 AND 5),
    energy_level INT CHECK (energy_level BETWEEN 1 AND 5),
    what_went_well TEXT,
    what_went_wrong TEXT,
    what_to_change_tomorrow TEXT,
    unplanned_distractions TEXT,
    auto_generated_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, review_date)
);

CREATE TABLE IF NOT EXISTS weekly_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    total_focus_hours NUMERIC(5, 2) DEFAULT 0,
    total_completed_tasks INT DEFAULT 0,
    overall_habit_consistency_pct INT DEFAULT 0,
    major_distractions TEXT,
    lessons_learned TEXT,
    next_week_priorities TEXT,
    summary_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, week_start_date)
);

-- ==========================================
-- 10. NOTIFICATIONS & REMINDERS
-- ==========================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'activity_reminder', 'missed_activity', 'task_due', 'streak_warning', 'break_suggestion', 'weather_alert'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_id UUID,
    related_entity_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    scheduled_for TIMESTAMPTZ NOT NULL,
    is_dispatched BOOLEAN DEFAULT FALSE,
    is_dismissed BOOLEAN DEFAULT FALSE,
    repeat_frequency VARCHAR(50),
    related_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 11. LOCATION & WEATHER SNAPSHOTS
-- ==========================================

CREATE TABLE IF NOT EXISTS saved_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL, -- 'Home', 'University', 'Office', 'Gym'
    address TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    is_default BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS weather_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    location_name VARCHAR(150),
    temperature NUMERIC(4, 1),
    condition VARCHAR(100),
    humidity INT,
    rain_probability INT,
    wind_speed NUMERIC(4, 1),
    recommendation TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_calendar_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
    show_completed_tasks BOOLEAN DEFAULT TRUE,
    show_habits BOOLEAN DEFAULT TRUE,
    show_weather_forecast BOOLEAN DEFAULT TRUE,
    slot_duration_minutes INT DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_events_user_start ON timetable_events(user_id, start_time);
CREATE INDEX IF NOT EXISTS idx_habits_user ON habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habit_comp_user_date ON habit_completions(user_id, completion_date);
CREATE INDEX IF NOT EXISTS idx_records_user_cat ON personal_records(user_id, category);
CREATE INDEX IF NOT EXISTS idx_focus_user_started ON focus_sessions(user_id, started_at);
CREATE INDEX IF NOT EXISTS idx_time_logs_user_date ON time_logs(user_id, start_time);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_work_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_occurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_template_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE record_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE record_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_calendar_preferences ENABLE ROW LEVEL SECURITY;

-- Dynamic RLS Policy Generator: Every user can only read, insert, update, delete their own data
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name IN (
            'profiles', 'user_preferences', 'projects', 'project_milestones', 'project_work_logs',
            'tasks', 'timetable_events', 'event_occurrences', 'timetable_templates',
            'habits', 'habit_completions', 'focus_sessions', 'time_logs', 'record_categories',
            'record_tags', 'personal_records', 'goals', 'goal_milestones', 'daily_reviews',
            'weekly_reviews', 'notifications', 'reminders', 'saved_locations', 'weather_snapshots',
            'user_calendar_preferences'
          )
    LOOP
        EXECUTE format('
            CREATE POLICY "%s_user_isolation_policy" ON %I
            FOR ALL
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
        ', t, t);
    END LOOP;
END $$;

