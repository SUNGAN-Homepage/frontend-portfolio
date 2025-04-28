import { Box, Button, Typography } from '@mui/material';
import { AnimatedComponent } from '../common/AnimatedComponent.tsx';

function Intro() {
  return (
    <AnimatedComponent id="home">
      <Box
        sx={{
          background: 'gray',
          mt: { xs: 5, sm: '0' },
          backgroundImage: `url(${'/assets/Intro.jpg'})`,
          backgroundSize: 'cover',
          height: '650px',
          backgroundPosition: 'center bottom',
        }}
      >
        <Box
          sx={{
            textAlign: { xs: 'center', sm: 'start' },
            marginLeft: { xs: 0, sm: 5 },
            padding: 4,
          }}
        >
          <Typography
            variant="h3"
            marginBottom={3}
            marginTop={{ xs: 8, sm: 10 }}
            sx={{
              color: 'white',
              fontFamily: 'Pretendard, sans-serif',
              fontWeight: 600,
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
              wordBreak: 'keep-all', // 단어 기준 줄바꿈 (중간에 안 끊김)
              overflowWrap: 'break-word', // 필요시 줄바꿈 허용
            }}
          >
            지역 축제 및 행사 아카이빙 플랫폼
          </Typography>
          <Typography
            variant="h5"
            marginBottom={10}
            sx={{
              color: 'white',
              fontFamily: ' Pretendard, sans-serif',
              fontWeight: 500,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              wordBreak: 'keep-all', // 단어 기준 줄바꿈 (중간에 안 끊김)
              overflowWrap: 'break-word', // 필요시 줄바꿈 허용
            }}
          >
            지역 축제 및 행사 기록을 남기는 아카이빙 플랫폼입니다.
          </Typography>

          <Button
            sx={{
              marginTop: 5,
              width: '150px',
              background: 'white',
              color: 'black',
              fontWeight: 600,
              fontFamily: 'Pretendard, sans-serif',
              marginBottom: 5,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                background: '#f5f5f5',
              },
            }}
            onClick={() =>
              window.open(
                'https://booking.naver.com/booking/',
                '_blank',
                'noopener,noreferrer',
              )
            }
          >
            예약하기
          </Button>
        </Box>
      </Box>
    </AnimatedComponent>
  );
}

export default Intro;
