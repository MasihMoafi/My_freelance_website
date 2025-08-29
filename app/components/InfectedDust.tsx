'use client';

import React, { useEffect, useRef } from 'react';

interface InfectedDustProps {
  dustColor?: string;
}

const InfectedDust: React.FC<InfectedDustProps> = ({ dustColor = '#ffffff' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: 0, y: 0 };
    const particles: { 
      x: number; 
      y: number; 
      vx: number;
      vy: number;
      size: number; 
      opacity: number;
      life: number;
      maxLife: number;
    }[] = [];

    // Create infected dust particles - Last of Us style
    const createParticle = () => {
      // Don't create particles in the center area where the background image is
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const imageWidth = canvas.width * 0.81;
      const imageHeight = canvas.height * 0.6;
      
      let x, y;
      do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      } while (
        x > centerX - imageWidth / 2 && 
        x < centerX + imageWidth / 2 && 
        y > centerY - imageHeight / 2 && 
        y < centerY + imageHeight / 2
      );

      const maxLife = Math.random() * 300 + 200;
      
      return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.3, // Slow horizontal drift
        vy: -Math.random() * 0.4 - 0.1, // Slight upward movement
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        life: maxLife,
        maxLife: maxLife
      };
    };

    // Initialize particles
    for (let i = 0; i < 35; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Calculate distance from mouse for interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        // Mouse interaction - particles get pushed away gently
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance * 0.3;
          const angle = Math.atan2(-dy, -dx);
          particle.vx += Math.cos(angle) * force * 0.02;
          particle.vy += Math.sin(angle) * force * 0.02;
        }

        // Update position with floating movement
        particle.x += particle.vx + Math.sin(Date.now() * 0.001 + particle.x * 0.001) * 0.1;
        particle.y += particle.vy + Math.cos(Date.now() * 0.001 + particle.y * 0.001) * 0.1;

        // Apply subtle drift back to center
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Age the particle
        particle.life--;
        const lifeRatio = particle.life / particle.maxLife;
        
        // Calculate opacity based on life and distance from mouse
        let currentOpacity = particle.opacity * lifeRatio;
        if (distance < maxDistance) {
          currentOpacity *= 0.3; // Fade when mouse is near
        }

        // Draw particle with glow effect
        ctx.beginPath();
        
        // Add subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(255, 255, 255, ${currentOpacity * 0.3})`;
        
        // Create gradient for more organic look
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;

        // Reset or remove dead particles
        if (particle.life <= 0 || particle.y < -10 || particle.x < -10 || particle.x > canvas.width + 10) {
          particles[index] = createParticle();
        }
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [dustColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default InfectedDust;