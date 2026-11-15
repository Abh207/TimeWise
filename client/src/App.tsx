import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public & Auth Pages
import { LandingPage } from './pages/public/LandingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Home Hub & Core Application Pages
import { HomeHubPage } from './pages/hub/HomeHubPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { TimetablePage } from './pages/timetable/TimetablePage';
import { SmartPlannerPage } from './pages/planner/SmartPlannerPage';
import { TasksPage } from './pages/tasks/TasksPage';
import { StreaksPage } from './pages/streaks/StreaksPage';
import { FocusPage } from './pages/focus/FocusPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { TimeAnalyticsPage } from './pages/analytics/TimeAnalyticsPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { RecordsPage } from './pages/records/RecordsPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { LocationPage } from './pages/location/LocationPage';
import { WeatherPage } from './pages/weather/WeatherPage';
import { ReviewsPage } from './pages/reviews/ReviewsPage';
import { GoalsPage } from './pages/goals/GoalsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { SubjectsPage } from './pages/subjects/SubjectsPage';
import { TravelPage } from './pages/travel/TravelPage';
import { InboxPage } from './pages/inbox/InboxPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { HelpPage } from './pages/help/HelpPage';

export function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Home Hub Route */}
        <Route path="/home" element={<AppLayout />}>
          <Route index element={<HomeHubPage />} />
        </Route>

        {/* Protected Application Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomeHubPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="timetable" element={<TimetablePage />} />
          <Route path="smart-planner" element={<SmartPlannerPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="streaks" element={<StreaksPage />} />
          <Route path="focus" element={<FocusPage />} />
          <Route path="time-analytics" element={<TimeAnalyticsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="records" element={<RecordsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="travel" element={<TravelPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
