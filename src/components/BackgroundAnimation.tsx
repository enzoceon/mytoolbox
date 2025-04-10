
import React, { useMemo } from 'react';

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
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      // Generate colors in the blue/purple/pink spectrum for a cosmic feel
      const colorHue = Math.floor(Math.random() * 60) + 220; // 220-280 (blues, purples)
      const colorSaturation = Math.floor(Math.random() * 30) + 70; // 70-100%
      const colorLightness = Math.floor(Math.random() * 30) + 50; // 50-80%
      
      return {
        id: index,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 0.5}rem`,
        animationDuration: `${Math.random() * 30 + 15}s`,
        delay: `-${Math.random() * 30}s`,
        opacity: `${Math.random() * 0.3 + 0.05}`,
        color: `hsla(${colorHue}, ${colorSaturation}%, ${colorLightness}%, 0.15)`,
      };
    });
  }, []);
  
  // Stars for the cosmic background
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 0.15 + 0.05}rem`,
      animationDuration: `${Math.random() * 3 + 1}s`,
      delay: `-${Math.random() * 3}s`,
      opacity: `${Math.random() * 0.8 + 0.2}`,
    }));
  }, []);

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
      
      {/* Overlay to make the background more subtle - always dark */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[50px]" />
    </div>
  );
};

export default BackgroundAnimation;
