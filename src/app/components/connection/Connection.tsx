import { useEffect, useState } from "react";
import { useStore } from "@/app/store";
import { useMouse } from "@uidotdev/usehooks";
import {
  getPath,
  getSocketPosition,
  getTransfromedPosition,
} from "@/app/components/connection/utils";
import { ConnectionData } from "@/app/components/node/utils";

export function Connection({
  outputNodeId,
  outputSocketId,
  inputNodeId,
  inputSocketId,
}: ConnectionData) {
  const findNode = useStore((store) => store.findNode);

  const [mouse] = useMouse();
  const [outputPosition, setOutputPosition] = useState({
    x: mouse.x,
    y: mouse.y,
  });
  const [inputPosition, setInputPosition] = useState({
    x: mouse.x,
    y: mouse.y,
  });
  const [path, setPath] = useState("");

  const outputNode = useStore((store) => findNode(outputNodeId));
  const inputNode = useStore((store) => findNode(inputNodeId));
  const editorScale = useStore((store) => store.editorScale);

  const updatePositions = () => {
    let sourcePosition = outputSocketId
      ? getSocketPosition(outputNodeId, outputSocketId, editorScale)
      : null;
    let targetPosition = inputSocketId
      ? getSocketPosition(inputNodeId, inputSocketId, editorScale)
      : null;

    const transformedPosition = getTransfromedPosition(
      { x: mouse.x, y: mouse.y },
      editorScale,
    );

    if (!targetPosition) {
      if (
        transformedPosition.x === 0 &&
        transformedPosition.y === 0 &&
        sourcePosition
      ) {
        targetPosition = { x: sourcePosition.x, y: sourcePosition.y };
      } else {
        targetPosition = { x: transformedPosition.x, y: transformedPosition.y };
      }
    } else if (!sourcePosition) {
      if (
        transformedPosition.x === 0 &&
        transformedPosition.y === 0 &&
        targetPosition
      ) {
        sourcePosition = { x: targetPosition.x, y: targetPosition.y };
      } else {
        sourcePosition = { x: transformedPosition.x, y: transformedPosition.y };
      }
    }

    if (sourcePosition && targetPosition) {
      setOutputPosition(sourcePosition);
      setInputPosition(targetPosition);
    }
  };

  useEffect(() => {
    updatePositions();
  }, [
    outputNodeId,
    outputSocketId,
    inputNodeId,
    inputSocketId,
    outputNode,
    inputNode,
    mouse,
  ]);

  useEffect(() => {
    const p = getPath(outputPosition, inputPosition);
    setPath(p);
  }, [outputPosition, inputPosition]);

  return (
    <svg width="100%" height="100%" className="absolute">
      <path
        d={path}
        stroke="#489"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
