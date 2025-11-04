import { Box } from "@mui/material";
import ManageItem from "../common/uploadManage/ManageList/ManageItem.tsx";
import { useUploadPartner } from "../../hooks/useUploadPartner.tsx";
import PartnerUploadComponent from "./PartnerUploadComponent.tsx";

interface Item {
  partnerId: number;
  url: string;
  name: string;
  address: string;
}

function PartnerList() {
  const { items, deleteMutation } = useUploadPartner();

  return (
    <Box>
      {items.length > 0 &&
        items.map((item: Item) => (
          <ManageItem
            item={item}
            handleDelete={deleteMutation}
            key={item.partnerId}
            index={item.partnerId}
          >
            <PartnerUploadComponent item={item} isEdit={true} />
          </ManageItem>
        ))}
    </Box>
  );
}

export default PartnerList;
