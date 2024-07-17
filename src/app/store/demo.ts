import { create } from 'zustand';
import _ from 'lodash';
import { nodes } from '../example/data';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
  nodes: [
    {
      id: 1,
      name: 'Node 1',
      inputs: {
        x: { id: 1, name: 'Input 1', value: 0 },
        y: { id: 2, name: 'Input 2', value: 0 },
      },
      outputs: {
        z: { id: 3, name: 'Output 1', value: 0 },
      },
    },
    {
      id: 2,
      name: 'Node 2',
      inputs: {
        x: { id: 4, name: 'Input 3', value: 0 },
        y: { id: 5, name: 'Input 4', value: 0 },
      },
      outputs: {
        z: { id: 6, name: 'Output 2', value: 0 },
      },
    },
  ],
  updateSocketValue: (
    nodeId: number,
    type: string,
    socketName: string,
    value: number,
  ) => {
    console.log('updateSocketValue', nodeId, type, socketName, value);
    set((state) => {
      const node = state.nodes.find((n) => n.id === nodeId);
      if (!node) return state;
      const socket = node[type][socketName];
      if (!socket) return state;
      socket.value = value;
    });
  },
});

export const useDemoStore = create(immer(devtools(store)));
