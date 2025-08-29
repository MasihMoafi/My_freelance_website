'use client';

import React from 'react';
import { useMusicContext } from './MusicProvider';

interface MuteButtonProps {
  className?: string;
}

const MuteButton: React.FC<MuteButtonProps> = ({ className = "" }) => {
  const { isMuted, toggleMute } = useMusicContext();

  return (
    <button
      onClick={toggleMute}
      className={`p-2 rounded-full transition-colors text-white bg-gray-700 hover:bg-gray-600 ${className}`}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
};

export default MuteButton;