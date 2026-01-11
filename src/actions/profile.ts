'use server'

import { getProfile, saveProfile as dbSaveProfile } from '@/lib/db';
import { UserProfile } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getUserProfile(username: string): Promise<UserProfile | null> {
  return await getProfile(username);
}

export async function saveUserProfile(profile: UserProfile): Promise<{ success: boolean }> {
  await dbSaveProfile(profile);
  revalidatePath(`/${profile.username}`);
  return { success: true };
}
