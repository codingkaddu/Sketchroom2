import { IoShareSocialOutline } from "react-icons/io5";
import { useModal } from "@/common/recoil/modal";
import ShareModal from "../../modals/ShareModal";

const ShareButton = () => {
  const { openModal } = useModal();

  const handleShare = () => {
    openModal(<ShareModal />);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="btn-icon text-2xl"
        onClick={handleShare}
        title="Share room link"
      >
        <IoShareSocialOutline />
      </button>
      <span className="text-xs text-white font-medium">Share</span>
    </div>
  );
};

export default ShareButton;
