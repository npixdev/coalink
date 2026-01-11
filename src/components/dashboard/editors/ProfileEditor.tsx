import React from 'react';
import { useProfile } from '@/context/ProfileContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProfileEditor() {
  const { profile, updateProfile } = useProfile();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Display Name</label>
            <Input 
              value={profile.displayName} 
              onChange={(e) => updateProfile({ displayName: e.target.value })} 
              placeholder="e.g. Coach Alex"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={profile.bio} 
              onChange={(e) => updateProfile({ bio: e.target.value })} 
              placeholder="Tell your audience about yourself..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Avatar URL</label>
             <Input 
              value={profile.avatarUrl} 
              onChange={(e) => updateProfile({ avatarUrl: e.target.value })} 
              placeholder="https://..."
            />
            <p className="text-xs text-slate-500">Paste an image URL for now.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
