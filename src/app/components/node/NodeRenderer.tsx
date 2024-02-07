import "./styles.css";
import { NodeRendererProps, nodeTypes } from "@/app/components/node/utils";

export function NodeRenderer({ node }: NodeRendererProps) {
  const NodeComponent = nodeTypes[node.type];

  return (
    <div
      className="bg-white border-2 border-black rounded-2xl select-none w-64 h-72 flex flex-col"
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className="border-b-2 border-black p-4 font-medium ">
        <h1>{node.data.name}</h1>
      </div>
      <div className="flex-1">
        <NodeComponent node={node} />
      </div>
    </div>
  );
}
