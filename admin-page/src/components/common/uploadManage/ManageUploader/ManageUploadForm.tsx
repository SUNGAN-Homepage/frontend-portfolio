import { useEffect, useState } from "react";
import { Box, LinearProgress, TextField } from "@mui/material";
import ButtonComponent from "../../ButtonComponent.tsx";
import UploadIcon from "@mui/icons-material/Upload";
import { useUpload } from "../../../../hooks/useUpload.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ManageUploadForm.css";
import { ko } from "date-fns/locale";

interface EventsUploadFormProps {
  images: File[];
  item?: {
    portfolioId?: number;
    url: string[];
    title: string;
    description: string;
    date: string; // 서버에서 date는 string
  };
  isEdit?: boolean;
}

function ManageUploadForm({ item, images, isEdit }: EventsUploadFormProps) {
  const [title, setTitle] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null); // Date or null
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { uploadEvent } = useUpload();

  // 업로드 버튼 클릭 시 업로드 후 초기화
  const handleUpload = async () => {
    if (images.length === 0 || !title.trim()) return;
    setUploading(true);
    setProgress(0);

    // DatePicker에서 선택된 날짜를 ISO 형식의 문자열로 변환
    const formattedDate = date ? date.toISOString() : "";

    uploadEvent({
      images: images,
      postData: {
        portfolioId: item?.portfolioId,
        url: [],
        title: title,
        description: place,
        date: formattedDate, // Ensure it's a string when sending to backend
      },
      isEdit,
    });
  };
  // 수정일때 받아온 데이터를 넣음
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setPlace(item.description);
      // Convert string date from item to Date object
      setDate(item.date ? new Date(item.date) : null);
    }
  }, [item]);

  return (
    <div>
      {/* 제목 및 설명 입력 영역 */}
      <Box sx={{ flex: 1 }}>
        <TextField
          label="제목"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`제목`}
          required
          variant="outlined"
        />
        <TextField
          multiline
          label="장소"
          fullWidth
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="장소"
          sx={{ marginTop: 2 }}
        />
        <DatePicker
          locale={ko}
          selected={date}
          onChange={(newDate: Date | null) => setDate(newDate)} // Handle Date | null correctly
          dateFormat="yyyy-MM-dd"
          customInput={
            <TextField
              label="촬영 일시"
              fullWidth
              placeholder="촬영 일시"
              sx={{
                marginTop: 2,
                "& .MuiInputBase-root": {
                  borderRadius: "4px",
                  // padding: "12px",
                },
                "& .MuiFormLabel-root": {
                  fontSize: "1rem",
                },
              }}
            />
          }
        />
      </Box>

      {uploading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: "100%", height: "5px" }}
        />
      )}

      <ButtonComponent
        onClick={handleUpload}
        disabled={
          images.length === 0 ||
          !title.trim() ||
          uploading ||
          !place.trim() ||
          !date
        }
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {uploading ? "업로드 중..." : "업로드"}
        <UploadIcon sx={{ ml: 1, fontSize: 20 }} />
      </ButtonComponent>
    </div>
  );
}

export default ManageUploadForm;
