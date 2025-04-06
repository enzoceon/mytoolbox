
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
  color?: string;
}

const BackgroundAnimation = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      // Generate colors in the blue/purple/indigo spectrum for a premium feel
      const colorHue = Math.floor(Math.random() * 40) + 230; // 230-270 (blues, purples)
      const colorSaturation = Math.floor(Math.random() * 30) + 70; // 70-100%
      const colorLightness = Math.floor(Math.random() * 20) + 55; // 55-75%
      
      return {
        id: index,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 0.5}rem`,
        animationDuration: `${Math.random() * 30 + 15}s`,
        delay: `-${Math.random() * 30}s`,
        opacity: `${Math.random() * 0.3 + 0.05}`,
        color: `hsla(${colorHue}, ${colorSaturation}%, ${colorLightness}%, ${isDark ? 0.15 : 0.08})`,
      };
    });
  }, [isDark]);
  
  // Stars for the cosmic background (more visible in dark mode)
  const stars = useMemo(() => {
    return Array.from({ length: isDark ? 70 : 40 }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 0.15 + 0.05}rem`,
      animationDuration: `${Math.random() * 3 + 1}s`,
      delay: `-${Math.random() * 3}s`,
      opacity: `${Math.random() * (isDark ? 0.8 : 0.5) + (isDark ? 0.2 : 0.1)}`,
    }));
  }, [isDark]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-space">
      {/* Large nebula-like particles */}
      {particles.map((particle: Particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full nebula-spin"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDuration: particle.animationDuration,
            animationDelay: particle.delay,
            background: particle.color || 'rgba(139, 92, 246, 0.15)',
            filter: 'blur(12px)',
          }}
        />
      ))}
      
      {/* Stars */}
      {stars.map((star: Particle) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {/* Premium overlay gradient for dark mode */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-premium backdrop-blur-[80px]' 
            : 'bg-background/60 backdrop-blur-[50px]'
        }`} 
      />
    </div>
  );
};

export default BackgroundAnimation;
