import { client } from "./api.tsx";

export const fetchPartner = async () => {
  const { data } = await client.get(`/api/v1/partner`);
  return data;
};

export const uploadPartner = async ({
  image,
  postData,
  isEdit = false,
}: {
  image: File | { preview: string };
  isEdit?: boolean;
  pathname?: string;
  postData: {
    partnerId?: number;
    url: string;
    name: string;
    address: string;
  };
}) => {
  let newUrl: string;
  if (image instanceof File) {
    console.log("업로드중:", image);
    newUrl = (
      await client.post(
        `/api/v1/image/upload/partner`,
        { file: image },
        { headers: { "Content-Type": "multipart/form-data" } },
      )
    ).data;
  } else {
    console.log(image);
    newUrl = image.preview;
  }

  // 이벤트 업로드 또는 수정 요청
  if (isEdit) {
    return client.put(`/api/v1/partner`, {
      id: postData.partnerId,
      name: postData.name,
      address: postData.address,
      url: newUrl,
    });
  } else {
    return client.post(`/api/v1/partner`, { ...postData, url: newUrl });
  }
};

export const deletePartner = async (id: number) => {
  return await client.delete(`/api/v1/partner/${id}`);
};
