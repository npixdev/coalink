'use server';

import { trackEvent as dbTrackEvent, getAnalytics as dbGetAnalytics } from '@/lib/db';
import { AnalyticsEvent, EventType } from '@/types';
import { randomUUID } from 'crypto';

export async function trackEvent(
  username: string,
  type: EventType,
  metadata?: Record<string, any>,
  url?: string
) {
  const event: AnalyticsEvent = {
    id: randomUUID(),
    username,
    type,
    timestamp: new Date().toISOString(),
    metadata,
    url
  };

  await dbTrackEvent(event);
  return { success: true };
}

export async function getAnalyticsData(username: string) {
  const events = await dbGetAnalytics(username);
  return events;
}
