import type { Metadata } from 'next';
import { Inter, Yellowtail } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const yellowtail = Yellowtail({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yellowtail',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FURNI.TURE® — Scandinavian Interior Design Studio',
  description:
    'Minimal, editorial, luxury Scandinavian interior design studio showcasing turnkey renovation, sauna design, apartment architecture, and customized consultations.',
  openGraph: {
    title: 'FURNI.TURE® — Scandinavian Interior Design Studio',
    description:
      'Minimal, editorial, luxury Scandinavian interior design studio showcasing turnkey renovation, sauna design, apartment architecture, and customized consultations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FURNI.TURE® — Scandinavian Interior Design Studio',
    description:
      'Minimal, editorial, luxury Scandinavian interior design studio showcasing turnkey renovation, sauna design, apartment architecture, and customized consultations.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${yellowtail.variable}`}>
      <body className="bg-white text-black antialiased selection:bg-[#D8BA72] selection:text-white" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
