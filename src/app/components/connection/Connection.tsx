import { useEffect, useState } from "react";
import { useStore } from "@/app/store";

type ConnectionProps = {
  sourceId: string;
  targetId: string;
};

const getPath = (
  source: { x: number; y: number },
  target: { x: number; y: number },
) => {
  const distance = { x: target.x - source.x, y: target.y - source.y };
  const offsetY = 5;
  const offsetX = 3;
  const control1 = {
    x: source.x + distance.x / offsetX,
    y: source.y + offsetY,
  };
  const control2 = {
    x: target.x - distance.x / offsetX,
    y: target.y - offsetY,
  };
  return `M${source.x} ${source.y} C${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${target.x} ${target.y}`;
};

export function Connection() {
  const [sourcePos, setSourcePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState("");

  const sockets = useStore((store) => store.sockets);

  useEffect(() => {
    console.log("sockets", sockets);

    const sourcePosition = sockets.find((socket) => socket.id === "1-1")
      ?.position;

    const targetPosition = sockets.find((socket) => socket.id === "2-2")
      ?.position;

    console.log("sourcePosition", sourcePosition);
    console.log("targetPosition", targetPosition);

    if (sourcePosition && targetPosition) {
      setSourcePos(sourcePosition);
      setTargetPos(targetPosition);
    }
  }, [sockets]);

  useEffect(() => {
    const p = getPath(sourcePos, targetPos);
    setPath(p);

    console.log("path", p);
  }, [sourcePos, targetPos]);

  return (
    <div className="w-screen h-screen">
      <svg width="100%" height="100%" className=" border-2 border-black">
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
