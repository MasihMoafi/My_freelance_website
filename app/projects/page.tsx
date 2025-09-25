import Image from 'next/image';
import ProjectsClient from '../components/ProjectsClient';

// This is now a PURE Server Component.
export default function ProjectsPage() {
  return (
    <div 
      className="min-h-screen bg-black"
    >
      <Image
        src="/eyes-wide-shut-intro.webp"
        alt="Background"
        fill
        quality={75}
        priority
        className="object-cover opacity-50"
      />
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* All interactive elements are now neatly contained in this one component */}
      <ProjectsClient />
    </div>
  );
}
