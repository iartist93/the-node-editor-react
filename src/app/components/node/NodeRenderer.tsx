import "@/app/components/socket/styles.css";
import { NodeRendererProps, nodeTypes } from "@/app/components/node/utils";
import { ExampleNode1 } from "@/app/components/node/ExampleNode1";
import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { drag } from "d3-drag";
import { useStore } from "@/app/store";

type Position = {
  x: number;
  y: number;
};

export function NodeRenderer({ node }: NodeRendererProps) {
  const NodeComponent = nodeTypes[node.type];
  const nodeRef = useRef<HTMLDivElement>(null);

  const previousPosition = useRef<Position>({ x: 0, y: 0 });

  const updateNodePosition = useStore((store) => store.updateNodePosition);

  const getEventPosition = (event: any): Position => {
    const x = event.x;
    const y = event.y;
    return { x, y };
  };

  const dragInstance = drag()
    .on("start", (event) => {
      previousPosition.current = getEventPosition(event);
    })
    .on("drag", (event) => {
      const position = getEventPosition(event);

      const diff = {
        x: position.x - previousPosition.current.x,
        y: position.y - previousPosition.current.y,
      };

      const newPosition = {
        x: node.position.x + diff.x,
        y: node.position.y + diff.y,
      };

      updateNodePosition(node.id, newPosition);
    })
    .on("end", (event) => {});

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
