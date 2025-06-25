import { useEffect } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { optimizeImage } from "@/common/lib/optimizeImage";
import { useMoveImage } from "../../hooks/useMoveImage";

const ImagePicker = () => {
  const { setMoveImage } = useMoveImage();

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.includes("image")) {
            const file = item.getAsFile();
            if (file)
              optimizeImage(file, (uri) => setMoveImage({ base64: uri }));
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [setMoveImage]);

  const handleImageInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", () => {
      if (fileInput.files?.[0]) {
        optimizeImage(fileInput.files[0], (uri) => setMoveImage({ base64: uri }));
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="btn-icon text-xl"
        onClick={handleImageInput}
        title="Insert image"
      >
        <BsFillImageFill />
      </button>
      <span className="text-xs text-white font-medium">Insert image</span>
    </div>
  );
};

export default ImagePicker;
