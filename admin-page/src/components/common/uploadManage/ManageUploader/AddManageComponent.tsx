import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import ButtonComponent from "../../ButtonComponent.tsx";
import { useIsActiveIdx } from "../../../../context/IsActiveIdxContext.tsx";
import { useLocation } from "react-router-dom";

function AddManageComponent({ children }: { children: React.ReactNode }) {
  const { isActiveIdx, setIsActiveIdx } = useIsActiveIdx();
  const handleClose = () => {
    setIsActiveIdx(null);
  };
  const { pathname } = useLocation(); // URL에서 `type` 가져오기
  const handleOpen = () => {
    //null 이 아니면
    if (isActiveIdx != null) {
      if (
        confirm(
          "수정또는 추가중인 항목이 있습니다. 기존 창을 닫고 새로 여시겠습니까?",
        )
      ) {
        setIsActiveIdx(-1);
      }
    } else {
      setIsActiveIdx(-1);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 4 }}>
        {`${pathname === "/events" ? "행사" : pathname === "/profile" ? "프로필" : "파트너"} 이미지 수정 관리`}
      </Typography>

      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardHeader
            title={`${pathname === "/events" ? "행사" : pathname === "/profile" ? "프로필" : "파트너"} 이미지 업로드`}
            subheader={`${pathname === "/events" ? "행사" : pathname === "/profile" ? "프로필" : "파트너"}에 사용될 이미지와 정보를 업로드하세요.`}
          />
          {isActiveIdx === -1 && (
            <ButtonComponent
              sx={{ marginLeft: "auto", marginRight: 2 }}
              onClick={() => handleClose()}
            >
              취소
            </ButtonComponent>
          )}
        </Box>
        {isActiveIdx != -1 && (
          <ButtonComponent
            sx={{ marginLeft: 2 }}
            onClick={() => {
              handleOpen();
            }}
          >
            {`새 ${pathname === "/events" ? "행사" : pathname === "/profile" ? "프로필" : "파트너"} 항목 추가`}
          </ButtonComponent>
        )}
        {isActiveIdx === -1 && <CardContent>{children}</CardContent>}
      </Card>
    </>
  );
}

export default AddManageComponent;
