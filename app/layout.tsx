import { Roboto, Inter } from 'next/font/google';
import './globals.css';
import Chatbot from './Chatbot/Chatbot'; // Correct import path

const roboto = Roboto({ subsets: ['latin'], weight: '300' }); // Light weight for all text
const inter = Inter({ subsets: ['latin'] }); // For your name

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {children}
        <Chatbot /> {/* Add the Chatbot component here */}
      </body>
    </html>
  );
}