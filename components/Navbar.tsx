"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 bg-ios-bg/80 dark:bg-ios-bg-dark/80 backdrop-blur-lg border-b border-ios-border dark:border-ios-border-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ios-blue">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-xl text-ios-text-primary dark:text-ios-text-primary-dark">Elijeweb</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-sm font-medium text-ios-text-secondary dark:text-ios-text-secondary-dark hover:text-ios-blue dark:hover:text-ios-blue transition-colors">Features</Link>
            <Link href="/#pricing" className="text-sm font-medium text-ios-text-secondary dark:text-ios-text-secondary-dark hover:text-ios-blue dark:hover:text-ios-blue transition-colors">Pricing</Link>
            <Link href="/#faq" className="text-sm font-medium text-ios-text-secondary dark:text-ios-text-secondary-dark hover:text-ios-blue dark:hover:text-ios-blue transition-colors">FAQ</Link>
            {status === 'authenticated' && (
              <Link href="/dashboard" className="text-sm font-medium text-ios-text-secondary dark:text-ios-text-secondary-dark hover:text-ios-blue dark:hover:text-ios-blue transition-colors">Dashboard</Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {status === 'unauthenticated' && (
              <>
                <Link href="/login" className="hidden md:inline-block text-sm font-medium text-ios-blue dark:text-ios-blue hover:text-ios-text-primary dark:hover:text-ios-text-primary-dark transition-colors">Login</Link>
                <Link href="/register" className="hidden md:inline-block text-sm font-medium px-4 py-2 bg-ios-blue text-white rounded-lg hover:opacity-90 transition-opacity">Sign Up Free</Link>
              </>
            )}
            {status === 'authenticated' && (
              <button onClick={handleSignOut} className="hidden md:inline-block text-sm font-medium px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition-opacity">Sign Out</button>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-ios-panel-contrast dark:hover:bg-ios-panel-contrast-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-ios-border dark:border-ios-border-dark">
            <Link href="/#features" className="block px-3 py-2 rounded-md text-base font-medium text-ios-text-primary dark:text-ios-text-primary-dark hover:bg-ios-panel-contrast dark:hover:bg-ios-panel-contrast-dark">Features</Link>
            <Link href="/#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-ios-text-primary dark:text-ios-text-primary-dark hover:bg-ios-panel-contrast dark:hover:bg-ios-panel-contrast-dark">Pricing</Link>
            <Link href="/#faq" className="block px-3 py-2 rounded-md text-base font-medium text-ios-text-primary dark:text-ios-text-primary-dark hover:bg-ios-panel-contrast dark:hover:bg-ios-panel-contrast-dark">FAQ</Link>
            {status === 'authenticated' && (
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-ios-text-primary dark:text-ios-text-primary-dark hover:bg-ios-panel-contrast dark:hover:bg-ios-panel-contrast-dark">Dashboard</Link>
            )}
            {status === 'unauthenticated' ? (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-ios-text-primary dark:text-ios-text-primary-dark hover:bg-ios-panel-contrast dark:hover:bg-ios-panel-contrast-dark">Login</Link>
                <Link href="/register" className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-white bg-ios-blue">Sign Up Free</Link>
              </>
            ) : (
              <button onClick={handleSignOut} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-white bg-red-500">Sign Out</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;