import { useRouter } from "next/router";
import { ImExit } from "react-icons/im";

const ExitRoomButton = () => {
  const router = useRouter();

  const handleExit = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="btn-icon text-2xl"
        onClick={handleExit}
        title="Exit Room"
      >
        <ImExit />
      </button>
      <span className="text-xs text-white font-medium">Exit</span>
    </div>
  );
};

export default ExitRoomButton;
