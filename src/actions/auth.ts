'use server';

import { getUserByEmail, getUserByUsername, createUser } from '@/lib/db';
import { UserAuth } from '@/types';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return { error: 'Invalid email or password' };
  }

  // In a real app, we would set a session cookie here.
  // For this prototype, we return the user data and let the client context handle "session" state.
  const { passwordHash, ...safeUser } = user;
  return { success: true, user: safeUser };
}

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;

  if (!email || !password || !username) {
    return { error: 'All fields are required' };
  }

  // Check if user exists
  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return { error: 'Email already in use' };
  }

  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    return { error: 'Username already taken' };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: UserAuth = {
    id: randomUUID(),
    username,
    email,
    passwordHash,
    isPro: false,
    createdAt: new Date().toISOString()
  };

  await createUser(newUser);

  const { passwordHash: _, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}
