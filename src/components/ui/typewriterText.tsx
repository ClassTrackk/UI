import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  showCursor?: boolean;
  cursorClassName?: string;
  loop?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  className = "", 
  typingSpeed = 120, 
  deletingSpeed = 80, 
  pauseAfterTyping = 3000, 
  pauseAfterDeleting = 1000,
  showCursor = true,
  cursorClassName = "animate-pulse text-green-500",
  loop = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!loop && isComplete) return;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          if (loop) {
            setTimeout(() => setIsDeleting(true), pauseAfterTyping);
          } else {
            setIsComplete(true);
          }
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setTimeout(() => {
            setIsDeleting(false);
            setCurrentIndex(0);
          }, pauseAfterDeleting);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, typingSpeed, deletingSpeed, pauseAfterTyping, pauseAfterDeleting, loop, isComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className={cursorClassName}>|</span>}
    </span>
  );
};
export default TypewriterText