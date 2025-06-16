import React from "react";

interface AnimatedImage {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animation?: 'float' | 'bounce' | 'pulse' | 'spin' | 'swing' | 'sway' | 'wobble' | 'gentleSway' | 'scale' | 'glow';
  speed?: 'slow' | 'normal' | 'fast';
}

const AnimatedImage: React.FC<AnimatedImage> = ({
  src,
  alt,
  className = "",
  size = 'md',
  animation = 'float',
  speed = 'normal'
}) => {
  React.useEffect(() => {
    const styleId = 'animated-image-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        
        @keyframes sway {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(15px); }
        }
        
        @keyframes wobble {
          0% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          50% { transform: translateX(0px) rotate(0deg); }
          75% { transform: translateX(10px) rotate(5deg); }
          100% { transform: translateX(0px) rotate(0deg); }
        }
        
        @keyframes gentle-sway {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        @keyframes scale-custom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.5));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.8)) 
                    drop-shadow(0 0 30px rgba(34, 197, 94, 0.6));
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
        
        .animate-sway {
          animation: sway 2.5s ease-in-out infinite;
        }
        
        .animate-wobble {
          animation: wobble 3s ease-in-out infinite;
        }
        
        .animate-gentle-sway {
          animation: gentle-sway 4s ease-in-out infinite;
        }
        
        .animate-scale-custom {
          animation: scale-custom 2s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-slow {
          animation-duration: 4s !important;
        }
        
        .animate-fast {
          animation-duration: 1s !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Classi per le dimensioni
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  // Classi per le velocità
  const speedClasses = {
    slow: 'animate-slow',
    normal: '',
    fast: 'animate-fast'
  };

  // Classi per le animazioni
  const animationClasses = {
    float: 'animate-float',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    swing: 'animate-swing',
    sway: 'animate-sway',
    wobble: 'animate-wobble',
    gentleSway: 'animate-gentle-sway',
    scale: 'animate-scale-custom',
    glow: 'animate-glow'
  };

  return (
    <div className={`${sizeClasses[size]} ${animationClasses[animation]} ${speedClasses[speed]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};

export default AnimatedImage