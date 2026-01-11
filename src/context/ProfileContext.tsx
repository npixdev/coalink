"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LinkItem, Theme } from '@/types';
import { saveUserProfile } from '@/actions/profile';
import { toast } from 'sonner';

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

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateTheme: (updates: Partial<Theme>) => void;
  addLink: (link: LinkItem) => void;
  updateLink: (id: string, updates: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (newLinks: LinkItem[]) => void;
  saveChanges: () => Promise<void>;
  isSaving: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isSaving, setIsSaving] = useState(false);

  // Initial save to make sure DB has data
  useEffect(() => {
    saveUserProfile(defaultProfile);
  }, []);
  
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateTheme = (updates: Partial<Theme>) => {
    setProfile(prev => ({
      ...prev,
      theme: { ...prev.theme, ...updates }
    }));
  };

  const addLink = (link: LinkItem) => {
    setProfile(prev => ({
      ...prev,
      links: [...prev.links, link]
    }));
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(link => link.id === id ? { ...link, ...updates } : link)
    }));
  };

  const deleteLink = (id: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }));
  };

  const reorderLinks = (newLinks: LinkItem[]) => {
    setProfile(prev => ({
      ...prev,
      links: newLinks
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
        await saveUserProfile(profile);
        // We could add a toast here if we had a toast library installed
        console.log('Saved successfully');
    } catch (error) {
        console.error('Failed to save', error);
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      updateTheme,
      addLink,
      updateLink,
      deleteLink,
      reorderLinks,
      saveChanges,
      isSaving
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
