import { HiOutlineDownload } from "react-icons/hi";
import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useRefs } from "../../hooks/useRefs";

const DownloadButton = () => {
  const { canvasRef, bgRef } = useRefs();

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE.width;
    canvas.height = CANVAS_SIZE.height;

    const tempCtx = canvas.getContext("2d");
    if (tempCtx && canvasRef.current && bgRef.current) {
      tempCtx.drawImage(bgRef.current, 0, 0);
      tempCtx.drawImage(canvasRef.current, 0, 0);
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "sketchroom.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="btn-icon text-2xl"
        onClick={handleDownload}
        title="Download drawing"
      >
        <HiOutlineDownload />
      </button>
      <span className="text-xs text-white font-medium">Download</span>
    </div>
  );
};

export default DownloadButton;
