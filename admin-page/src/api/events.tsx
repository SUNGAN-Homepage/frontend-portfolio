import { client } from "./api";

// 이벤트 목록 불러오기
export const fetchEvents = async (pathname: string) => {
  const apiUrl =
    pathname === "/events"
      ? `/api/v1/portfolio?type=event`
      : `/api/v1/portfolio?type=profile`;
  const { data } = await client.get(apiUrl);
  return data;
};

// 이미지 WebP로 압축 후 업로드하는 함수
export const uploadEvent = async ({
  images,
  postData,
  isEdit = false,
  pathname,
}: {
  images: (File | { preview: string })[];
  isEdit?: boolean;
  pathname: string;
  postData: {
    portfolioId?: number;
    url: string[];
    title: string;
    description: string;
    date: string;
  };
}) => {
  // WebP로 변환한 이미지 데이터 URL을 담을 배열
  const convertedImages = images.map(async (image) => {
    if (image instanceof File) {
      // File을 Blob으로 변환
      const blob = new Blob([image], { type: image.type });

      // 이미지 로드
      return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            // Canvas를 통해 WebP로 변환
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);

            // WebP로 변환
            canvas.toBlob((blob) => {
              if (blob) {
                // WebP로 변환된 Blob을 File로 변환하여 업로드
                const webpFile = new File(
                  [blob],
                  `${image.name.split(".")[0]}.webp`,
                  {
                    type: "image/webp",
                  },
                );
                resolve(webpFile);
              } else {
                reject(new Error("Failed to convert to WebP"));
              }
            }, "image/webp");
          };
          img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      // 이미지가 이미 preview만 있다면 그대로 반환
      return image.preview;
    }
  });

  // 변환된 이미지들 대기
  const convertedResults = await Promise.all(convertedImages);

  // 업로드 프로미스 생성
  const uploadPromises = convertedResults.map((image) => {
    const apiUrl =
      pathname === "/events"
        ? `/api/v1/image/upload/event`
        : `/api/v1/image/upload/profile`;

    // WebP로 변환된 Blob 또는 File을 업로드
    return client.post(
      apiUrl,
      { file: image },
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  });

  const results = await Promise.all(uploadPromises);
  const urls = results.map((res) => res.data);

  // 이벤트 업로드 또는 수정 요청
  if (isEdit) {
    return client.put(`/api/v1/portfolio`, { ...postData, url: urls });
  } else if (pathname === "/events") {
    return client.post(`/api/v1/portfolio/event`, { ...postData, url: urls });
  } else if (pathname === "/profile") {
    return client.post(`/api/v1/portfolio/profile`, { ...postData, url: urls });
  }
};

export const deleteEvent = async (id: number) => {
  return await client.delete("/api/v1/portfolio", {
    data: {
      portfolioId: id, // DELETE 요청 body 에 넣을 데이터
    },
  });
};
