import { Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

interface PortfolioModalProps {
  isOpen: boolean;
  currentImage: {
    date: string;
    description: string;
    portfolioId: number;
    title: string;
    url: string[];
  } | null;
  handleClose: () => void;
  isProfile?: boolean;
}

const PortFolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  currentImage,
  handleClose,
  isProfile,
}) => {
  const changeDateType = (data: string) => {
    return new Date(data).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  return (
    <>
      {isOpen && currentImage && (
        <div className="modal" onClick={handleClose}>
          <button
            className="close-button"
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: '5',
            }}
          >
            <Close />
          </button>
          <Box
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            sx={{
              borderRadius: '7px',
              maxHeight: '90vh',
              overflow: 'auto',
              backgroundColor: 'white',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  color: 'black',
                  fontSize: '30px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                {currentImage.title}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'black',
                  borderTop: '1px solid #eeeeee',
                  borderBottom: '1px solid #eeeeee',
                }}
              >
                촬영일시 : {changeDateType(currentImage.date)}
              </Typography>
              {!isProfile && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'black',
                    borderBottom: '1px solid #eeeeee',
                  }}
                >
                  행사장소 :{currentImage.description}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
              }}
            >
              {currentImage.url.map((image: string, index: number) => (
                <Box key={index} sx={{ cursor: 'pointer' }}>
                  <img
                    src={image}
                    style={{
                      width: '100%',
                    }}
                    alt={image}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};
export default PortFolioModal;
