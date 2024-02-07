import { NodeData } from "@/app/example/data";
import { ColorNode } from "@/app/components/node/ColorNode";
import { NumberNode } from "@/app/components/node/NumberNode";

export type NodeComponentProps = {
  node: NodeData;
};

export type NodeRendererProps = {
  node: NodeData;
};

type NodeTypes = {
  [key: string]: React.FC<{ node: NodeData }>;
};

export const nodeTypes: NodeTypes = {
  color: ColorNode,
  number: NumberNode,
};
