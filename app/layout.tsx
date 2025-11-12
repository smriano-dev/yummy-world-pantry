import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dinner App - Recipe Finder',
  description: 'Find recipes based on your kitchen inventory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

