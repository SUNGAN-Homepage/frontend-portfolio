import React, { ChangeEvent, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ImgPreview from "../ManageUploader/ImgPreview.tsx";

interface ImageFile extends File {
  preview: string;
}
interface ImageUploaderProps {
  images: ImageFile[];
  removeImage: (index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  children?: ReactNode;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEvents?: boolean;
}

export function ImageUploader({
  images,
  removeImage,
  handleDrop,
  handleDragOver,
  handleDragEnd,
  children,
  handleFileChange,
}: ImageUploaderProps) {
  // 센서 설정 (마우스 및 키보드)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={images.map((img) => img.preview)}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* 업로드 영역 */}
            <UploadArea onDrop={handleDrop} onDragOver={handleDragOver}>
              <label
                htmlFor="dropzone-file"
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <UploadIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  클릭하여 업로드 또는 드래그 앤 드롭
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  PNG, JPG, GIF (최대 10MB)
                </Typography>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  multiple={pathname === "/events" || pathname === "/profile"}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </UploadArea>

            {/* children 영역 */}
            <Box
              sx={{
                flex: "0 0 60%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {children}
            </Box>
          </Box>
          <ImgPreview images={images} removeImage={removeImage} />
        </SortableContext>
      </DndContext>
    </Box>
  );
}

// 업로드 영역 스타일링
const UploadArea = styled(Box)`
  flex: 0 0 40%;
  height: 250px;
  border: 2px dashed #ccc;
  background-color: #f7f7f7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;
