import React, { useEffect, useRef, useState } from 'react';
import './AnimatedComponent.css'; // CSS 파일 추가

interface AnimatedComponentProps {
  children: React.ReactNode;
  id: string;
}

export const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  id,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 화면에 나타나면 true
        } else {
          setIsVisible(false); // 화면에서 사라지면 false
        }
      },
      { threshold: 0.5 }, // 너무 자주 실행되지 않도록 임계값을 조정
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} id={id} className={`fade-up ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};
