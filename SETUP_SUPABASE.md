# Supabase Integration & Production Migration Guide

TimeWise is designed with a **decoupled architecture**. You can develop, test, and run the entire application right now without Supabase. When you are ready to connect a live Supabase project, follow these step-by-step instructions.

---

## Step 1: Create a Supabase Project
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Click **New Project**, select your organization, and choose a database region closest to your users.
3. Set a strong database password and create the project.

---

## Step 2: Apply Database Schema & Migrations
1. In your Supabase Dashboard, open the **SQL Editor** from the left sidebar.
2. Open the migration file in this repository:
   ```
   /supabase/migrations/20261111_init.sql
   ```
   *(Or `/database/schema.sql` for the full 27-table version with triggers and performance indexes).*
3. Copy and paste the entire script into the Supabase SQL Editor and click **Run**.
4. Verify that the tables (`profiles`, `events`, `tasks`, `habits`, `records`, `locations`, `notifications`, `goals`) appear under **Table Editor**.

---

## Step 3: Configure Environment Variables
Copy `.env.example` to `.env` in the root and in `/client`:
```bash
cp .env.example .env
```
Populate your Supabase Project URL and Anon Public Key from **Project Settings → API**:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...your-public-anon-key
```

---

## Step 4: Swap the Adapter Layer (Only 1 File!)
Open `client/src/services/authService.ts`.

Replace the localStorage mock methods with standard `@supabase/supabase-js`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In signIn:
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// In signUp:
const { data, error } = await supabase.auth.signUp({ email, password });

// In signOut:
await supabase.auth.signOut();
```
Because the rest of the application interacts with `authService` rather than directly calling database APIs, **no page or component needs to be rewritten!**

---

## Step 5: Row Level Security (RLS) Verification
All tables have Row Level Security enabled:
```sql
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users access own events" ON public.events FOR ALL USING (auth.uid() = user_id);
```
Authenticated users can only query, insert, or modify their own private rows.

