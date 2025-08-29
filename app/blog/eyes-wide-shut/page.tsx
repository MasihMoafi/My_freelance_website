'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MovingStars from '../../components/MovingStars';
import MuteButton from '../../components/MuteButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useState, useEffect } from 'react';

export default function EyesWideShutProject() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/eyes-wide-shut.txt?v=' + Date.now());
        let content = await response.text();
        
        // Convert HTML img tags to markdown
        content = content
          .replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, '![]($1)')
          .replace(/<img[^>]*src='([^']+)'[^>]*>/gi, '![]($1)')
          .replace(/<img[^>]*width="[^"]*"[^>]*src="([^"]+)"[^>]*>/gi, '![]($1)')
          .replace(/<img[^>]*src="([^"]+)"[^>]*width="[^"]*"[^>]*>/gi, '![]($1)');
        
        console.log('Processed content preview:', content.substring(0, 1000));
        
        setMarkdownContent(content);
      } catch (error) {
        console.error('Error loading content:', error);
        setMarkdownContent('# Eyes Wide Shut\n\nContent could not be loaded.');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomedImage) {
        closeImageViewer();
      }
    };
    
    if (zoomedImage) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [zoomedImage]);

  const openImageViewer = (src: string) => {
    setZoomedImage(src);
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const closeImageViewer = () => {
    setZoomedImage(null);
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.25, 2));
  };

  const zoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.25, 0.8));
  };

  const resetZoom = () => {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setImagePosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <MovingStars starColor="#ffffff" />
      
      <motion.div /* Back to Blog button */ >
        <Link
          href="/blog"
          className="group fixed top-8 left-8 z-50 flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white transition-all duration-300 shadow-xl"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="font-semibold">Back to Blog</span>
        </Link>
      </motion.div>
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12 relative z-10"
          >
            <header className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <img src="/logo.png" alt="Eyes Wide Shut" className="w-12 h-12 rounded-lg" />
                Eyes Wide Shut
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm mb-6">
                <span>August 26, 2025</span>
                <span>•</span>
                <span>Masih Moafi</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['AI Security', 'Red Teaming', 'LLM Vulnerabilities', 'Safety Research'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            
            <div className="prose prose-invert prose-white max-w-none text-gray-300 [&_table]:border-collapse [&_table]:border [&_table]:border-gray-600 [&_table]:bg-gray-800/50 [&_table]:my-6 [&_th]:border [&_th]:border-gray-600 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white [&_th]:bg-gray-700 [&_td]:border [&_td]:border-gray-600 [&_td]:px-4 [&_td]:py-2 [&_td]:text-gray-300">
              <ReactMarkdown
                {...({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw] } as any)}
                components={{
                  img: ({ node, ...props }) => (
                    <img 
                      {...props} 
                      className="rounded-lg shadow-lg max-w-full h-auto my-4 cursor-pointer hover:opacity-80 transition-opacity"
                      loading="lazy"
                      onClick={() => openImageViewer(props.src || '')}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table {...props} className="min-w-full border-collapse border border-gray-600 bg-gray-800/50" />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead {...props} className="bg-gray-700" />
                  ),
                  th: ({ node, ...props }) => (
                    <th {...props} className="border border-gray-600 px-4 py-3 text-left font-semibold text-white" />
                  ),
                  td: ({ node, ...props }) => (
                    <td {...props} className="border border-gray-600 px-4 py-2 text-gray-300" />
                  ),
                  h1: ({ node, ...props }) => {
                    const text = props.children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h1 {...props} id={id} className="text-4xl font-bold text-white mb-8" />;
                  },
                  h2: ({ node, ...props }) => {
                    const text = props.children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h2 {...props} id={id} className="text-3xl font-bold text-white mb-6" />;
                  },
                  h3: ({ node, ...props }) => {
                    const text = props.children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h3 {...props} id={id} className="text-2xl font-bold text-white mb-4" />;
                  },
                  strong: ({ node, ...props }) => (
                    <strong {...props} className="font-bold text-white" />
                  ),
                  a: ({ node, ...props }) => {
                    if (props.href?.startsWith('#')) {
                      return (
                        <a 
                          {...props} 
                          className="text-orange-300 hover:text-orange-200 underline cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            const targetId = props.href?.substring(1);
                            const element = document.getElementById(targetId || '');
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        />
                      );
                    }
                    return <a {...props} className="text-orange-300 hover:text-orange-200 underline" />;
                  },
                }}
              >
                {String(markdownContent)}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </div>
      
      {/* Professional Image Viewer */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeImageViewer}
        >
          {/* Controls */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 rounded-full px-4 py-2 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              className="text-white hover:text-orange-300 p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Zoom Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </button>
            
            <span className="text-white text-sm font-medium min-w-[60px] text-center">
              {Math.round(imageScale * 100)}%
            </span>
            
            <button 
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              className="text-white hover:text-orange-300 p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Zoom In"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
              </svg>
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); resetZoom(); }}
              className="text-white hover:text-orange-300 p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Reset"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
            </button>
          </div>

          {/* Close Button */}
          <button 
            onClick={closeImageViewer}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors z-10"
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={zoomedImage} 
              alt="Zoomed image" 
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
              style={{
                transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.2s ease'
              }}
              draggable={false}
            />
          </div>
          
          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center bg-black/50 px-4 py-2 rounded-lg">
            Click and drag to move • Use +/- to zoom • ESC to close
          </div>
        </div>
      )}
      
      <MuteButton className="fixed bottom-8 left-8 z-50" />
    </div>
  );
}
