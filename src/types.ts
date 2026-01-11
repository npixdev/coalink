export type LinkType = 'link' | 'video' | 'header';

export interface LinkItem {
  id: string;
  type: LinkType;
  title: string;
  url?: string;
  active: boolean;
}

export interface Theme {
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string;
  font: 'sans' | 'serif' | 'mono';
  layout: 'stack' | 'grid';
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  links: LinkItem[];
}

export interface UserAuth {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  isPro: boolean;
  createdAt: string;
}

export type EventType = 'view' | 'click' | 'lead';

export interface AnalyticsEvent {
  id: string;
  username: string;
  type: EventType;
  timestamp: string;
  metadata?: Record<string, any>;
  url?: string;
  userAgent?: string;
  country?: string;
}
