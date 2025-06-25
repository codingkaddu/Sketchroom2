import { MdClear } from "react-icons/md";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | undefined;
  elementsRef: React.MutableRefObject<any[]>;
}

const ClearCanvasButton: React.FC<Props> = ({
  canvasRef,
  ctx,
  elementsRef,
}) => {
  const handleClear = () => {
    if (!canvasRef.current || !ctx) return;

    const canvas = canvasRef.current;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elementsRef.current = [];
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className="btn-icon text-2xl"
        onClick={handleClear}
        title="Clear Canvas"
      >
        <MdClear />
      </button>
      <span className="text-xs font-medium">Clear</span>
    </div>
  );
};

export default ClearCanvasButton;
