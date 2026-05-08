import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Sistema Nacional de Consulta Penal | Auxílio Judiciário',
  description: 'Calcule a progressão de regime e descubra atrasos judiciais. Kit de agilização de processos penais.',
  keywords: ['auxílio judiciário', 'progressão de regime', 'pena criminal', 'consulta penal'],
  openGraph: {
    title: 'VERIFIQUE O DIREITO À LIBERDADE E PROGRESSÃO',
    description: 'Sistema de análise rápida e gratuita de progressão de pena',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
