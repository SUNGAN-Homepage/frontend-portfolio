import AddManageComponent from "../common/uploadManage/ManageUploader/AddManageComponent.tsx";
import SideMenu from "../common/SideMenu.tsx";
import Loading from "../common/Loading/Loading.tsx";
import { useUpload } from "../../hooks/useUpload.tsx";
import PartnerUploadComponent from "./PartnerUploadComponent.tsx";
import PartnerList from "./PartnerList.tsx";

function Partner() {
  const { isLoading, isUploading } = useUpload();
  return (
    <SideMenu>
      <AddManageComponent>
        <PartnerUploadComponent />
      </AddManageComponent>
      <PartnerList />
      {(isLoading || isUploading) && <Loading />}
    </SideMenu>
  );
}

export default Partner;
