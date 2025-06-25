import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSetBackground } from "@/common/recoil/background";
import { useModal } from "@/common/recoil/modal";

const BACKGROUND_IMAGES = [
  { name: "pastels", src: "/backgrounds/pastels.jpg" },
  { name: "mountains", src: "/backgrounds/mountains.jpg" },
  { name: "patterns", src: "/backgrounds/patterns.jpg" },
];

const BackgroundModal = () => {
  const { closeModal } = useModal();
  const setBackground = useSetBackground();

  // refs for canvases
  const canvases = {
    darkLines: useRef<HTMLCanvasElement>(null),
    lightLines: useRef<HTMLCanvasElement>(null),
    darkPlain: useRef<HTMLCanvasElement>(null),
    lightPlain: useRef<HTMLCanvasElement>(null),
  };

  const drawGrid = (
    canvas: HTMLCanvasElement | null,
    dark: boolean,
    withLines: boolean
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dark ? "#222" : "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (withLines) {
      ctx.strokeStyle = dark ? "#444" : "#ddd";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.width; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    drawGrid(canvases.darkLines.current, true, true);
    drawGrid(canvases.lightLines.current, false, true);
    drawGrid(canvases.darkPlain.current, true, false);
    drawGrid(canvases.lightPlain.current, false, false);
  }, []);

  // Function to select grid background
  const handleGridSelect = (mode: "dark" | "light", withLines: boolean) => {
    setBackground({ mode, withLines });
    closeModal();
  };

  // Function to select image background
  const handleImageSelect = (src: string) => {
    setBackground({ mode: "image", src });
    closeModal();
  };

  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-8 max-w-xl mx-auto">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
        aria-label="Close background picker"
      >
        <AiOutlineClose />
      </button>
      <h2 className="mb-6 text-2xl font-semibold">Choose Background</h2>

      {/* Canvas Grid Backgrounds */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2 border-gray-300"
          width={256}
          height={192}
          tabIndex={0}
          onClick={() => handleGridSelect("dark", true)}
          ref={canvases.darkLines}
          title="Dark background with grid lines"
        />
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2 border-gray-300"
          width={256}
          height={192}
          tabIndex={0}
          onClick={() => handleGridSelect("light", true)}
          ref={canvases.lightLines}
          title="Light background with grid lines"
        />
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2 border-gray-300"
          width={256}
          height={192}
          tabIndex={0}
          onClick={() => handleGridSelect("dark", false)}
          ref={canvases.darkPlain}
          title="Dark background without grid lines"
        />
        <canvas
          className="h-48 w-64 cursor-pointer rounded-md border-2 border-gray-300"
          width={256}
          height={192}
          tabIndex={0}
          onClick={() => handleGridSelect("light", false)}
          ref={canvases.lightPlain}
          title="Light background without grid lines"
        />
      </div>

      {/* Image Backgrounds */}
      <div className="w-full">
        <h3 className="mb-4 text-xl font-semibold text-center">Or select an image</h3>
        <div className="flex justify-center gap-6">
          {BACKGROUND_IMAGES.map(({ name, src }) => (
            <button
              key={name}
              onClick={() => handleImageSelect(src)}
              className="rounded-md overflow-hidden border-2 border-gray-300 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={`Select background image: ${name}`}
            >
              <img
                src={src}
                alt={name}
                className="h-32 w-48 object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundModal;
