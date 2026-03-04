'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/app/lib/auth-context';
import { login as apiLogin } from '@/app/lib/api';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User } from '@/app/lib/types';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await apiLogin(email, password);

    const userData: User = {
      customerID: response.customerID,
      email: response.email,
      roles: response.roles,
    };

    login(userData, response.token);

    console.log('User :', userData);

    // Redirect based on role
    if (userData.roles.includes('STAFF')) {
      router.push('/staff/dashboard');
    } else {
      router.push('/customer/dashboard');
    }

  } catch (err) {
    setError(err instanceof Error ? err.message : 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          LuxeStay
        </h1>
        <p className="text-gray-600">Welcome back to luxury</p>
      </div>

      {/* Card */}
      <Card className="border border-purple-200 bg-white/95 backdrop-blur shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="border-purple-200 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="border-purple-200 focus:ring-purple-500"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-700">
                Register here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Demo Info */}
      <Card className="border border-blue-200 bg-blue-50/50 p-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">Demo Login:</span> Use any email and password to test the application.
        </p>
      </Card>
    </div>
  );
}
