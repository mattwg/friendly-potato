'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Logo from './icons/Logo';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const paths = pathname.split('/').filter(Boolean);
  const isProjectPage = paths[0] === 'project';
  const projectId = isProjectPage ? paths[1] : null;

  const handleSignOut = async () => {
    // First, sign out from NextAuth
    await signOut({ redirect: false });
    
    // Clear any client-side storage
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
      window.localStorage.clear();
      
      // Force a hard refresh to the login page
      window.location.href = '/login';
    }
  };

  // If we're loading the session, or there's no session, don't show protected content
  if (status === 'loading' || !session) {
    return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold text-gray-900">
                Transcript Intelligence
              </span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const getNavItems = () => {
    if (!session || !isProjectPage) return [];

    return [
      {
        label: 'Settings',
        href: `/project/${projectId}`,
        current: paths.length === 2,
      },
      {
        label: 'Analysis Results',
        href: `/project/${projectId}/results`,
        current: paths.length === 3 && paths[2] === 'results',
      },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center gap-2"
            >
              <Logo />
              <span className="text-xl font-semibold text-gray-900">
                Transcript Intelligence
              </span>
            </Link>

            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    item.current
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
