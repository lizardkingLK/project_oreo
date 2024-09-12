import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import AppLayout from '@/components/layouts/app';
import './globals.css';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oreo',
  description: 'Message with your friends',
  authors: [{ name: '@lizardkingLK', url: 'https://github.com/project_oreo' }],
  metadataBase: new URL('https://neonchat.vercel.app'),
  openGraph: {
    url: '/',
    siteName: 'Oreo',
  },
};

export type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <AppLayout children={children} />
      </body>
    </html>
  );
}
