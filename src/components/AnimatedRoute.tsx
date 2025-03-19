
import { ReactNode, useEffect, useState } from 'react';

interface AnimatedRouteProps {
  children: ReactNode;
}

const AnimatedRoute = ({ children }: AnimatedRouteProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for smoother animation
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-4 blur-sm'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedRoute;
