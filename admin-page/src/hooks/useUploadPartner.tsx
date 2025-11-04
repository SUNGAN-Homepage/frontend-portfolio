import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useIsActiveIdx } from "../context/IsActiveIdxContext.tsx";
import { deletePartner, fetchPartner, uploadPartner } from "../api/partner.tsx";

interface Item {
  partnerId: number;
  url: string;
  name: string;
  address: string;
}

export const useUploadPartner = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { setIsActiveIdx } = useIsActiveIdx();

  //페이지 위치 마다 통신이 달라짐
  // 이벤트 목록 불러오기
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getPartner"],
    queryFn: fetchPartner,
  });

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  // 이벤트 업로드 또는 수정하기
  const { mutate, isPending } = useMutation({
    mutationFn: uploadPartner,
    onSuccess: () => {
      setIsActiveIdx(null);
      refetch(); // 업로드 후 리스트 다시 불러오기
      alert("성공적으로 업로드 되었습니다.");
    },
    onError: () => {
      alert("업로드에 실패했습니다.");
    },
  });

  const { mutate: deleteMutation, isPending: isDelPending } = useMutation({
    mutationFn: (partnerId: number) => deletePartner(partnerId),
    onSuccess(_, partnerId) {
      alert("성공적으로 삭제되었습니다.");
      setIsActiveIdx(null);
      const newItems = items.filter((i: Item) => i.partnerId !== partnerId);
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
    uploadPartner: mutate,
    isUploading: isPending,
  };
};
