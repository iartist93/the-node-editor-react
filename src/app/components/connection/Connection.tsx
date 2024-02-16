import { useEffect, useState } from "react";
import { useStore } from "@/app/store";
import { useMouse } from "@uidotdev/usehooks";

type ConnectionProps = {
  sourceNodeId: string;
  sourceSocketId: string;
  targetNodeId: string;
  targetSocketId: string;
};

const getPath = (
  source: {
    x: number;
    y: number;
  },
  target: {
    x: number;
    y: number;
  },
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

const getSocketPosition = (nodeId: string, socketId: string) => {
  const el = document.getElementById(`${socketId}`);
  const bbox = el?.getBoundingClientRect();
  if (bbox) {
    return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
  }
  return undefined;
};

export function Connection({
  sourceNodeId,
  sourceSocketId,
  targetNodeId,
  targetSocketId,
}: ConnectionProps) {
  const findNode = useStore((store) => store.findNode);

  const [mouse] = useMouse();
  const [sourcePos, setSourcePos] = useState({ x: mouse.x, y: mouse.y });
  const [targetPos, setTargetPos] = useState({ x: mouse.x, y: mouse.y });
  const [path, setPath] = useState("");

  const sourceNode = useStore((store) => findNode(sourceNodeId));
  const targetNode = useStore((store) => findNode(targetNodeId));

  const updatePositions = () => {
    let sourcePosition = getSocketPosition(sourceNodeId, sourceSocketId);
    let targetPosition = getSocketPosition(targetNodeId, targetSocketId);

    if (!targetPosition) {
      if (mouse.x === 0 && mouse.y === 0 && sourcePosition) {
        targetPosition = { x: sourcePosition.x, y: sourcePosition.y };
      } else {
        targetPosition = { x: mouse.x, y: mouse.y };
      }
    }

    if (sourcePosition && targetPosition) {
      setSourcePos(sourcePosition);
      setTargetPos(targetPosition);
    }
  };

  useEffect(() => {
    updatePositions();
  }, [
    sourceNodeId,
    sourceSocketId,
    targetNodeId,
    targetSocketId,
    sourceNode,
    targetNode,
    mouse,
  ]);

  useEffect(() => {
    const p = getPath(sourcePos, targetPos);
    setPath(p);
  }, [sourcePos, targetPos]);

  return (
    <svg width="100%" height="100%" className=" border-2 border-black absolute">
      <path
        d={path}
        stroke="black"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
