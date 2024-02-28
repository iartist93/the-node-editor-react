/*
type NodeProps = {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    unit: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    borderRadius: number;
    draggable: boolean;
    socketRadius: number;
    socketSpacing: number;
    headerHeight: number;
    inputSocketIds: string[];
    outputSocketIds: string[];
    inputs: number;
    outputs: number;
};
*/

import { NodeData } from "@/app/components/node/utils";

export const nodes: NodeData[] = [
  {
    id: "1",
    type: "custom1",
    data: {
      name: "Color",
      color: "#13ab17",
    },
    position: {
      x: 100,
      y: 100,
    },
  },
  {
    id: "2",
    type: "shader",
    data: {
      name: "PinncipleShader 1",
      value: 10,
    },
    position: {
      x: 600,
      y: 100,
    },
  },
];
