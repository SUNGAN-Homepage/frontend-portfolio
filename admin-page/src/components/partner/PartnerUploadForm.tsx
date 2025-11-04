import { useEffect, useState } from "react";
import { Box, LinearProgress, TextField } from "@mui/material";
import ButtonComponent from "../common/ButtonComponent.tsx";
import UploadIcon from "@mui/icons-material/Upload";
import { useUploadPartner } from "../../hooks/useUploadPartner.tsx";

interface EventsUploadFormProps {
  image: File | undefined;
  item?: {
    partnerId?: number;
    url: string;
    name: string;
    address: string;
  };
  isEdit?: boolean;
}
function PartnerUploadForm({ item, image, isEdit }: EventsUploadFormProps) {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { uploadPartner } = useUploadPartner();
  // 업로드 버튼 클릭 시 업로드 시뮬레이션 후 초기화
  const handleUpload = async () => {
    if (!image || !name.trim()) return;
    setUploading(true);
    setProgress(0);
    uploadPartner({
      image: image,
      postData: {
        partnerId: item?.partnerId,
        url: "",
        name: name,
        address: address,
      },
      isEdit,
    });
  };
  useEffect(() => {
    if (item) {
      setName(item?.name);
      setAddress(item?.address);
    }
  }, [item]);

  return (
    <div>
      {/* 제목 및 설명 입력 영역 */}
      <Box sx={{ flex: 1 }}>
        <TextField
          multiline
          label="파트너 명"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="파트너 명"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="파트너 홈페이지"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={`파트너 홈페이지`}
          variant="outlined"
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
        disabled={!image || !name.trim() || uploading}
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

export default PartnerUploadForm;
