"use client";

import React, { useState } from 'react';
import { UserProfile, LinkItem } from '@/types';
import { ExternalLink, Video, Calendar, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackEvent } from '@/actions/analytics';

interface BiopageRendererProps {
  profile: UserProfile;
  preview?: boolean;
}

export function BiopageRenderer({ profile, preview = false }: BiopageRendererProps) {
  const { theme, links, displayName, bio, avatarUrl, username } = profile;
  const [bookingOpen, setBookingOpen] = useState(false);

  const containerStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    fontFamily: theme.font === 'serif' ? 'serif' : theme.font === 'mono' ? 'monospace' : 'sans-serif',
  };

  const buttonStyle = {
    backgroundColor: theme.buttonColor,
    color: theme.buttonTextColor,
  };

  const handleLinkClick = async (link: LinkItem) => {
    if (preview) return;
    try {
        await trackEvent(username, 'click', { linkId: link.id, linkType: link.type, url: link.url }, link.url);
    } catch (e) {
        console.error('Failed to track click', e);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!preview) {
        await trackEvent(username, 'lead', { type: 'booking' });
      }
      alert('Booking request sent!');
      setBookingOpen(false);
  };

  return (
    <div 
      className={cn("min-h-screen w-full flex flex-col items-center px-4 py-12 transition-colors duration-300 relative", preview && "min-h-[100%]")}
      style={containerStyle}
    >
      {/* Header Profile */}
      <div className="mb-8 text-center max-w-md w-full">
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{displayName}</h1>
        <p className="opacity-90 whitespace-pre-wrap">{bio}</p>
      </div>

      {/* Links Container */}
      <div className={cn(
        "w-full max-w-md space-y-4",
        theme.layout === 'grid' && "grid grid-cols-2 gap-4 space-y-0"
      )}>
        {links.filter(l => l.active).map((link) => (
          <LinkItemRenderer 
            key={link.id} 
            link={link} 
            buttonStyle={buttonStyle} 
            layout={theme.layout}
            onBooking={() => setBookingOpen(true)}
            onClick={() => handleLinkClick(link)}
          />
        ))}
      </div>

      <div className="mt-12 text-xs opacity-50">
        Powered by CoaLink
      </div>

      {/* Booking Modal Overlay */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white text-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
                <button onClick={() => setBookingOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X className="h-5 w-5" />
                </button>
                
                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                        <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">Book a Session</h3>
                    <p className="text-sm text-slate-500">Schedule a 1:1 consultation with {displayName}</p>
                </div>

                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                    <div>
                        <label className="text-xs font-medium text-slate-700 ml-1">Your Name</label>
                        <Input placeholder="John Doe" required />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-700 ml-1">Email Address</label>
                        <Input type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-700 ml-1">Preferred Date</label>
                        <Input type="date" required />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Confirm Booking
                    </Button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

function LinkItemRenderer({ link, buttonStyle, layout, onBooking, onClick }: { 
    link: LinkItem; 
    buttonStyle: React.CSSProperties;
    layout: 'stack' | 'grid';
    onBooking: () => void;
    onClick: () => void;
}) {
    if (link.type === 'header') {
        return <h2 className={cn("text-lg font-bold text-center pt-4 opacity-80", layout === 'grid' && "col-span-2")}>{link.title}</h2>;
    }

    const handleClick = (e: React.MouseEvent) => {
        onClick();
        if (link.url === '#booking') {
            e.preventDefault();
            onBooking();
        }
    };

    if (link.type === 'video') {
        // Extract video ID from YouTube URL (simplified)
        let videoId = '';
        if (link.url?.includes('youtube.com') || link.url?.includes('youtu.be')) {
            const url = new URL(link.url);
            if (url.hostname === 'youtu.be') {
                videoId = url.pathname.slice(1);
            } else {
                videoId = url.searchParams.get('v') || '';
            }
        }

        return (
            <div className={cn("rounded-xl overflow-hidden shadow-sm bg-black/5", layout === 'grid' && "col-span-2 aspect-video")}>
                {videoId ? (
                    <iframe 
                        width="100%" 
                        height={layout === 'grid' ? "100%" : "200"} 
                        src={`https://www.youtube.com/embed/${videoId}`} 
                        title={link.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full"
                    />
                ) : (
                    <div className="h-48 flex items-center justify-center bg-slate-200 text-slate-500">
                        <Video className="h-8 w-8 mb-2" />
                        Invalid Video URL
                    </div>
                )}
                <div className="p-3 text-sm font-medium text-center bg-white/50 backdrop-blur-sm">
                    {link.title}
                </div>
            </div>
        );
    }

    return (
        <a 
            href={link.url} 
            target={link.url?.startsWith('#') ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={handleClick}
            className={cn(
                "block w-full p-4 rounded-xl text-center font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm",
                layout === 'grid' && "aspect-[3/2] flex items-center justify-center p-2"
            )}
            style={buttonStyle}
        >
            {link.title}
        </a>
    );
}
