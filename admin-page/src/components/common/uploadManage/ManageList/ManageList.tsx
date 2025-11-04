import { Box } from "@mui/material";
import ManageItem from "./ManageItem.tsx";
import { useUpload } from "../../../../hooks/useUpload.tsx";
import ManageUploadComponent from "../ManageUploader/ManageUploadComponent.tsx";

interface Item {
  portfolioId: number;
  description: string;
  url: string[];
  title: string;
  date: string;
}

function ManageList() {
  const { items, deleteMutation } = useUpload();

  return (
    <Box>
      {items.length > 0 &&
        items.map((item: Item) => (
          <ManageItem
            item={item}
            handleDelete={deleteMutation}
            key={item.portfolioId}
            index={item.portfolioId}
          >
            <ManageUploadComponent item={item} isEdit={true} />
          </ManageItem>
        ))}
    </Box>
  );
}

export default ManageList;
