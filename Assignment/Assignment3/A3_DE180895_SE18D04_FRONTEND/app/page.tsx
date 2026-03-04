'use client';

import Link from 'next/link';
import { useAuth } from './lib/auth-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogOut } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            LuxeStay
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
                <Link href={user?.roles?.includes('STAFF') ? '/staff/dashboard' : '/customer/dashboard'}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={logout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-pretty">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Perfect
              </span>
              <br />
              Hotel Awaits
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty">
              Discover luxury accommodations, book seamlessly, and manage your reservations with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link href={user?.roles?.includes('STAFF')? '/staff/dashboard' : '/customer/dashboard'}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto">
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-300 to-blue-300 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 via-purple-400/50 to-pink-400/50 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-5xl mb-2">🏨</p>
                <p className="text-xl font-semibold">Premium Hotels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Why Choose LuxeStay?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Premium Selection',
                desc: 'Curated luxury hotels for every budget',
              },
              {
                icon: '⚡',
                title: 'Instant Booking',
                desc: 'Reserve your room in seconds',
              },
              {
                icon: '🛡️',
                title: 'Secure & Trusted',
                desc: 'Safe transactions with best prices',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-200 hover:shadow-lg transition-shadow"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 LuxeStay. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
