'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use } from 'react';

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  
  const isSettingsPage = !pathname.includes('/results');

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-8 items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                ← Back to Projects
              </Link>
              <div className="hidden sm:flex sm:space-x-8">
                <Link
                  href={`/project/${projectId}`}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isSettingsPage
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Settings
                </Link>
                <Link
                  href={`/project/${projectId}/results`}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    !isSettingsPage
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
