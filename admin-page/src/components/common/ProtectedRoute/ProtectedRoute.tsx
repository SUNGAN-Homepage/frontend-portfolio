import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loading/Loading.tsx";
import { client } from "../../../api/api.tsx";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await client.get("/api/v1/users/session");
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("세션이 만료되었거나 로그인되지 않음:", error);
        alert("로그인이 필요한 페이지입니다.");
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div>
        <Loading />
      </div>
    ); // 세션 확인 중이면 로딩 화면 표시
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
