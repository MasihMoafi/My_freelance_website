import Image from 'next/image';
import ModernNavbar from './components/ModernNavbar';
import HomePageContent from './components/HomePageContent';

// This is now a PURE Server Component. All client-side logic has been moved.
export default function Home() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-black" 
      data-theme="dark"
    >
      <Image
        src="/eyes-wide-shut-intro.webp"
        alt="Background"
        fill
        quality={75}
        priority
        className="object-cover opacity-50"
      />
      <ModernNavbar />
      
      <div className="relative z-20 flex flex-col items-center justify-start pt-32 min-h-screen px-4">
        {/* All interactive elements are now neatly contained in this one component */}
        <HomePageContent />
      </div>
    </div>
  );
}
