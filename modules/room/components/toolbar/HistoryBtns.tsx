import { FaRedo, FaUndo } from "react-icons/fa";

import { useMyMoves } from "@/common/recoil/room";
import { useSavedMoves } from "@/common/recoil/savedMoves";

import { useRefs } from "../../hooks/useRefs";

const HistoryBtns = () => {
  const { redoRef, undoRef } = useRefs();

  const { myMoves } = useMyMoves();
  const savedMoves = useSavedMoves();

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <div className="flex gap-3">
        {/* Undo */}
        <button
          className="btn-icon text-xl"
          ref={undoRef}
          disabled={!myMoves.length}
          title="Undo"
        >
          <FaUndo />
        </button>

        {/* Redo */}
        <button
          className="btn-icon text-xl"
          ref={redoRef}
          disabled={!savedMoves.length}
          title="Redo"
        >
          <FaRedo />
        </button>
      </div>
      <span className="text-xs text-white font-medium whitespace-nowrap">
        Undo / Redo
      </span>
    </div>
  );
};

export default HistoryBtns;
