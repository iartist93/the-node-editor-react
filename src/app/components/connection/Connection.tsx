import { useEffect, useState } from "react";
import { useStore } from "@/app/store";
import { useMouse } from "@uidotdev/usehooks";
import {
  getPath,
  getSocketPosition,
  getTransformedPosition,
} from "@/app/components/connection/utils";
import { ConnectionData } from "@/app/components/node/utils";

export function Connection({
  id,
  outputNodeId,
  outputSocketId,
  inputNodeId,
  inputSocketId,
}: ConnectionData) {
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

  const editorScale = useStore((store) => store.editorScale);
  const findNode = useStore((store) => store.findNode);

  const inputNode = findNode(inputNodeId);
  const outputNode = findNode(outputNodeId);

  const updatePositions = () => {
    let sourcePosition = outputSocketId
      ? getSocketPosition(outputSocketId, editorScale)
      : null;
    let targetPosition = inputSocketId
      ? getSocketPosition(inputSocketId, editorScale)
      : null;

    const transformedPosition = getTransformedPosition(
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
    mouse,
    inputNode,
    outputNode,
  ]);

  useEffect(() => {
    const p = getPath(outputPosition, inputPosition);
    setPath(p);
  }, [outputPosition, inputPosition]);

  return (
    <path
      d={path}
      stroke="#489"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  );
}
