import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsBorderWidth } from "react-icons/bs";
import { useClickAway } from "react-use";

import { useOptions } from "@/common/recoil/options";
import { EntryAnimation } from "../../animations/Entry.animations";

const LineWidthPicker = () => {
  const [options, setOptions] = useOptions();
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="relative flex flex-col items-center gap-1" ref={ref}>
      <button
        className="btn-icon text-xl"
        onClick={() => setOpened(!opened)}
        disabled={options.mode === "select"}
        title="Set line thickness"
      >
        <BsBorderWidth />
      </button>
      <span className="text-xs text-white font-medium">Line Width</span>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute left-14 top-0 w-36 rounded-md bg-white p-2 shadow-md dark:bg-zinc-800"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
              Width: {options.lineWidth}
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={options.lineWidth}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  lineWidth: parseInt(e.target.value, 10),
                }))
              }
              className="w-full cursor-pointer appearance-none rounded-lg bg-gray-300 dark:bg-zinc-600 h-2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LineWidthPicker;
