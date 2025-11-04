import { ImageUploader } from "../imageUploader/ImageUploader.tsx";
import ManageUploadForm from "./ManageUploadForm.tsx";
import { useManagePrevImg } from "../../../../hooks/useManagePrevImg.tsx";
import { useEffect } from "react";

interface EventsUploadFormProps {
  item?: {
    portfolioId?: number;
    url: string[];
    title: string;
    description: string;
    date: string;
  };
  isEdit?: boolean;
}

function ManageUploadComponent({ item, isEdit }: EventsUploadFormProps) {
  const isEvents = true;
  const {
    images,
    setImages,
    removeImage,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handleFileChange,
  } = useManagePrevImg(isEvents);
  useEffect(() => {
    //수정의 경우 url 밖에 없지만  새로올릴때는 File 타입이라 차이남
    // File 타입 요소인 preview에 url을 넣고 preview로 작업
    if (item) {
      const imageFiles = item.url.map((url) => {
        const file = new File([], url);
        return { ...file, preview: url };
      });
      setImages(imageFiles);
    }
  }, [item]);
  return (
    <ImageUploader
      images={images}
      removeImage={removeImage}
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      handleDragEnd={handleDragEnd}
      handleFileChange={handleFileChange}
      isEvents={isEvents}
    >
      <ManageUploadForm item={item} images={images} isEdit={isEdit} />
    </ImageUploader>
  );
}

export default ManageUploadComponent;
