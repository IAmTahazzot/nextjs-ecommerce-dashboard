import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import React, { StrictMode } from 'react';
import { ModalProvider } from '@/providers/modal-providers';
import { ToasterProvider } from '@/providers/toast-provider';
import ThemeProvider from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cool Store',
  description: "That's beautiful...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
