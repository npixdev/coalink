"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { signupAction } from '@/actions/auth';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (password !== confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
    }

    try {
        const result = await signupAction(formData);
        
        if (result.error) {
            setError(result.error);
        } else if (result.success && result.user) {
            login({
                id: result.user.id,
                email: result.user.email,
                username: result.user.username,
                name: result.user.username,
                isPro: result.user.isPro
            });
        }
    } catch (err) {
        setError('Something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                    {error}
                </div>
            )}
             <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input 
                id="username" 
                name="username"
                type="text" 
                placeholder="coach_alex" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="m@example.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
              />
            </div>
             <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
              <Input 
                id="confirm-password" 
                name="confirm-password"
                type="password" 
                required 
              />
            </div>
            <Button className="w-full bg-slate-900 text-white" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
            <div className="text-center text-sm text-slate-500">
                Already have an account? <Link href="/login" className="underline text-slate-900">Sign in</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
