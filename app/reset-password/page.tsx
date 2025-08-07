"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // In a real application, you would send a request to your backend here
    // to send a password reset email.
    // For this example, we'll just simulate success.
    if (email) {
      setMessage('If an account with that email exists, we have sent a password reset link.');
      setEmail('');
    } else {
      setError('Please enter your email address.');
    }
  };

  return (
    <section id="reset-password" className="py-20 sm:py-24 lg:py-32 bg-ios-panel-contrast dark:bg-ios-panel-contrast-dark/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <div className="bg-ios-panel dark:bg-ios-panel-dark p-8 rounded-2xl shadow-lg border border-ios-border dark:border-ios-border-dark text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Reset Your Password</h2>
          <p className="text-ios-text-secondary dark:text-ios-text-secondary-dark mb-6">Enter your email address and we&apos;ll send you a link to reset your password.</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div>
              <label htmlFor="reset-email" className="sr-only">Email address</label>
              <input
                id="reset-email"
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
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-ios-blue hover:opacity-90 transition-opacity">
                Send Reset Link
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">
            <Link href="/login" className="font-medium text-ios-blue hover:text-opacity-80 transition-colors">Back to Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}