import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiRectangle } from "react-icons/bi";
import { BsCircle, BsDash } from "react-icons/bs"; // BsDash is line icon
import { useClickAway } from "react-use";

import { useOptions } from "@/common/recoil/options";

import { EntryAnimation } from "../../animations/Entry.animations";

type Shape = "line" | "rect" | "circle";

const shapeDetails: Record<Shape, { icon: JSX.Element; label: string }> = {
  line: { icon: <BsDash />, label: "Line" },
  rect: { icon: <BiRectangle />, label: "Rectangle" },
  circle: { icon: <BsCircle />, label: "Circle" },
};

const ShapeSelector = () => {
  const [options, setOptions] = useOptions();
  const ref = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  const handleShapeChange = (shape: Shape) => {
    setOptions((prev) => ({
      ...prev,
      shape,
    }));
    setOpened(false);
  };

  return (
    <div className="relative flex flex-col items-center" ref={ref}>
      {/* Main button styled like your BackgroundPicker */}
      <button
        className="flex flex-col items-center gap-1 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={options.mode === "select"}
        onClick={() => setOpened((prev) => !prev)}
        title="Shape"
      >
        <div className="text-4xl text-green-400">
          {shapeDetails[options.shape as Shape].icon}
        </div>
        <span className="text-xs font-medium select-none">
          {shapeDetails[options.shape as Shape].label}
        </span>
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute left-16 top-14 z-10 flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-lg"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            {(Object.keys(shapeDetails) as Shape[]).map((shapeKey) => (
              <button
                key={shapeKey}
                className={`flex flex-col items-center gap-1 rounded-md p-2 ${
                  options.shape === shapeKey
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-zinc-800 hover:bg-zinc-700 text-gray-300"
                }`}
                onClick={() => handleShapeChange(shapeKey)}
                style={{ width: "56px", height: "56px", cursor: "pointer" }}
              >
                <div className="text-3xl select-none">
                  {shapeDetails[shapeKey].icon}
                </div>
                <span className="text-xs select-none">{shapeDetails[shapeKey].label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapeSelector;
