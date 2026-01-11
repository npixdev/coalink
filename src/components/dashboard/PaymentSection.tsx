import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function PaymentSection() {
  const { user, upgradeToPro } = useAuth();

  if (user?.isPro) {
      return (
          <Card className="border-green-500 bg-green-50">
              <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                      <Check className="h-6 w-6" />
                      Pro Plan Active
                  </CardTitle>
                  <CardDescription className="text-green-600">
                      You have access to all premium features.
                  </CardDescription>
              </CardHeader>
          </Card>
      )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Free Plan</CardTitle>
          <CardDescription>Everything you need to get started</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold mb-4">$0 <span className="text-sm font-normal text-muted-foreground">/month</span></div>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Unlimited Links</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic Themes</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic Analytics</li>
            </ul>
        </CardContent>
        <CardFooter>
            <Button className="w-full" variant="outline" disabled>Current Plan</Button>
        </CardFooter>
      </Card>

      <Card className="border-slate-900 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
        <CardHeader>
          <CardTitle>Pro Coach</CardTitle>
          <CardDescription>Power up your business</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold mb-4">$15 <span className="text-sm font-normal text-muted-foreground">/month</span></div>
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Everything in Free</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Remove Branding</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Custom Domains</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Advanced Analytics (Leads)</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Booking Integration</li>
            </ul>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-slate-900 hover:bg-slate-800" onClick={upgradeToPro}>Upgrade to Pro</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
