import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import ButtonComponent from "../common/ButtonComponent.tsx";
import { useEffect, useState } from "react";
import { client } from "../../api/api.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../common/Loading/Loading.tsx";
import SideMenu from "../common/SideMenu.tsx";

function Email() {
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState<string>("");
  const fetchData = async () => {
    const { data } = await client.get(
      `/api/v1/users?userId=${localStorage.getItem("userId")}`,
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["email"],
    queryFn: fetchData,
  });
  if (isError) {
    alert("오류가 발생했습니다.");
  }
  useEffect(() => {
    setEmail(data?.email);
  }, [data]);

  const putEmailData = async () => {
    return await client.put("/api/v1/users/email", {
      email,
    });
  };

  const mutation = useMutation({
    mutationFn: putEmailData,

    onSuccess() {
      alert("성공적으로 email이 수정되었습니다.");
    },
    onError(error) {
      console.error(error);
      alert("에러가 발생했습니다.");
    },
  });
  const handleSubmit = () => {
    if (isEdit) {
      mutation.mutate();
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };
  return (
    <SideMenu>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 4 }}>
        Email 설정
      </Typography>
      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <Box sx={{ alignItems: "center" }}>
          <CardHeader
            title="연락처 이메일 관리"
            subheader="사용자들이 연락할 수 있는 이메일 주소를 관리합니다."
          />
          <CardContent>
            {isEdit ? (
              <TextField
                placeholder={"이메일을 입력해주세요"}
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
                {email}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end", // 오른쪽 정렬
                gap: 2, // 버튼 간의 간격
                marginTop: 3,
              }}
            >
              {/* 취소 버튼 */}
              {isEdit && (
                <Button
                  size={"large"}
                  variant={"outlined"}
                  sx={{
                    color: "black",
                    borderColor: "#e4e4e7",
                  }}
                  onClick={() => {
                    setEmail(data?.email);
                    setIsEdit(false);
                  }}
                >
                  취소
                </Button>
              )}
              {/* 수정 버튼 */}
              <ButtonComponent size={"large"} onClick={() => handleSubmit()}>
                {isEdit ? "저장" : "수정"}
              </ButtonComponent>
            </Box>
          </CardContent>
        </Box>
      </Card>
      {isLoading && <Loading />}
    </SideMenu>
  );
}

export default Email;
