import type { UserProfile } from '../types';

const SESSION_KEY = 'timewise_auth_session';
const PROFILES_KEY = 'timewise_user_profiles';

const DEFAULT_USER: UserProfile = {
  id: 'usr-demo-01',
  email: 'alex.chen@university.edu',
  fullName: 'Alex Chen',
  displayName: 'Alex',
  role: 'student',
  wakeTime: '07:00',
  sleepTime: '23:00',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bio: 'CS & AI Undergraduate | Building intelligent systems & aiming for 4.0 GPA',
  level: 4,
  xp: 1420,
  onboardingCompleted: true,
  locationPermissionGranted: true,
  createdAt: new Date().toISOString()
};

export interface AuthSession {
  user: UserProfile;
  token: string;
  expiresAt: string;
}

/**
 * AuthService: Clean Adapter layer.
 * Currently uses localStorage simulation; to swap in Supabase,
 * replace these methods with supabase.auth calls.
 */
class AuthService {
  private getStoredProfiles(): Record<string, { passwordHash: string; profile: UserProfile }> {
    try {
      const data = localStorage.getItem(PROFILES_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private saveStoredProfiles(profiles: Record<string, { passwordHash: string; profile: UserProfile }>) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }

  public getSession(): AuthSession | null {
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      if (!sessionStr) {
        // Automatically provide demo session on first load if none exists
        this.saveSession(DEFAULT_USER);
        return {
          user: DEFAULT_USER,
          token: 'mock-jwt-token-demo',
          expiresAt: new Date(Date.now() + 86400000).toISOString()
        };
      }
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  }

  private saveSession(user: UserProfile): AuthSession {
    const session: AuthSession = {
      user,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  public async signIn(email: string, _password: string): Promise<AuthSession> {
    // Artificial small delay for realistic UI feedback
    await new Promise(r => setTimeout(r, 400));
    
    const profiles = this.getStoredProfiles();
    const existing = profiles[email.toLowerCase()];

    if (existing) {
      return this.saveSession(existing.profile);
    }

    // If signing in with demo email or new email, return default or initialized profile
    const user: UserProfile = {
      ...DEFAULT_USER,
      id: `usr-${Date.now()}`,
      email: email.toLowerCase(),
      fullName: email.split('@')[0],
      displayName: email.split('@')[0],
    };
    return this.saveSession(user);
  }

  public async signUp(email: string, _password: string, fullName: string): Promise<AuthSession> {
    await new Promise(r => setTimeout(r, 450));

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      email: email.toLowerCase(),
      fullName,
      displayName: fullName.split(' ')[0],
      role: 'student',
      wakeTime: '07:00',
      sleepTime: '23:00',
      level: 1,
      xp: 100,
      onboardingCompleted: false, // Will trigger onboarding modal
      locationPermissionGranted: false,
      createdAt: new Date().toISOString()
    };

    const profiles = this.getStoredProfiles();
    profiles[email.toLowerCase()] = { passwordHash: 'mock-hash', profile: user };
    this.saveStoredProfiles(profiles);

    return this.saveSession(user);
  }

  public async signOut(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
  }

  public async resetPassword(email: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 400));
    console.log(`[AuthService] Password reset token dispatched to ${email}`);
    return true;
  }

  public async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const session = this.getSession();
    if (!session) throw new Error('Not authenticated');

    const updated = { ...session.user, ...updates };
    this.saveSession(updated);

    const profiles = this.getStoredProfiles();
    if (profiles[updated.email.toLowerCase()]) {
      profiles[updated.email.toLowerCase()].profile = updated;
      this.saveStoredProfiles(profiles);
    }

    return updated;
  }
}

export const authService = new AuthService();

