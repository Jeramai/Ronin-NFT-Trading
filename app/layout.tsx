import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { getUrlPrefix } from '@/lib/urlPrefix';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const urlPrefix = getUrlPrefix();

export const metadata: Metadata = {
  title: 'Ronin NFT Trading',
  description: 'Trade NFTs on the Ronin blockchain',
  icons: {
    apple: [{ url: `${urlPrefix}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
    icon: [
      { url: `${urlPrefix}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${urlPrefix}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' }
    ]
  },
  manifest: `${urlPrefix}/site.webmanifest`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
