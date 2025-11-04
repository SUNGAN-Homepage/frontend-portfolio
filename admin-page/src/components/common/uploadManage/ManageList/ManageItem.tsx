import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CreateOutlined } from "@mui/icons-material";
import { useIsActiveIdx } from "../../../../context/IsActiveIdxContext.tsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface EventItem {
  portfolioId: number;
  description: string;
  url: string[];
  title: string;
  date: string;
}
interface PartnerItem {
  partnerId: number;
  url: string;
  name: string;
  address: string;
}
function ManageItem({
  item,
  index,
  handleDelete,
  children,
}: {
  item: EventItem | PartnerItem;
  index: number;
  handleDelete: (id: number) => void;
  children: React.ReactElement;
}) {
  const { isActiveIdx, setIsActiveIdx } = useIsActiveIdx();
  const { pathname } = useLocation();
  //컴포넌트를 공유해서 페이지가 바뀌면 닫아줘야함.
  useEffect(() => {
    setIsActiveIdx(null);
  }, [pathname]);
  const handleCloseOpen = () => {
    //열려 있으면 닫기
    if (isActiveIdx === index) {
      setIsActiveIdx(null);
    } else {
      //     닫겨있으면 열기
      if (isActiveIdx != null) {
        if (
          confirm(
            "수정또는 추가중인 항목이 있습니다. 기존 창을 닫고 새로 여시겠습니까?",
          )
        ) {
          setIsActiveIdx(index);
        }
      } else setIsActiveIdx(index);
    }
  };

  const getImageUrl = (url: string | string[]) => {
    return Array.isArray(url) ? url[0] : url;
  };
  return (
    <Card sx={{ marginTop: "20px", marginBottom: "20px" }}>
      <CardHeader
        title={"portfolioId" in item ? item.title : item.name}
        subheader={"portfolioId" in item ? item.description : item.address}
      />
      <CardContent>
        <img
          src={getImageUrl(item.url)}
          alt={getImageUrl(item.url)}
          width="100%"
        />
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          padding: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "#e4e3e7" }}
          onClick={handleCloseOpen}
        >
          <CreateOutlined sx={{ marginRight: 1 }} />
          {isActiveIdx === index ? "수정 취소" : "수정"}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(index)}
        >
          <DeleteOutlineIcon sx={{ marginRight: 1 }} />
          삭제
        </Button>
      </Box>
      {isActiveIdx === index && <Box sx={{ padding: 4 }}>{children}</Box>}
    </Card>
  );
}

export default ManageItem;
