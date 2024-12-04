import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from './components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transcript Summariser',
  description: 'AI-powered research transcript analysis',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-100`}>
        <SessionProvider session={session}>
          <Header />
          <main className="bg-gray-100">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
