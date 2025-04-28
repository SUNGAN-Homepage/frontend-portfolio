import { ReactNode, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Partner.css';

import { Box } from '@mui/material';
import { AnimatedComponent } from '../common/AnimatedComponent.tsx';
import { partnersDummy } from '../../DummyData/DummyData.tsx';

type Partner = {
  partnerId: number;
  url: string;
  name: string;
  address: string;
};

function Partner() {
  const sliderRef = useRef<Slider | null>(null); // sliderRef로 슬라이더 컴포넌트를 참조
  const data: Partner[] = partnersDummy;
  // const { data=[], isLoading } = useQuery<Partner[] >(
  //   'PartnerData', // query key
  //   async () => {
  //     const response = await client.get('/api/v1/partner');
  //     return response.data; // 데이터를 반환
  //   },
  //   {
  //     onError: (error) => {
  //       console.error(error);
  //       alert('에러가 발생했습니다.');
  //     },
  //   },
  // );
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
    appendDots: (dots: ReactNode) => (
      <Box
        sx={{
          borderRadius: '10px',
          marginTop: { xs: -35, sm: '40px' },
          marginLeft: '-20px',
        }}
      >
        <ul style={{ margin: '0px' }}>{dots}</ul>
      </Box>
    ),
  };

  return (
    <AnimatedComponent id={'partner'}>
      <section className="partner">
        <h2 className="partner-title">PARTNER</h2>
        <Slider {...settings} ref={sliderRef}>
          {data?.map((partner) => (
            <div className="partner-item" key={partner.partnerId}>
              <img
                src={partner.url}
                alt={partner.name}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    partner.address,
                    '_blank',
                    'width=1200,height=800',
                  );
                }}
                style={{
                  cursor: 'pointer',
                  margin: '0 auto',
                }}
              />
            </div>
          ))}
        </Slider>
      </section>
      {/*{isLoading && <Loading />}*/}
    </AnimatedComponent>
  );
}

export default Partner;
