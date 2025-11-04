import { createContext, useContext, useState } from "react";

// 1. Context 생성
const IsActiveIdxContext = createContext<{
  isActiveIdx: number | null;
  setIsActiveIdx: React.Dispatch<React.SetStateAction<number | null>>;
} | null>(null);

// 2. Provider 생성
export const IsActiveIdxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isActiveIdx, setIsActiveIdx] = useState<number | null>(null);
  return (
    <IsActiveIdxContext.Provider value={{ isActiveIdx, setIsActiveIdx }}>
      {children}
    </IsActiveIdxContext.Provider>
  );
};

// 3. Context를 쉽게 사용할 수 있는 커스텀 훅
export const useIsActiveIdx = () => {
  const context = useContext(IsActiveIdxContext);

  if (!context) {
    throw new Error(
      "useIsActiveIdx must be used within an IsActiveIdxProvider",
    );
  }
  return context;
};
