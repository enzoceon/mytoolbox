
import React, { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  id: number;
  x: string;
  y: string;
  size: string;
  animationDuration: string;
  delay: string;
  opacity: string;
}

const BackgroundAnimation = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.5}rem`,
      animationDuration: `${Math.random() * 20 + 15}s`,
      delay: `-${Math.random() * 20}s`,
      opacity: `${Math.random() * 0.3 + 0.1}`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle: Particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${isDark ? 'bg-gradient-primary-dark' : 'bg-gradient-primary'} animate-spin-slow`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDuration: particle.animationDuration,
            animationDelay: particle.delay,
            filter: 'blur(8px)',
          }}
        />
      ))}
      <div className={`absolute inset-0 ${isDark ? 'bg-background/90' : 'bg-background/80'} backdrop-blur-[100px]`} />
    </div>
  );
};

export default BackgroundAnimation;
