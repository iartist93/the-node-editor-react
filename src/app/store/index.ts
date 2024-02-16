import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Position } from "@/app/components/node/utils";
import { NodeData } from "@/app/example/data";

interface EditorStore {
  nodes: any[];
  connections: any[];
  sockets: any[];

  findNode: (nodeId: string) => NodeData;

  setNodes: (nodes: any[]) => void;
  setConnections: (connections: any[]) => void;
  setSockets: (sockets: any[]) => void;

  addNode: (node: any) => void;
  addConnection: (connection: any) => void;
  addSocket: (socket: any) => void;

  updateNodePosition: (
    nodeId: string,
    position: Position,
    dragging: boolean,
  ) => void;
}

const store = (set, get) => ({
  nodes: [],
  connections: [],
  sockets: [],

  setNodes: (nodes) => set({ nodes }, false, "setNodes"),
  setConnections: (connections) =>
    set({ connections }, false, "setConnections"),
  setSockets: (sockets) => set({ sockets }, false, "setSockets"),

  findNode: (nodeId: string) => {
    return get().nodes.find((node: NodeData) => node.id === nodeId);
  },

  addNode: (node) => {
    set(
      (state) => {
        state.nodes.push(node);
      },
      false,
      "addNode",
    );
  },

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

  updateNodePosition: (
    nodeId: string,
    position: Position,
    dragging: boolean,
  ) => {
    set(
      (store) => {
        const node = store.nodes.find((node: NodeData) => node.id === nodeId);
        if (node) {
          node.position = position;
          node.dragging = dragging;
        }
      },
      false,
      "updateNodePosition",
    );
  },
});

export const useStore = create<EditorStore>()(devtools(immer(store)));
