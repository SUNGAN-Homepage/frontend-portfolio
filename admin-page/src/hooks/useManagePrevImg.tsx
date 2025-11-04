import { ChangeEvent, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

interface ImageFile extends File {
  preview: string;
}

// 이미지 상태를 관리하는 커스텀 훅
export function useManagePrevImg(isEvents: boolean = false) {
  const [images, setImages] = useState<ImageFile[]>([]);

  // 이미지 추가
  const addImages = (files: File[]) => {
    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    if (!isEvents && images.length > 0) {
      setImages(newImages);
      return;
    }

    setImages((prev) => [...prev, ...newImages]);
  };
  // 이미지 추가
  const partnerAddImages = (files: File[]) => {
    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    if (!isEvents && images.length > 0) {
      setImages(newImages);
      return;
    }

    setImages(newImages);
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 이미지 드래그 앤 드롭
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (isEvents && files.length > 0) {
      addImages(files);
    } else if (!isEvents && files.length == 1) {
      addImages(files);
    } else {
      alert("이미지를 한장만 업로드 할 수 있습니다. 다시 시도해주세요");
    }
  };

  // handleDragEnd 수정: DragEndEvent 타입 사용
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.preview === active.id);
      const newIndex = images.findIndex((img) => img.preview === over?.id);
      setImages((prevImages) => arrayMove(prevImages, oldIndex, newIndex));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 파일 변경 이벤트 처리
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      addImages(files);
    }
  };
  // 파트너 파일 변경 이벤트 처리
  const handlePartnerFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      partnerAddImages([file]); // 한 개의 파일만 전달
    }
  };

  return {
    images,
    setImages,
    addImages,
    removeImage,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handleFileChange,
    handlePartnerFileChange,
  };
}
