import { useEffect } from "react";
import { BsPencilFill } from "react-icons/bs";
import { FaEraser } from "react-icons/fa";

import { useOptions, useSetSelection } from "@/common/recoil/options";

const ModePicker = () => {
  const [options, setOptions] = useOptions();
  const { clearSelection } = useSetSelection();

  useEffect(() => {
    clearSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.mode]);

  const modes = [
    {
      mode: "draw",
      icon: <BsPencilFill />,
      label: "Draw",
    },
    {
      mode: "eraser",
      icon: <FaEraser />,
      label: "Erase",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {modes.map(({ mode, icon, label }) => (
        <div key={mode} className="flex flex-col items-center">
          <button
            className={`btn-icon text-xl transition-all duration-150 ${
              options.mode === mode
                ? "bg-green-500 text-white shadow-md"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
            onClick={() =>
              setOptions((prev) => ({
                ...prev,
                mode: mode as typeof options.mode,
              }))
            }
            title={label}
          >
            {icon}
          </button>
          <span className="text-xs text-white">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default ModePicker;
