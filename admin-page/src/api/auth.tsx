import { client } from "./api.tsx";

export const loginRequest = async (loginData: {
  userId: string;
  password: string;
}) => {
  const response = await client.post("/api/v1/users/login", loginData);
  return response.data; // 응답의 데이터 (토큰 등) 반환
};
