"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push('/dashboard'); // Redirect to dashboard on successful login
    }
  };

  return (
    <section id="login" className="py-20 sm:py-24 lg:py-32 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <div className="bg-ios-panel dark:bg-ios-panel-dark p-8 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Login to Elijeweb</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div>
              <label htmlFor="login-email" className="sr-only">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-ios-border dark:border-ios-border-dark bg-ios-bg dark:bg-ios-bg-dark placeholder-ios-text-secondary dark:placeholder-ios-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-ios-text-primary dark:text-ios-text-primary-dark text-base"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="sr-only">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-ios-border dark:border-ios-border-dark bg-ios-bg dark:bg-ios-bg-dark placeholder-ios-text-secondary dark:placeholder-ios-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-ios-text-primary dark:text-ios-text-primary-dark text-base"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/reset-password" className="font-medium text-ios-blue hover:text-opacity-80 transition-colors">Forgot your password?</Link>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-ios-blue hover:opacity-90 transition-opacity">
                Login
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">
            Don&apos;t have an account?
            <Link href="/register" className="font-medium text-ios-blue hover:text-opacity-80 transition-colors">Register here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}