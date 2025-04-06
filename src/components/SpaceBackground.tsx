
import React, { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Star {
  id: number;
  x: string;
  y: string;
  size: string;
  opacity: string;
  animationDuration: string;
  delay: string;
}

interface Planet {
  id: number;
  x: string;
  y: string;
  size: string;
  rotation: string;
  color: string;
  animationDuration: string;
}

const SpaceBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 0.2 + 0.1}rem`,
      opacity: `${Math.random() * 0.8 + 0.2}`,
      animationDuration: `${Math.random() * 5 + 2}s`,
      delay: `-${Math.random() * 5}s`,
    }));
  }, []);

  const nebulae = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 80 + 10}%`,
      y: `${Math.random() * 80 + 10}%`,
      size: `${Math.random() * 40 + 20}rem`,
      rotation: `${Math.random() * 360}deg`,
      opacity: `${Math.random() * 0.1 + 0.05}`,
      animationDuration: `${Math.random() * 120 + 60}s`,
    }));
  }, []);

  const planets = useMemo(() => {
    const colors = [
      'bg-purple-500/20',
      'bg-blue-500/20',
      'bg-indigo-500/20',
      'bg-pink-500/20',
      'bg-cyan-500/20',
    ];
    
    return Array.from({ length: 4 }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 80 + 10}%`,
      y: `${Math.random() * 80 + 10}%`,
      size: `${Math.random() * 8 + 4}rem`,
      rotation: `${Math.random() * 360}deg`,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: `${Math.random() * 40 + 20}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-space">
      {/* Stars */}
      {stars.map((star: Star) => (
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
      
      {/* Nebulae */}
      {nebulae.map((nebula, index) => (
        <div
          key={`nebula-${index}`}
          className="absolute rounded-full bg-gradient-nebula nebula-spin"
          style={{
            left: nebula.x,
            top: nebula.y,
            width: nebula.size,
            height: nebula.size,
            opacity: nebula.opacity,
            transform: `rotate(${nebula.rotation})`,
            animationDuration: nebula.animationDuration,
          }}
        />
      ))}
      
      {/* Planets */}
      {planets.map((planet: Planet) => (
        <div
          key={`planet-${planet.id}`}
          className={`absolute rounded-full ${planet.color} backdrop-blur-3xl planet-float`}
          style={{
            left: planet.x,
            top: planet.y,
            width: planet.size,
            height: planet.size,
            transform: `rotate(${planet.rotation})`,
            animationDuration: planet.animationDuration,
          }}
        />
      ))}
      
      {/* Overlay to make the background more subtle */}
      <div className={`absolute inset-0 ${isDark ? 'bg-background/70' : 'bg-background/60'} backdrop-blur-[50px]`} />
    </div>
  );
};

export default SpaceBackground;
