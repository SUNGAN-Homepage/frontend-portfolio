import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvents, uploadEvent } from "../api/events";
import { useState, useEffect } from "react";
import { useIsActiveIdx } from "../context/IsActiveIdxContext.tsx";
import { useLocation } from "react-router-dom";

interface Item {
  portfolioId: number;
  description: string;
  url: string[];
  title: string;
  date: string;
}
interface UploadItem {
  images: File[];
  isEdit?: boolean;
  postData: {
    portfolioId?: number;
    url: string[];
    title: string;
    description: string;
    date: string;
  };
}

export const useUpload = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { setIsActiveIdx } = useIsActiveIdx();
  const { pathname } = useLocation();

  //페이지 위치 마다 통신이 달라짐
  // 이벤트 목록 불러오기
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getEvent", pathname],
    queryFn: () => fetchEvents(pathname),
  });

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  // 이벤트 업로드 또는 수정하기
  const { mutate, isPending } = useMutation({
    mutationFn: ({ images, postData, isEdit }: UploadItem) =>
      uploadEvent({
        images,
        postData,
        isEdit,
        pathname, // pathname을 전달
      }),
    onSuccess: () => {
      alert("성공적으로 업로드 되었습니다.");
      setIsActiveIdx(null);
      refetch(); // 업로드 후 리스트 다시 불러오기
    },
    onError: () => {
      alert("업로드에 실패했습니다.");
    },
  });

  const { mutate: deleteMutation, isPending: isDelPending } = useMutation({
    mutationFn: (portfolioId: number) => deleteEvent(portfolioId),
    onSuccess(_, portfolioId) {
      alert("성공적으로 삭제되었습니다.");
      setIsActiveIdx(null);
      const newItems = items.filter((i: Item) => i.portfolioId !== portfolioId);
      setItems(newItems);
    },
    onError(error) {
      console.log(error);
    },
  });

  return {
    items,
    setItems,
    deleteMutation,
    isDelPending,
    isLoading,
    isError,
    uploadEvent: mutate,
    isUploading: isPending,
  };
};
