import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import { UserProfile, UserAuth, AnalyticsEvent } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

const defaultProfile: UserProfile = {
  username: 'coach_alex',
  displayName: 'Coach Alex',
  bio: 'Helping you reach your fitness goals. 💪 | Certified Trainer',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  theme: {
    backgroundColor: '#f8fafc',
    buttonColor: '#0f172a',
    buttonTextColor: '#ffffff',
    textColor: '#0f172a',
    font: 'sans',
    layout: 'stack',
  },
  links: [
    { id: '1', type: 'header', title: 'My Offerings', active: true },
    { id: '2', type: 'link', title: '1:1 Online Coaching', url: 'https://example.com/coaching', active: true },
    { id: '3', type: 'link', title: 'Get my Free Workout Plan', url: 'https://example.com/freebie', active: true },
    { id: '4', type: 'video', title: 'Welcome to my page!', url: 'https://www.youtube.com/', active: true },
    { id: '5', type: 'link', title: 'Book a Consultation', url: '#booking', active: true },
  ],
};

// Default user for initial DB
const defaultUser: UserAuth = {
    id: 'user_alex',
    username: 'coach_alex',
    email: 'alex@example.com',
    passwordHash: '$2a$10$wI8a.N.9.1.1.1.1.1.1.1.1.1.1.1.1', // Mock hash, won't work with real bcrypt verify unless we use correct one. 
    // Actually let's not assume a hash. We will create it properly if needed.
    // For now, let's just leave it empty and handle it in code if we want to seed it.
    isPro: true,
    createdAt: new Date().toISOString()
};

interface DB {
  profiles: Record<string, UserProfile>;
  users: Record<string, UserAuth>; // Keyed by email for easy lookup, or username? Let's use username or email.
  analytics: AnalyticsEvent[];
}

async function getDB(): Promise<DB> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(data);
    // Migration: ensure new fields exist if reading old DB
    if (!db.users) db.users = {};
    if (!db.analytics) db.analytics = [];
    return db;
  } catch (error) {
    // Ensure data directory exists
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (err) {
        // Ignore if exists
    }

    // If file doesn't exist, create it with default data
    const initialDB: DB = {
      profiles: {
        'coach_alex': defaultProfile
      },
      users: {},
      analytics: []
    };
    await fs.writeFile(DB_PATH, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
}

async function saveDB(db: DB): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

// --- Profile Methods ---

export async function getProfile(username: string): Promise<UserProfile | null> {
  const db = await getDB();
  return db.profiles[username] || null;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  const db = await getDB();
  db.profiles[profile.username] = profile;
  await saveDB(db);
}

// --- Auth Methods ---

export async function createUser(user: UserAuth): Promise<void> {
    const db = await getDB();
    db.users[user.email] = user;
    await saveDB(db);
}

export async function getUserByEmail(email: string): Promise<UserAuth | null> {
    const db = await getDB();
    return db.users[email] || null;
}

export async function getUserByUsername(username: string): Promise<UserAuth | null> {
    const db = await getDB();
    const user = Object.values(db.users).find(u => u.username === username);
    return user || null;
}

// --- Analytics Methods ---

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
    const db = await getDB();
    db.analytics.push(event);
    await saveDB(db);
}

export async function getAnalytics(username: string): Promise<AnalyticsEvent[]> {
    const db = await getDB();
    return db.analytics.filter(e => e.username === username);
}
