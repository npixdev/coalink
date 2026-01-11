"use client";

import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, LogOut, Save } from 'lucide-react';

function DashboardHeader() {
    const { user, logout } = useAuth();
    const { saveChanges, isSaving } = useProfile();

    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 sticky top-0 z-10 justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                    <Home className="h-5 w-5" />
                </Link>
                <div className="font-bold text-xl text-slate-800">CoaLink <span className="text-slate-400 font-normal">Dashboard</span></div>
            </div>
            
            <div className="flex items-center gap-4">
                <Button 
                    size="sm" 
                    onClick={saveChanges} 
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <div className="h-6 w-px bg-slate-200" />
                <div className="text-sm text-slate-500">
                    Welcome, <span className="font-semibold text-slate-900">{user?.name}</span>
                    {user?.isPro && <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">PRO</span>}
                </div>
                <a href="/coach_alex" target="_blank" className="text-sm text-blue-600 hover:underline">View Live Page</a>
                <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
        router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) return null;

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <DashboardHeader />
        {children}
      </div>
    </ProfileProvider>
  )
}
