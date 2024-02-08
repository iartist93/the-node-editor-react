export type NodeData = {
  id: number;
  type: string;
  data: { [key: string]: any };
  position: {
    x: number;
    y: number;
  };
};

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

export const nodes: NodeData[] = [
  {
    id: 1,
    type: "custom1",
    data: {
      name: "NodeRenderer 1",
      color: "#13ab17",
    },
    position: {
      x: 100,
      y: 100,
    },
  },
  {
    id: 2,
    type: "custom1",
    data: {
      name: "NodeRenderer 2",
      value: 10,
    },
    position: {
      x: 500,
      y: 500,
    },
  },
];
