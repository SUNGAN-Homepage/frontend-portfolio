import { Box, Divider, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import { AnimatedComponent } from '../common/AnimatedComponent.tsx';

function Contact() {
  return (
    <AnimatedComponent id={'contact'}>
      <section className="Contact">
        <Box sx={{ marginX: { xs: 2, sm: 20 } }}>
          <Box
            sx={{
              margin: '0 auto',
              textAlign: 'center',
              padding: 2, // 필요에 따라 패딩 조정
            }}
          >
            <Divider
              sx={{
                borderColor: 'black',
                borderWidth: '1.5px',
                margin: '0 auto 4px auto', // 위쪽 마진 0, 아래쪽 마진 4px, 좌우 마진 auto
                width: { xs: '120px', sm: '250px' }, // 선의 너비 설정
              }}
            />
            <Divider
              sx={{
                borderColor: 'black',
                borderWidth: '1.5px',
                margin: '4px auto 4px auto', // 위쪽 마진 4px, 아래쪽 마진 12px, 좌우 마진 auto
                width: { xs: '120px', sm: '250px' }, // 선의 너비 설정
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Georgia,serif',
                fontSize: { xs: '16px', sm: '40px' },
                fontWeight: '700',
              }}
            >
              CONTACT
            </Typography>
            <Divider
              sx={{
                borderColor: 'black',
                borderWidth: '1.5px',
                margin: '4px auto 4px auto', // 위쪽 마진 0, 아래쪽 마진 4px, 좌우 마진 auto
                width: { xs: '120px', sm: '250px' }, // 선의 너비 설정
              }}
            />
            <Divider
              sx={{
                borderColor: 'black',
                borderWidth: '1.5px',
                margin: '4px auto 12px auto', // 위쪽 마진 4px, 아래쪽 마진 12px, 좌우 마진 auto
                width: { xs: '120px', sm: '250px' }, // 선의 너비 설정
              }}
            />
          </Box>
          <ContactForm />
        </Box>
      </section>
    </AnimatedComponent>
  );
}
export default Contact;
