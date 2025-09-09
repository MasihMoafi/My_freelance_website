'use client';

import React, { createContext, useContext, useRef, useEffect, useState } from 'react';

interface MusicContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
  playMusic: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within MusicProvider');
  }
  return context;
}

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const playMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
      setIsMuted(false);
    }
  };

  const contextValue: MusicContextType = {
    audioRef,
    isMuted,
    setIsMuted,
    toggleMute,
    playMusic,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
      <audio ref={audioRef} src="/music.mp3" loop muted autoPlay />
    </MusicContext.Provider>
  );
}