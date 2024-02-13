import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

interface EditorStore {
  nodes: any[];
  connections: any[];
  sockets: any[];

  setNodes: (nodes: any[]) => void;
  setConnections: (connections: any[]) => void;
  setSockets: (sockets: any[]) => void;

  addNode: (node: any) => void;
  addConnection: (connection: any) => void;
  addSocket: (socket: any) => void;
}

const store = (set) => ({
  nodes: [],
  connections: [],
  sockets: [],

  setNodes: (nodes) => set({ nodes }, false, "setNodes"),
  setConnections: (connections) =>
    set({ connections }, false, "setConnections"),
  setSockets: (sockets) => set({ sockets }, false, "setSockets"),

  addNode: (node) =>
    set(
      (state) => {
        state.nodes.push(node);
      },
      false,
      "addNode",
    ),

  addConnection: (connection) => {
    set(
      (state) => {
        state.connections.push(connection);
      },
      false,
      "addConnection",
    );
  },

  addSocket: (socket) => {
    set(
      (state) => {
        state.sockets.push(socket);
      },
      false,
      "addSocket",
    );
  },
});

export const useStore = create<EditorStore>()(devtools(immer(store)));
