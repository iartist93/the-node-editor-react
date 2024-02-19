import "@/app/components/socket/styles.css";
import {
  NodeRendererProps,
  nodeTypes,
  type Position,
} from "@/app/components/node/utils";
import { ExampleNode1 } from "@/app/components/node/ExampleNode1";
import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { drag } from "d3-drag";
import { useStore } from "@/app/store";

export function NodeRenderer({ node }: NodeRendererProps) {
  const NodeComponent = nodeTypes[node.type];
  const nodeRef = useRef<HTMLDivElement>(null);
  const previousPosition = useRef<Position>({ x: 0, y: 0 });
  const updateNodePosition = useStore((store) => store.updateNodePosition);
  const editorScale = useStore((store) => store.editorScale);

  const [tempPos, setTempPost] = useState({
    x: node.position.x,
    y: node.position.y,
  });

  const getEventPosition = (event: MouseEvent): Position => {
    const x = event.x;
    const y = event.y;
    return { x, y };
  };

  const calculateNewPosition = (position: Position) => {
    const prevPosition = previousPosition.current;

    const diff = {
      x: position.x - prevPosition.x,
      y: position.y - prevPosition.y,
    };

    console.log("editorScale ", editorScale);

    return {
      x: node.position.x + diff.x / editorScale,
      y: node.position.y + diff.y / editorScale,
    };
  };

  // NOTE: if we print prevPossition using useState inside useEffect it will work, but inside the event handler won't
  const dragInstance = drag()
    .on("start", (event) => {
      previousPosition.current = getEventPosition(event);
    })
    .on("drag", (event) => {
      const position = getEventPosition(event);
      const newPosition = calculateNewPosition(position);
      updateNodePosition(node.id, newPosition, true);
    })
    .on("end", (event) => {
      const position = getEventPosition(event);
      const newPosition = calculateNewPosition(position);
      updateNodePosition(node.id, newPosition, false);
    });

  useEffect(() => {
    const nodeSelection = select(nodeRef.current);
    nodeSelection.call(dragInstance);
  }, [dragInstance]);

  return (
    <div
      ref={nodeRef}
      className="opacity-90 bg-white border-2 border-black rounded-2xl select-none w-64 flex flex-col"
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className="border-b-2 border-black p-4 font-medium h-12 ">
        <h1>{node.data.name}</h1>
      </div>
      <div className="flex flex-col flex-1 ">
        {/*<NodeComponent node={node} />*/}
        <ExampleNode1 node={node} />
      </div>
    </div>
  );
}
