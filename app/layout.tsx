import { Roboto } from 'next/font/google';
import './globals.css';
// import ModernChatbot from './components/ModernChatbot';
import { ThemeProvider } from './components/ThemeContext';
import type { Metadata } from 'next';

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Masih Moafi - AI Engineer & Researcher',
  description: 'AI Engineer & Red Team Researcher specializing in Multi-Agent Systems, AI Security, and Advanced Language Models',
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900 text-gray-100`}>
        <ThemeProvider>
            {children}
            {/* <ModernChatbot /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}