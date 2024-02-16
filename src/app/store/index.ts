import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { Position } from "@/app/components/node/utils";
import { NodeData } from "@/app/example/data";

interface EditorStore {
  // ------------ state
  nodes: any[];
  connections: any[];
  sockets: any[];
  activeConnection: any | null;

  // ------------ nodes
  setNodes: (nodes: any[]) => void;
  addNode: (node: any) => void;
  findNode: (nodeId: string) => NodeData;
  updateNodePosition: (
    nodeId: string,
    position: Position,
    dragging: boolean,
  ) => void;

  // ------------  connections
  setConnections: (connections: any[]) => void;
  addConnection: (connection: any) => void;
  addNewConnection: (connection: any) => void;
  findConnection: (connectionId: string) => any;
  updateConnection: (connection: any, action: string) => void;
  removeConnection: (connectionId: string) => void;
  setActiveConnection: (connection: any) => void;

  // ------------  sockets
  setSockets: (sockets: any[]) => void;
  addSocket: (socket: any) => void;
  findSocket: (socketId: string) => any;
  updateSocketConnections: (socketId: string, connectionId: string) => void;
}

const store = (set, get) => ({
  nodes: [],
  connections: [],
  sockets: [],
  activeConnection: null,

  setNodes: (nodes) => set({ nodes }, false, "setNodes"),

  addNode: (node) => {
    set(
      (state) => {
        state.nodes.push(node);
      },
      false,
      "addNode",
    );
  },

  findNode: (nodeId: string) => {
    return get().nodes.find((node: NodeData) => node.id === nodeId);
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

  setConnections: (connections) =>
    set({ connections }, false, "setConnections"),

  updateConnection: (connection: any, action: string) => {
    const oldConnection = get().findConnection(connection.id);

    set(
      (state) => {
        const index = state.connections.findIndex(
          (c) => c.id === connection.id,
        );
        state.connections[index] = connection;
      },
      false,
      "updateConnection",
    );

    switch (action) {
      case "add-source":
        get().updateSocketConnections(
          connection.sourceSocketId,
          connection.id,
          "add",
        );
        break;
      case "remove-source":
        get().updateSocketConnections(
          oldConnection.sourceSocketId,
          oldConnection.id,
          "remove",
        );
        break;
      case "add-target":
        get().updateSocketConnections(
          connection.targetSocketId,
          connection.id,
          "add",
        );
        break;
      case "remove-target":
        get().updateSocketConnections(
          oldConnection.targetSocketId,
          oldConnection.id,
          "remove",
        );
        break;
    }

    if (!connection.sourceSocketId && !connection.targetSocketId) {
      get().removeConnection(connection.id);
    } else if (connection.sourceSocketId && connection.targetSocketId) {
      set((state) => {
        state.activeConnection = null;
      });
    }
  },

  addConnection: (connection) => {
    console.log("=================> add connection .........");
    set(
      (state) => {
        state.connections.push(connection);
      },
      false,
      "addConnection",
    );
  },

  addNewConnection: (connection) => {
    console.log(
      "=================> add [[ new ]] connection ......... ",
      connection,
    );
    set(
      (state) => {
        state.activeConnection = connection;
        state.connections.push(connection);
      },
      false,
      "addNewConnection",
    );

    get().updateConnection(connection, "add-source");
  },

  setActiveConnection: (connection) => {
    set(
      (state) => {
        state.activeConnection = connection;
      },
      false,
      "setActiveConnection",
    );
  },

  findConnection: (connectionId: string) => {
    return get().connections.find(
      (connection) => connection.id === connectionId,
    );
  },

  removeConnection: (connectionId: string) => {
    set(
      (state) => {
        state.connections = state.connections.filter(
          (connection) => connection.id !== connectionId,
        );
      },
      false,
      "removeConnection",
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

  setSockets: (sockets) => set({ sockets }, false, "setSockets"),

  findSocket: (socketId: string) => {
    return get().sockets.find((socket) => socket.id === socketId);
  },

  updateSocketConnections: (
    socketId: string,
    connectionId: string,
    action: string,
  ) => {
    console.log("updateSocketConnections", socketId, connectionId, action);

    set(
      (state) => {
        const socket = state.sockets.find((s) => s.id === socketId);

        console.log("is socket there? ", socket);
        if (socket) {
          if (action === "add") {
            socket.connections.push(connectionId);
            console.log("update");
          } else if (action === "remove") {
            socket.connections = socket.connections.filter(
              (c) => c !== connectionId,
            );
            console.log("removed");
          }
        }
      },
      false,
      "updateSocketConnections",
    );
  },
});

export const useStore = create<EditorStore>()(devtools(immer(store)));
