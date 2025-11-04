import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  display: 'flex',
  backgroundColor: 'white',
  color: 'black',
  borderBottom: '1px solid #c8c8c8',
  borderMargin: '2px',
  flexDirection: 'column', // 기본적으로 가로 배치
  justifyContent: 'center',
  overflow: 'hidden',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row', // 768px 이상에서는 가로 배치
    alignItems: 'center', // 로고와 메뉴 버튼이 세로로 붙지 않도록 정렬
    justifyContent: 'space-between', // 로고와 버튼이 왼쪽에 배치
  },
}));

export default function Header() {
  const pages = ['HOME', 'INFO', 'GALLERY', 'CONTACT'];
  const [selectedMenu, setSelectedMenu] = useState<string | null>('HOME');
  //클릭시 이동
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id.toLowerCase());
    const appBar = document.querySelector('.appbar'); // Appbar의 클래스를 가져옴

    if (element) {
      const appBarHeight = appBar ? appBar.getBoundingClientRect().height : 0; // Appbar 높이 가져오기
      const viewportHeight = window.innerHeight; // 현재 뷰포트 높이
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY; // 요소의 전체 위치
      const adjustedPosition =
        elementPosition -
        viewportHeight / 2 +
        element.clientHeight / 2 -
        appBarHeight;
      // 화면 중앙 정렬 후 Appbar 보정

      window.scrollTo({
        top: adjustedPosition,
        behavior: 'smooth', // 부드러운 스크롤 적용
      });
    }
  };

  //화면에 보이는 내용에 따라 메뉴 선택표시가 변경됨
  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치를 가져오고, 화면의 1/3 정도 아래를 기준으로 함
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let newActiveSection = selectedMenu; // 기본적으로 이전 값을 유지
      [...pages, 'PARTNER'].forEach((page) => {
        const element = document.getElementById(page.toLowerCase());
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // 현재 스크롤 위치가 해당 섹션의 범위 내에 있을 경우
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            newActiveSection = page;
          }
        }
      });
      //파트너일 경우도 INFO로 연결
      if (newActiveSection === 'PARTNER') {
        newActiveSection = 'INFO';
      }
      setSelectedMenu(newActiveSection); // 활성 섹션 업데이트
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedMenu]);

  return (
    <>
      <AppBar
        className="appbar"
        position="fixed"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          zIndex: 10,
        }}
      >
        <StyledToolbar>
          {/* 로고와 Instagram 아이콘을 모바일에서는 가로로 배치 */}
          <Box
            sx={{
              display: 'flex',
              width: { xs: '100%', sm: '250px' },
              justifyContent: 'space-between', // 로고와 Instagram 아이콘을 양쪽 끝에 배치
              alignItems: 'center',
            }}
          >
            {/* 로고 */}
            <Box sx={{ cursor: 'pointer', marginTop: '5px' }}>
              <img
                src={'/assets/LOGO.webp'}
                alt="로고"
                width="180"
                height="42"
                fetchPriority="high"
                style={{ marginRight: '10px' }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: 'block', sm: 'none' },
                marginLeft: '100px',
                flexShrink: 0,
              }}
            >
              <IconButton
                aria-label="인스타그램으로 이동"
                onClick={() =>
                  window.open(
                    'https://www.instagram.com/',
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))', // 메뉴 가로 배치
              gap: { xs: 2, sm: 3 }, // 메뉴 간 간격
              justifyContent: { xs: 'space-around', sm: 'start' },
              width: '100%',
              mt: 1,
            }}
          >
            {pages.map((page) => (
              <Box
                key={page}
                sx={{
                  position: 'relative', // 텍스트가 겹치도록 설정
                  display: 'grid', // Grid로 내부 요소 배치
                  gridTemplateRows: '1fr', // 같은 행에 두 텍스트 배치
                  alignItems: 'center',
                  justifyItems: 'center',
                  '&:hover .bigMenu': {
                    transform: 'translateY(0px) scale(1.2)', // 위로 올라오면서 확대
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    background: 'none',
                  },
                }}
              >
                {/* 기본 텍스트 */}
                <Button
                  className="bigMenu"
                  sx={{
                    color: 'black',
                    fontFamily: 'Nanum Myeongjo',
                    fontWeight: selectedMenu === page ? '700' : '400',
                    fontSize: {
                      xs: selectedMenu === page ? '1rem' : '0.8rem',
                      sm: selectedMenu === page ? '1.1rem' : '1rem',
                    },
                    gridColumn: '1 / 2', // 첫 번째 열
                    opacity: 1, // 초기 상태에서 표시
                    transform: 'translateY(0px)', // 초기 위치
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                    position: 'relative',
                  }}
                  onClick={() => {
                    setSelectedMenu(page);
                    scrollToSection(page);
                  }}
                >
                  {page}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Instagram 아이콘: 768px 이상에서 우측 상단으로 배치 */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              flexShrink: 0,
            }}
          >
            <IconButton
              sx={{ marginLeft: 'auto', marginTop: '5px' }}
              aria-label={'instagram'}
              onClick={() =>
                window.open(
                  'https://www.instagram.com/sungan__studio/',
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
