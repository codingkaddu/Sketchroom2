import { CgScreen } from "react-icons/cg";
import { useModal } from "@/common/recoil/modal";
import BackgroundModal from "../../modals/BackgroundModal";

const BackgroundPicker = () => {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="btn-icon text-2xl"
        onClick={() => {
          console.log("BackgroundPicker clicked");
          openModal(<BackgroundModal />);
        }}
        title="Change Background"
      >
        <CgScreen />
      </button>
      <span className="text-xs text-white font-medium">Background</span> {/* ✅ Label added */}
    </div>
  );
};

export default BackgroundPicker;
