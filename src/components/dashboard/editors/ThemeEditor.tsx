import React from 'react';
import { useProfile } from '@/context/ProfileContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, List } from 'lucide-react';

export function ThemeEditor() {
  const { profile, updateTheme } = useProfile();
  const { theme } = profile;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Layout</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => updateTheme({ layout: 'stack' })}
                    className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                        theme.layout === 'stack' ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:border-slate-300"
                    )}
                >
                    <List className="h-6 w-6" />
                    <span className="text-sm font-medium">Stack</span>
                </button>
                <button 
                    onClick={() => updateTheme({ layout: 'grid' })}
                    className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                        theme.layout === 'grid' ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:border-slate-300"
                    )}
                >
                    <LayoutGrid className="h-6 w-6" />
                    <span className="text-sm font-medium">Grid</span>
                </button>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Background</label>
                <div className="flex gap-2">
                    <Input 
                        type="color" 
                        className="w-12 h-10 p-1 cursor-pointer" 
                        value={theme.backgroundColor}
                        onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    />
                    <Input 
                        value={theme.backgroundColor}
                        onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                        className="font-mono"
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Text</label>
                <div className="flex gap-2">
                    <Input 
                        type="color" 
                        className="w-12 h-10 p-1 cursor-pointer" 
                        value={theme.textColor}
                        onChange={(e) => updateTheme({ textColor: e.target.value })}
                    />
                    <Input 
                        value={theme.textColor}
                        onChange={(e) => updateTheme({ textColor: e.target.value })}
                        className="font-mono"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Button Bg</label>
                <div className="flex gap-2">
                    <Input 
                        type="color" 
                        className="w-12 h-10 p-1 cursor-pointer" 
                        value={theme.buttonColor}
                        onChange={(e) => updateTheme({ buttonColor: e.target.value })}
                    />
                    <Input 
                        value={theme.buttonColor}
                        onChange={(e) => updateTheme({ buttonColor: e.target.value })}
                        className="font-mono"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Button Text</label>
                <div className="flex gap-2">
                    <Input 
                        type="color" 
                        className="w-12 h-10 p-1 cursor-pointer" 
                        value={theme.buttonTextColor}
                        onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                    />
                    <Input 
                        value={theme.buttonTextColor}
                        onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                        className="font-mono"
                    />
                </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Typography</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-2">
                {['sans', 'serif', 'mono'].map((font) => (
                    <Button
                        key={font}
                        variant={theme.font === font ? 'default' : 'outline'}
                        onClick={() => updateTheme({ font: font as any })}
                        className="capitalize"
                    >
                        {font}
                    </Button>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
