"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Auto-login after successful registration
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          router.push('/dashboard'); // Redirect to dashboard
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <section id="register" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <div className="bg-ios-panel dark:bg-ios-panel-dark p-8 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Create Your Elijeweb Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div>
              <label htmlFor="register-name" className="sr-only">Full Name</label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-ios-border dark:border-ios-border-dark bg-ios-bg dark:bg-ios-bg-dark placeholder-ios-text-secondary dark:placeholder-ios-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-ios-text-primary dark:text-ios-text-primary-dark text-base"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="register-email" className="sr-only">Email address</label>
              <input
                id="register-email"
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
              <label htmlFor="register-password" className="sr-only">Password</label>
              <input
                id="register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-ios-border dark:border-ios-border-dark bg-ios-bg dark:bg-ios-bg-dark placeholder-ios-text-secondary dark:placeholder-ios-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-ios-text-primary dark:text-ios-text-primary-dark text-base"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="register-confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="register-confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-ios-border dark:border-ios-border-dark bg-ios-bg dark:bg-ios-bg-dark placeholder-ios-text-secondary dark:placeholder-ios-text-secondary-dark focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-ios-text-primary dark:text-ios-text-primary-dark text-base"
                placeholder="Confirm Password"
              />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-ios-blue hover:opacity-90 transition-opacity">
                Register
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">
            Already have an account?
            <Link href="/login" className="font-medium text-ios-blue hover:text-opacity-80 transition-colors">Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}