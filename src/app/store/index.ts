import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Position } from "@/app/components/node/utils";
import { NodeData } from "@/app/example/data";

interface EditorStore {
  nodes: any[];
  connections: any[];
  sockets: any[];
  newConnection: any | null;

  findNode: (nodeId: string) => NodeData;
  findConnection: (connectionId: string) => any;
  updateConnection: (connection: any) => void;

  setNodes: (nodes: any[]) => void;
  setConnections: (connections: any[]) => void;
  setSockets: (sockets: any[]) => void;

  addNode: (node: any) => void;
  addConnection: (connection: any) => void;
  addSocket: (socket: any) => void;

  addNewConnection: (connection: any) => void;

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
  newConnection: null,

  setNodes: (nodes) => set({ nodes }, false, "setNodes"),
  setConnections: (connections) =>
    set({ connections }, false, "setConnections"),
  setSockets: (sockets) => set({ sockets }, false, "setSockets"),

  findNode: (nodeId: string) => {
    return get().nodes.find((node: NodeData) => node.id === nodeId);
  },
  findConnection: (connectionId: string) => {
    return get().connections.find(
      (connection) => connection.id === connectionId,
    );
  },
  updateConnection: (connection: any) => {
    set(
      (state) => {
        const index = state.connections.findIndex(
          (c) => c.id === connection.id,
        );
        state.connections[index] = connection;
        state.newConnection = null;
      },
      false,
      "updateConnection",
    );
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

  addNewConnection: (connection) => {
    set(
      (state) => {
        state.newConnection = connection;
        state.connections.push(connection);
      },
      false,
      "addNewConnection",
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
