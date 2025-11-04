import { useEffect, useState } from "react";
import { useManagePrevImg } from "../../hooks/useManagePrevImg.tsx";
import { ImageUploader } from "../common/uploadManage/imageUploader/ImageUploader.tsx";
import PartnerUploadForm from "./PartnerUploadForm.tsx";

interface PartnerUploadComponent {
  item?: {
    partnerId: number;
    url: string;
    name: string;
    address: string;
  };
  isEdit?: boolean;
}

function PartnerUploadComponent({ item, isEdit }: PartnerUploadComponent) {
  const isEvents = true;
  const {
    images,
    setImages,
    removeImage,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handlePartnerFileChange,
  } = useManagePrevImg(isEvents);
  const [partnerImage, setPartnerImage] = useState<File | undefined>();
  useEffect(() => {
    setPartnerImage(images[0]);
  }, [images]);
  useEffect(() => {
    if (item) {
      const file = new File([], item.url);
      const imageFiles = { ...file, preview: item.url };
      setImages([imageFiles]);
    }
  }, [item]);

  return (
    <ImageUploader
      images={images}
      removeImage={removeImage}
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      handleDragEnd={handleDragEnd}
      handleFileChange={handlePartnerFileChange}
      isEvents={isEvents}
    >
      <PartnerUploadForm image={partnerImage} item={item} isEdit={isEdit} />
    </ImageUploader>
  );
}

export default PartnerUploadComponent;
