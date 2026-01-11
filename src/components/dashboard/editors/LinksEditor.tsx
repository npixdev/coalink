import React, { useState } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { LinkItem, LinkType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical, Trash2, Plus, Video, Link as LinkIcon, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LinksEditor() {
  const { profile, addLink, updateLink, deleteLink } = useProfile();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (type: LinkType) => {
    const newLink: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: type === 'header' ? 'New Header' : 'New Link',
      url: type === 'header' ? undefined : '',
      active: true,
    };
    addLink(newLink);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-lg font-semibold">Your Links</h2>
         <Button onClick={() => setIsAdding(!isAdding)} size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Block
         </Button>
      </div>

      {isAdding && (
        <div className="grid grid-cols-3 gap-2 mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2" onClick={() => handleAdd('link')}>
                <LinkIcon className="h-6 w-6" />
                <span>Link</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2" onClick={() => handleAdd('video')}>
                <Video className="h-6 w-6" />
                <span>Video</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4 gap-2" onClick={() => handleAdd('header')}>
                <Type className="h-6 w-6" />
                <span>Header</span>
            </Button>
        </div>
      )}

      <div className="space-y-3">
        {profile.links.map((link, index) => (
          <Card key={link.id} className="relative group">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="mt-3 text-slate-400 cursor-move">
                <GripVertical className="h-5 w-5" />
              </div>
              
              <div className="flex-1 space-y-3">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {link.type === 'video' && <Video className="h-4 w-4 text-slate-500" />}
                        {link.type === 'header' && <Type className="h-4 w-4 text-slate-500" />}
                        {link.type === 'link' && <LinkIcon className="h-4 w-4 text-slate-500" />}
                        <span className="text-xs font-medium uppercase text-slate-500">{link.type}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => deleteLink(link.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                 </div>

                 <div className="space-y-2">
                    <Input 
                        value={link.title}
                        onChange={(e) => updateLink(link.id, { title: e.target.value })}
                        placeholder="Title"
                        className="font-medium"
                    />
                    {link.type !== 'header' && (
                        <Input 
                            value={link.url}
                            onChange={(e) => updateLink(link.id, { url: e.target.value })}
                            placeholder={link.type === 'video' ? 'YouTube/Vimeo URL' : 'https://example.com'}
                            className="text-xs text-slate-500 font-mono"
                        />
                    )}
                 </div>
                 
                 {/* Special handling for stand-out features */}
                 {link.type === 'link' && link.url === '#booking' && (
                     <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block">
                        ✨ Opens Booking Modal
                     </div>
                 )}
              </div>
            </CardContent>
          </Card>
        ))}

        {profile.links.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                <p>No links yet. Click "Add Block" to start.</p>
            </div>
        )}
      </div>
    </div>
  );
}
