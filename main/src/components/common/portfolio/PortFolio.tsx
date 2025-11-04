import { AnimatedComponent } from '../AnimatedComponent.tsx';
import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PortFolio.css';

export const PortFolio = ({
  isProfile,
  settings,
  children,
  sliderRef, // 추가
}: {
  isProfile: boolean;
  settings: object;
  children: ReactNode;
  currentSlideIndex: number;
  handleDotClick: (index: number) => void;
  sliderRef: React.RefObject<Slider>; // 추가
}) => {
  return (
    <AnimatedComponent id={'gallery'}>
      <section className={isProfile ? 'profile' : 'events'}>
        <h2 className="portfolio-title">
          {isProfile ? 'Profile' : 'Business'}
        </h2>
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>{' '}
        {/* sliderRef 적용 */}
      </section>
    </AnimatedComponent>
  );
};
