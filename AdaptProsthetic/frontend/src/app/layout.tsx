import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AdaptProsthetic - AI Prosthetic System',
  description: 'AI-enabled adaptive prosthetic system for real-time calibration and monitoring.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-slate-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
