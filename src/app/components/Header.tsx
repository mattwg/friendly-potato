'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  current: boolean;
}

export default function Header() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  const isProjectPage = paths[0] === 'project';
  const projectId = isProjectPage ? paths[1] : null;

  const getNavItems = (): NavItem[] => {
    if (!isProjectPage) {
      return [
        { label: 'Projects', href: '/', current: true }
      ];
    }

    return [
      { label: 'Projects', href: '/', current: false },
      { 
        label: 'Settings', 
        href: `/project/${projectId}`, 
        current: paths.length === 2 
      },
      { 
        label: 'Analysis Results', 
        href: `/project/${projectId}/results`, 
        current: paths.length === 3 && paths[2] === 'results'
      }
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <nav className="flex space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center ${
                  index === 0 ? 'px-1' : 'px-3'
                } py-2 text-sm font-medium ${
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
      </div>
    </header>
  );
}
