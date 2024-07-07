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

import { NodeData } from '@/app/components/node/utils';

export const nodes: NodeData[] = [
  {
    id: '1',
    type: 'custom1',
    data: {
      name: 'Color',
      color: '#13ab17',
    },
    position: {
      x: 100,
      y: 100,
    },
  },
  {
    id: '3',
    type: 'custom1',
    data: {
      name: 'Color',
      color: '#520ccb',
    },
    position: {
      x: 300,
      y: 600,
    },
  },
  {
    id: '2',
    type: 'shader',
    data: {
      name: 'PinncipleShader 1',
      value: 20,
    },
    position: {
      x: 600,
      y: 100,
    },
  },
  {
    id: '4',
    type: 'add',
    data: {
      inputs: {
        x: {
          name: 'x',
          value: 1,
        },
        y: {
          name: 'y',
          value: 2,
        },
      },
      outputs: {
        result: {
          name: 'result',
          value: 3,
        },
      },
    },
    position: {
      x: 500,
      y: 800,
    },
  },
  {
    id: '5',
    type: 'add',
    data: {
      inputs: {
        x: {
          name: 'x',
          value: 1,
        },
        y: {
          name: 'y',
          value: 2,
        },
      },
      outputs: {
        result: {
          name: 'result',
          value: 3,
        },
      },
    },
    position: {
      x: 700,
      y: 400,
    },
  },
];
