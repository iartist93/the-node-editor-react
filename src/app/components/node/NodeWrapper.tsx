import { NodeRenderer } from "@/app/components/node/NodeRenderer";
import { NodeData } from "@/app/example/data";

type NodeWrapperProps = {
  nodes: NodeData[];
};

export function NodeWrapper({ nodes }: NodeWrapperProps) {
  return (
    <div>
      {nodes.map((node, index) => {
        return <NodeRenderer key={index} node={node} />;
      })}
    </div>
  );
}
