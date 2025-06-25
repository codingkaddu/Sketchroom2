import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RgbaColorPicker } from "react-colorful";
import { MdColorLens } from "react-icons/md"; // ✅ New icon
import { useClickAway } from "react-use";

import { useOptions } from "@/common/recoil/options/options.hooks";
import { EntryAnimation } from "../../animations/Entry.animations";

const ColorPicker = () => {
  const [options, setOptions] = useOptions();
  const ref = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex flex-col items-center gap-1" ref={ref}>
      <button
        className="btn-icon text-2xl"
        onClick={() => setOpened(!opened)}
        disabled={options.mode === "select"}
        title="Pick Colors"
      >
        <MdColorLens />
      </button>
      <span className="text-xs text-white font-medium">Color</span> {/* ✅ Label added */}

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute z-50 left-12 mt-10"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <div className="rounded-lg bg-zinc-800 p-4 shadow-lg">
              <h2 className="mb-2 text-sm font-semibold text-white">Line Color</h2>
              <RgbaColorPicker
                color={options.lineColor}
                onChange={(e) => setOptions({ ...options, lineColor: e })}
                className="mb-5"
              />
              <h2 className="mb-2 text-sm font-semibold text-white">Fill Color</h2>
              <RgbaColorPicker
                color={options.fillColor}
                onChange={(e) => setOptions({ ...options, fillColor: e })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
