'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Architecture() {
  const [currentPage, setCurrentPage] = useState(0); // Start with the first page (0.png)
  const totalPages = 16; // Total number of pages (0.png to 15.png)
  const [isZoomed, setIsZoomed] = useState(false); // Track zoom state
  const [isFullScreen, setIsFullScreen] = useState(false); // Track full screen state
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false); // Track sidebar state
  const imageRef = useRef<HTMLImageElement>(null); // Ref for the image element
  const imageContainerRef = useRef<HTMLDivElement>(null); // Ref for the image container

  // Disable scrolling on the page
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling on unmount
    };
  }, []);

  // Handle full screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      imageContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  // Handle full screen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Adjust padding for full screen mode
  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    if (imageContainer) {
      if (isFullScreen) {
        // Remove left padding in full screen mode
        imageContainer.style.paddingLeft = '0';
      } else {
        // Restore left padding when exiting full screen mode
        imageContainer.style.paddingLeft = isSidebarMinimized ? '4rem' : '16rem';
      }
    }
  }, [isFullScreen, isSidebarMinimized]);

  const handleNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event propagation
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); // Go to the next page
  };

  const handlePreviousPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event propagation
    if (currentPage > 0) setCurrentPage(currentPage - 1); // Go to the previous page
  };

  const handleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    const image = imageRef.current;
    if (image) {
      if (isZoomed) {
        // Zoom out to default 105% scale
        image.style.transform = 'scale(1.05)';
      } else {
        // Zoom in further
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        image.style.transformOrigin = `${x}% ${y}%`;
        image.style.transform = 'scale(2.5)'; // Zoom in further
      }
      setIsZoomed(!isZoomed);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) {
      const image = imageRef.current;
      if (image) {
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        image.style.transformOrigin = `${x}% ${y}%`;
      }
    }
  };

  // Add arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default behavior
        event.stopPropagation(); // Stop event propagation
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); // Go to the next page
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Prevent default behavior
        event.stopPropagation(); // Stop event propagation
        if (currentPage > 0) setCurrentPage(currentPage - 1); // Go to the previous page
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Table of Contents items
  const tableOfContentsItems = [
    { name: 'Front Cover', page: 0 },
    { name: 'CV', page: 1 },
    { name: 'Table of Contents', page: 2 },
    { name: 'Harmony Haven', page: 3 },
    { name: 'La Dolce Villa', page: 4 },
    { name: 'Feel Gallery', page: 5 },
    { name: 'CPU, Cultural Center', page: 6 },
    { name: 'Cinema, Library', page: 7 },
    { name: 'Sonography Clinic', page: 8 },
    { name: 'Architectural Visualizations', page: 9 }, // Corrected to 9.jpg
    { name: 'Sketches', page: 10 }, // Corrected to 10.jpg
    { name: 'Paintings', page: 12 }, // Corrected to 12.png
    { name: 'Back Cover', page: 15 },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gray-900">
      {/* Table of Contents Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full ${
          isSidebarMinimized ? 'w-12' : 'w-64'
        } bg-gray-800 p-4 z-30 overflow-y-auto transition-all duration-300 ease-in-out`} // Smooth transition
      >
        <button
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
          className="text-white text-xl font-bold mb-4 w-full flex justify-center"
        >
          {isSidebarMinimized ? '☰' : '✕'}
        </button>
        {!isSidebarMinimized && (
          <>
            <h2 className="text-white text-xl font-bold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {tableOfContentsItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => setCurrentPage(item.page)}
                    className={`w-full text-left text-white p-2 rounded ${
                      currentPage === item.page ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Portfolio Image */}
      <motion.div
        ref={imageContainerRef}
        key={currentPage} // Re-render on page change for seamless transition
        initial={{ opacity: 0 }} // Start faded
        animate={{ opacity: 1 }} // Become fully clear
        transition={{ duration: 1 }} // Smooth transition
        className={`relative w-full h-full flex justify-center items-center ${
          isSidebarMinimized ? 'pl-12' : 'pl-64'
        } transition-all duration-300 ease-in-out`} // Adjust for sidebar width
        onClick={handleZoom} // Left-click for zoom
        onMouseMove={handleMouseMove} // Hover to move around zoomed area
      >
        <Image
          ref={imageRef} // Ref for the image element
          src={`/${currentPage}.${
            currentPage === 7 || currentPage === 8 || currentPage === 9 || currentPage === 10
              ? 'jpg'
              : 'png'
          }`} // Load the current page image
          alt={`Page ${currentPage}`}
          width={1200} // Set a fixed width (adjust as needed)
          height={800} // Set a fixed height (adjust as needed)
          className="object-contain scale-105 cursor-pointer" // Default 105% scale
          style={{ transform: 'scale(1.05)' }} // Ensure 105% scale is applied
          quality={100}
          priority // Prioritize loading the image
        />
      </motion.div>

      {/* Navigation Arrows */}
      <div
        className="absolute bottom-8 z-20 flex gap-4"
        style={{
          left: `calc(50% + ${isSidebarMinimized ? '4rem' : '16rem'} / 2)`, // Adjusted for sidebar width
          transform: 'translateX(-50%)',
        }}
      >
        {currentPage > 0 && (
          <motion.button
            onClick={handlePreviousPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-black text-4xl cursor-pointer"
          >
            ◄
          </motion.button>
        )}
        {currentPage < totalPages - 1 && (
          <motion.button
            onClick={handleNextPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-black text-4xl cursor-pointer"
          >
            ►
          </motion.button>
        )}
      </div>

      {/* Full Screen Button */}
      <div className="absolute top-8 right-8 z-20 flex flex-col gap-4">
        <button
          onClick={toggleFullScreen}
          className="text-white bg-gray-700 p-2 rounded-full"
          title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
        >
          {isFullScreen ? '⤢' : '⤡'}
        </button>
      </div>

      {/* Back to Main Page Button */}
      <Link
        href="/"
        className={`absolute top-8 ${
          isSidebarMinimized ? 'left-16' : 'left-72'
        } z-20 text-white bg-gray-700 p-2 rounded-full ${
          isZoomed ? 'hidden' : ''
        }`}
        title="Back to Main Page"
      >
        🏠
      </Link>
    </div>
  );
}