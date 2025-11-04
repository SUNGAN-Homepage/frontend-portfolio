import { Box, IconButton, Typography } from "@mui/material";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import ClearIcon from "@mui/icons-material/Clear";
import { CSS } from "@dnd-kit/utilities";

interface ImageFile extends File {
  preview: string;
}

interface ImageUploaderProps {
  images: ImageFile[];
  removeImage: (index: number) => void;
}

function ImgPreview({ images, removeImage }: ImageUploaderProps) {
  return (
    <>
      <>
        {images.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 2,
              p: 2,
              backgroundColor: "#f3f4f6",
            }}
          >
            {images.map((image, index) => (
              <SortableImage
                key={image.preview + index}
                id={image.preview}
                src={image.preview}
                index={index}
                onRemove={() => removeImage(index)}
              />
            ))}
          </Box>
        )}
      </>
    </>
  );
}
// 이미지 컴포넌트 (드래그 가능)
function SortableImage({
  id,
  src,
  index,
  onRemove,
}: {
  id: string;
  src: string;
  index: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        boxShadow: 2,
        borderRadius: 2,
        ...getItemStyles(index),
      }}
      style={style}
    >
      <StyledImage $isFirst={index === 0} src={src} alt={src} />
      <Typography
        sx={{
          position: "absolute",
          top: "2px",
          left: "2px",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
          fontSize: "18px",
        }}
      >
        {index + 1}
      </Typography>

      {/* 삭제 버튼 */}
      <IconButton
        onClick={(e) => {
          if (confirm("삭제하시겠습니까?")) {
            e.stopPropagation(); // 부모 요소의 드래그 이벤트 방지
            e.preventDefault();
            onRemove(); // 삭제 실행
          }
        }}
        sx={{
          position: "absolute",
          top: "2px",
          right: "2px",
          width: "20px",
          height: "20px",
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

// 첫 번째 이미지 스타일을 크게
function getItemStyles(index: number) {
  return index === 0
    ? {
        fontSize: "2rem",
        padding: "36px 40px",
        width: "230px",
        height: "230px",
        gridRowStart: "span 2",
        gridColumnStart: "span 2",
      }
    : {
        width: "140px",
        height: "140px",
      };
}

const StyledImage = styled.img<{ $isFirst: boolean }>`
  width: ${({ $isFirst }) => ($isFirst ? "310px" : "150px")};
  height: ${({ $isFirst }) => ($isFirst ? "310px" : "150px")};
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;
export default ImgPreview;
