import { useEffect, useState } from "react";

type ConnectionProps = {
  sourceId: string;
  targetId: string;
};

const getPath = (
  source: { x: number; y: number },
  target: { x: number; y: number },
) => {
  const distance = { x: target.x - source.x, y: target.y - source.y };
  const height = 20;
  const control1 = { x: source.x + distance.x / 3, y: source.y - height };
  const control2 = { x: source.x + (distance.x / 3) * 2, y: source.y + height };
  return `M${source.x} ${source.y} C${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${target.x} ${target.y}`;
};

export function Connection() {
  const [sourcePos, setSourcePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState("");

  useEffect(() => {
    const sourceEl = document.getElementById("1-1");
    const targetEl = document.getElementById("2-2");

    if (sourceEl && targetEl) {
      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      setSourcePos({
        x: sourceRect.x + sourceRect.width / 2,
        y: sourceRect.y + sourceRect.height / 2,
      });
      setTargetPos({
        x: targetRect.x + targetRect.width / 2,
        y: targetRect.y + targetRect.height / 2,
      });

      console.log("sourceRect", sourceRect);
      console.log("targetRect", targetRect);
    }
  }, []);

  useEffect(() => {
    const p = getPath(sourcePos, targetPos);
    setPath(p);
  }, [sourcePos, targetPos]);

  return (
    <div className="w-screen h-screen">
      <svg
        width="100%"
        height="100%"
        className="bg-indigo-600 border-2 border-black"
      >
        <path
          d={path}
          stroke="black"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
