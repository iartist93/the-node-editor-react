import { useEffect, useState } from "react";
import { useStore } from "@/app/store";
import { NodeData } from "@/app/example/data";

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
  const el = document.getElementById(`${nodeId}-${socketId}`);
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
  const sockets = useStore((store) => store.sockets);

  const [sourcePos, setSourcePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [path, setPath] = useState("");

  const sourceNode = useStore((store) => findNode(sourceNodeId));
  const targetNode = useStore((store) => findNode(targetNodeId));

  const updatePositions = () => {
    const sourcePosition = getSocketPosition(sourceNodeId, sourceSocketId);
    const targetPosition = getSocketPosition(targetNodeId, targetSocketId);

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
  ]);

  useEffect(() => {
    const p = getPath(sourcePos, targetPos);
    setPath(p);
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
