// app/ThemeSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react'; // Import the moon icon

const sunnyBackgrounds = ['/sunny1.png'];
const gloomyBackgrounds = ['/gloomy.png'];
const darkGloomyBackgrounds = ['/gloomy2.png']; // Really gloomy background

export default function ThemeSelector({ onThemeChange }: { onThemeChange: (theme: string) => void }) {
  const [theme, setTheme] = useState<'sunny' | 'gloomy' | 'dark-gloomy'>('sunny');

  useEffect(() => {
    // Load theme from local storage
    const savedTheme = localStorage.getItem('theme') as 'sunny' | 'gloomy' | 'dark-gloomy' || 'sunny';
    setTheme(savedTheme);
    onThemeChange(savedTheme);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const themes = ['sunny', 'gloomy', 'dark-gloomy'];
    const currentIndex = themes.indexOf(theme);
    const newTheme = themes[(currentIndex + 1) % themes.length] as 'sunny' | 'gloomy' | 'dark-gloomy';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    onThemeChange(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
    >
      {theme === 'sunny' ? (
        <span role="img" aria-label="Sunny">☀️</span> // Sun icon
      ) : theme === 'gloomy' ? (
        <span role="img" aria-label="Gloomy">🌧️</span> // Rain cloud icon
      ) : (
        <Moon className="w-6 h-6 text-gray-400" /> // Moon icon with gloomy color
      )}
    </button>
  );
}