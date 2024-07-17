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
    inputs: {
      color: {
        name: 'Color',
        value: '#13ab17',
      },
    },
    outputs: {
      result: {
        name: 'result',
        value: '#13ab17',
      },
    },
    data: {},
    position: {
      x: 100,
      y: 100,
    },
  },
  {
    id: '1',
    type: 'custom1',
    inputs: {
      color: {
        name: 'Color',
        value: '#520ccb',
      },
    },
    outputs: {
      result: {
        name: 'result',
        value: '#520ccb',
      },
    },
    data: {},
    position: {
      x: 300,
      y: 600,
    },
  },
  {
    id: '2',
    type: 'shader',
    inputs: {},
    outputs: {},
    data: {},
    position: {
      x: 600,
      y: 100,
    },
  },
  {
    id: '4',
    type: 'add',
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
    position: {
      x: 500,
      y: 800,
    },
    data: {},
  },
  {
    id: '5',
    type: 'add',
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
    data: {},
    position: {
      x: 700,
      y: 400,
    },
  },
];
