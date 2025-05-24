'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>TogetherOnly - Share Airport Cab Rides</title>
        <meta name="description" content="Connect with travelers heading to nearby destinations from the airport" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 