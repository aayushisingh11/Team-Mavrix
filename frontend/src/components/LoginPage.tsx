import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Plane, Users, Zap, Globe } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Purple branding section */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full"></div>
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-white/20 rounded-lg">
            <Plane className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold">Mavrix</h1>
        </div>

        {/* Main heading */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Welcome to the Future of<br />Travel
          </h2>
          <p className="text-xl text-purple-100 max-w-lg">
            Experience AI-powered travel planning that adapts to your mood, connects you with amazing people, and makes every journey unforgettable.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg w-fit">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-purple-100">Smart recommendations that learn from your preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg w-fit">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Social Travel</h3>
              <p className="text-purple-100">Connect with like-minded travelers worldwide</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg w-fit">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Instant Booking</h3>
              <p className="text-purple-100">One-click bookings with smart payment splitting</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg w-fit">
              <Globe className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Dynamic Plans</h3>
              <p className="text-purple-100">Itineraries that adapt to your daily mood</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-12">
          <div>
            <div className="text-4xl font-bold">10K+</div>
            <div className="text-purple-200">Happy Travelers</div>
          </div>
          <div>
            <div className="text-4xl font-bold">150+</div>
            <div className="text-purple-200">Destinations</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-4xl font-bold">
              ⭐ 4.9
            </div>
            <div className="text-purple-200">Rating</div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2">Welcome Back</h2>
            <p className="text-gray-600">
              Sign in to your account or create a new one to start your journey
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                !isSignUp 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                isSignUp 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              {isSignUp ? 'Sign Up for Mavrix' : 'Sign In to Mavrix'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>
      </div>
    </div>
  );
}