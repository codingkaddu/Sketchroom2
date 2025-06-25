import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSettings } from "react-icons/fi";

import { DEFAULT_EASE } from "@/common/constants/easings";
import { useViewportSize } from "@/common/hooks/useViewportSize";
import { useRefs } from "../../hooks/useRefs";
import { useCtx } from "../../hooks/useCtx";   // Import this

import BackgroundPicker from "./BackgoundPicker";
import ColorPicker from "./ColorPicker";
import HistoryBtns from "./HistoryBtns";
import ImagePicker from "./ImagePicker";
import LineWidthPicker from "./LineWidthPicker";
// import ModePicker from "./ModePicker"; // removed as before
import ShapeSelector from "./ShapeSelector";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";
import ExitRoomButton from "./ExitRoomButton";
import TextInsertionButton from "./TextInsertionButton";
import ClearCanvasButton from "./ClearCanvasButton";

const ToolBar = () => {
  const { width } = useViewportSize();
  const { canvasRef, elementsRef } = useRefs();
  const ctx = useCtx();  // Get canvas 2D context

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(width >= 1024);
  }, [width]);

  return (
    <motion.div
      className="fixed top-4 left-4 z-50 rounded-xl bg-zinc-800 p-4 shadow-lg text-white"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: DEFAULT_EASE }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sketch Tools</h3>
        <button
          onClick={() => setOpened((prev) => !prev)}
          className="ml-4 text-xl hover:text-indigo-400"
          aria-label="Toggle ToolBar"
        >
          <FiSettings />
        </button>
      </div>

      {opened && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <ShapeSelector />
          <ColorPicker />
          <LineWidthPicker />

          <TextInsertionButton
            canvasRef={canvasRef}
            ctx={ctx}   // pass ctx as prop instead of ctxRef
            elementsRef={elementsRef}
          />
          <ImagePicker />
          <BackgroundPicker />

          {/* ModePicker removed */}

          <HistoryBtns />
          <ClearCanvasButton
            canvasRef={canvasRef}
            ctx={ctx}   // pass ctx as prop instead of ctxRef
            elementsRef={elementsRef}
          />

          <ShareButton />
          <DownloadButton />
          <ExitRoomButton />
        </div>
      )}
    </motion.div>
  );
};

export default ToolBar;
