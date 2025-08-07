import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AuthProviders from '@/components/AuthProviders';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' });

export const metadata: Metadata = {
  title: 'Elijeweb - Your AI Sales Assistant for Meta',
  description: 'Elijeweb is an AI agent that replies to customers, manages orders, stock, and sales — all from your Meta inbox. No more missed sales, no more Excel chaos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} scroll-smooth`}>
      <body className="bg-ios-bg dark:bg-ios-bg-dark text-ios-text-primary dark:text-ios-text-primary-dark font-sans antialiased">
        <AuthProviders>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-ios-panel-contrast dark:bg-ios-panel-dark">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <Link href="/" className="flex items-center space-x-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ios-blue">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-bold text-lg">Elijeweb</span>
                </Link>
                <p className="text-sm text-ios-text-secondary dark:text-ios-text-secondary-dark">© 2024 Elijeweb. All rights reserved.</p>
                <div className="flex space-x-6">
                  <a href="#" className="text-ios-text-secondary dark:text-ios-text-secondary-dark hover:text-ios-text-primary dark:hover:text-ios-text-primary-dark">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="#" className="text-ios-text-secondary dark:text-ios-text-secondary-dark hover:text-ios-text-primary dark:hover:text-ios-text-primary-dark">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.316 1.363.364 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.316-2.427.364-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.316 2.427-.364C8.901 2.013 9.241 2 11.875 2h.44zM12 6.848c-2.846 0-5.152 2.306-5.152 5.152s2.306 5.152 5.152 5.152 5.152-2.306 5.152-5.152S14.846 6.848 12 6.848zM12 15.318c-1.797 0-3.237-1.44-3.237-3.237s1.44-3.237 3.237-3.237 3.237 1.44 3.237 3.237-1.44 3.237-3.237 3.237zM16.426 7.648a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </AuthProviders>
      </body>
    </html>
  );
}