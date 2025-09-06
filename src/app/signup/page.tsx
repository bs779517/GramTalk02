"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function SignupPage() {
  const router = useRouter();
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup logic
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background p-8">
      <div className="flex items-center gap-3 mb-8 text-primary">
          <Phone className="h-10 w-10" />
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            ConnectNow
          </h1>
        </div>
      <Card className="w-full max-w-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create an account to start connecting.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="your_username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-2">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline text-primary hover:text-accent">
          Login
        </Link>
      </div>
    </div>
  );
}
