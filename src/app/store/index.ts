import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import {
  ConnectionData,
  NodeData,
  Position,
  SocketData,
} from "@/app/components/node/utils";

interface State {
  nodes: NodeData[];
  connections: ConnectionData[];
  sockets: SocketData[];
  activeConnection: ConnectionData | null;
}

interface Actions {
  // ------------ nodes
  setNodes: (nodes: NodeData[]) => void;
  addNode: (node: NodeData) => void;
  findNode: (nodeId: string) => NodeData;
  updateNodePosition: (
    nodeId: string,
    position: Position,
    dragging: boolean,
  ) => void;

  // ------------  connections
  setConnections: (connections: ConnectionData[]) => void;
  addConnection: (connection: ConnectionData) => void;
  addNewConnection: (connection: ConnectionData) => void;
  findConnection: (connectionId: string) => ConnectionData;
  updateConnection: (connection: ConnectionData, action: string) => void;
  removeConnection: (connectionId: string) => void;
  setActiveConnection: (connection: ConnectionData) => void;

  // ------------  sockets
  setSockets: (sockets: SocketData[]) => void;
  addSocket: (socket: SocketData) => void;
  findSocket: (socketId: string) => SocketData;
  updateSocketConnections: (socketId: string, connectionId: string) => void;
}

const store = (set, get) => ({
  nodes: [],
  connections: [],
  sockets: [],
  activeConnection: null,

  setNodes: (nodes: NodeData[]) => set({ nodes }, false, "setNodes"),

  addNode: (node: NodeData) => {
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

  setConnections: (connections: ConnectionData) =>
    set({ connections }, false, "setConnections"),

  updateConnection: (connection: ConnectionData, action: string) => {
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
          connection.outputSocketId,
          connection.id,
          "add",
        );
        break;
      case "remove-source":
        get().updateSocketConnections(
          oldConnection.outputSocketId,
          oldConnection.id,
          "remove",
        );
        break;
      case "add-target":
        get().updateSocketConnections(
          connection.inputSocketId,
          connection.id,
          "add",
        );
        break;
      case "remove-target":
        get().updateSocketConnections(
          oldConnection.inputSocketId,
          oldConnection.id,
          "remove",
        );
        break;
    }

    if (!connection.outputSocketId && !connection.inputSocketId) {
      get().removeConnection(connection.id);
    } else if (connection.outputSocketId && connection.inputSocketId) {
      set((state) => {
        state.activeConnection = null;
      });
    }
  },

  addConnection: (connection: ConnectionData) => {
    console.log("=================> add connection ......... ", connection);
    set(
      (state) => {
        state.connections.push(connection);
      },
      false,
      "addConnection",
    );
  },

  addNewConnection: (connection: ConnectionData) => {
    console.log(
      "=================> add [[ new ]] connection ......... ",
      connection,
    );

    set(
      (state) => {
        state.activeConnection = connection;
        state.connections.push(connection);
        console.log(
          "======> now we added a connection ",
          state.connections.length,
        );
      },
      false,
      "addNewConnection",
    );

    console.log("======> now we added a connection ", get().connections.length);

    get().updateConnection(connection, "add-source");
  },

  setActiveConnection: (connection: ConnectionData) => {
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

  addSocket: (socket: SocketData) => {
    set(
      (state) => {
        state.sockets.push(socket);
      },
      false,
      "addSocket",
    );
  },

  setSockets: (sockets: SocketData[]) => set({ sockets }, false, "setSockets"),

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

export const useStore = create<State & Actions>()(devtools(immer(store)));
