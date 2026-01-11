'use client';

import React, { useState } from 'react';
import { MobilePreview } from '@/components/dashboard/MobilePreview';
import { ProfileEditor } from '@/components/dashboard/editors/ProfileEditor';
import { LinksEditor } from '@/components/dashboard/editors/LinksEditor';
import { ThemeEditor } from '@/components/dashboard/editors/ThemeEditor';
import { Analytics } from '@/components/dashboard/Analytics';
import { PaymentSection } from '@/components/dashboard/PaymentSection';
import { User, Link as LinkIcon, Palette, BarChart3, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'theme' | 'analytics' | 'billing'>('links');
  const { user } = useAuth();

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar / Editor Area */}
      <div className="w-full md:w-[600px] flex flex-col border-r border-slate-200 bg-white shadow-sm z-10">
         <div className="flex border-b border-slate-200 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('links')}
                className={cn("flex-1 min-w-[80px] py-4 text-xs font-medium flex flex-col items-center justify-center gap-1 border-b-2 transition-colors", activeTab === 'links' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
            >
                <LinkIcon className="h-4 w-4" /> Links
            </button>
            <button 
                onClick={() => setActiveTab('profile')}
                className={cn("flex-1 min-w-[80px] py-4 text-xs font-medium flex flex-col items-center justify-center gap-1 border-b-2 transition-colors", activeTab === 'profile' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
            >
                <User className="h-4 w-4" /> Profile
            </button>
            <button 
                onClick={() => setActiveTab('theme')}
                className={cn("flex-1 min-w-[80px] py-4 text-xs font-medium flex flex-col items-center justify-center gap-1 border-b-2 transition-colors", activeTab === 'theme' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
            >
                <Palette className="h-4 w-4" /> Theme
            </button>
            <button 
                onClick={() => setActiveTab('analytics')}
                className={cn("flex-1 min-w-[80px] py-4 text-xs font-medium flex flex-col items-center justify-center gap-1 border-b-2 transition-colors", activeTab === 'analytics' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
            >
                <BarChart3 className="h-4 w-4" /> Analytics
            </button>
             <button 
                onClick={() => setActiveTab('billing')}
                className={cn("flex-1 min-w-[80px] py-4 text-xs font-medium flex flex-col items-center justify-center gap-1 border-b-2 transition-colors", activeTab === 'billing' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
            >
                <CreditCard className="h-4 w-4" /> Billing
            </button>
         </div>
         
         <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {activeTab === 'profile' && <ProfileEditor />}
            {activeTab === 'links' && <LinksEditor />}
            {activeTab === 'theme' && <ThemeEditor />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'billing' && <PaymentSection />}
         </div>
      </div>

      {/* Preview Area */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-slate-100 relative">
        <MobilePreview />
      </div>
    </div>
  );
}
