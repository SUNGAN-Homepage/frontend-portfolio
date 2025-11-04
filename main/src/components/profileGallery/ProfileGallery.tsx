import { useMemo, useRef, useState } from 'react';
import { PortFolio } from '../common/portfolio/PortFolio.tsx';
import './ProfileGallery.css';
import { Box, useMediaQuery } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CustomNextArrow,
  CustomPrevArrow,
} from '../common/react-slick/CustomArrow.tsx';
import PortFolioModal from '../common/portfolio/PortFolioModal.tsx';
import Slider from 'react-slick';
import { styled } from '@mui/material/styles';
import { profileDummy } from '../../DummyData/DummyData.tsx'; // react-slick import

interface Data {
  date: string;
  description: string;
  portfolioId: number;
  title: string;
  url: string[];
}

function ProfileGallery() {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isMobile = useMediaQuery('(min-width: 385px) and (max-width: 767px)');
  const isSmallMobile = useMediaQuery('(max-width: 384px)');
  const sliderRef = useRef<Slider | null>(null); // sliderRef로 슬라이더 컴포넌트를 참조
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 현재 슬라이드 인덱스를 추적
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<Data | null>(null);
  const data: Data[] = profileDummy;
  // const { data, isLoading } = useQuery<Data[]>(
  //   'profileData', // query key
  //   async () => {
  //     const response = await client.get('/api/v1/portfolio?type=profile');
  //     return response.data; // 데이터를 반환
  //   },
  //   {
  //     onError: (error) => {
  //       console.error(error);
  //       alert('에러가 발생했습니다.');
  //     },
  //   },
  // );

  const handleImageClick = (image: Data) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  // 도트 클릭 시 해당 슬라이드로 이동
  const handleDotClick = (index: number) => {
    setCurrentSlideIndex(index); // 클릭된 도트의 인덱스 저장
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index); // 해당 슬라이드로 이동
    }
  };
  const settings = useMemo(() => {
    const slideToShow = isMobile || isSmallMobile ? 1 : isTablet ? 4 : 4;

    return {
      dots: false, // 기본 도트 표시
      infinite: false,
      speed: 500,
      // centerMode: !(isMobile || isSmallMobile),
      lazyLoad: true,
      slidesToShow: slideToShow,
      slidesToScroll: 1,
      prevArrow: (
        <CustomPrevArrow onClick={() => sliderRef.current?.slickPrev()} />
      ), // CustomPrevArrow 클릭 시 이전 슬라이드로 이동
      nextArrow: (
        <CustomNextArrow onClick={() => sliderRef.current?.slickNext()} />
      ), // CustomNextArrow 클릭 시 다음 슬라이드로 이동
      accessibility: false,
      afterChange: (current: number) => {
        setCurrentSlideIndex(current);
      },
    };
  }, [isMobile, isSmallMobile, isTablet]);
  const dotCount = Math.max((data?.length || 0) - settings.slidesToShow + 1);

  return (
    <div className="profile">
      <PortFolio
        isProfile={true}
        settings={settings}
        currentSlideIndex={currentSlideIndex}
        handleDotClick={handleDotClick}
        sliderRef={sliderRef} // 추가 전달
      >
        {data?.map((image: Data, index) => (
          <div
            className="slide"
            key={index}
            onClick={() => handleImageClick(image)}
          >
            <img
              className={'profile-img'}
              src={image.url[0]}
              alt={image.url[0]}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </PortFolio>

      {/* 커스텀 도트 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {Array.from({ length: dotCount })?.map((_, index) => (
          <CustomDot
            sx={{
              backgroundColor:
                index === currentSlideIndex ? '#404040' : '#bfbfbf',
            }}
            key={index}
            onClick={() => handleDotClick(index)} // 도트 클릭 시 해당 슬라이드로 이동
          />
        ))}
      </div>

      <PortFolioModal
        isProfile={true}
        isOpen={isOpen}
        currentImage={currentImage}
        handleClose={handleClose}
      />
      {/*{isLoading && <Loading />}*/}
    </div>
  );
}

export default ProfileGallery;
const CustomDot = styled(Box)`
  width: 7px;
  height: 7px;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: black;
  }
`;
