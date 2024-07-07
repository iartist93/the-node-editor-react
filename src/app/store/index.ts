import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import {
  ConnectionData,
  NodeData,
  Position,
  SocketData,
} from '@/app/components/node/utils';
import { nanoid } from 'nanoid';

interface State {
  nodes: NodeData[];
  connections: ConnectionData[];
  sockets: SocketData[];
  activeConnection: ConnectionData | null;
  editorScale: number;
}

interface Actions {
  // ------------ editor
  setEditorScale: (scale: number) => void;

  // ------------ nodes
  setNodes: (nodes: NodeData[]) => void;
  addNode: (node: NodeData) => void;
  findNode: (nodeId: string | null) => NodeData | null;
  updateNodePosition: (
    nodeId: string,
    position: Position,
    dragging: boolean,
  ) => void;

  // ------------  connections
  setConnections: (connections: ConnectionData[]) => void;
  addConnection: (connection: ConnectionData) => void;
  addNewConnection: (connectionId: string) => void;
  findConnection: (connectionId: string) => ConnectionData;
  updateConnection: (
    connectionId: string,
    socketId: string,
    action: string,
  ) => void;
  removeConnection: (connectionId: string) => void;
  removeActiveConnection: () => void;
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
  editorScale: 1,

  setEditorScale: (scale: number) => {
    set({ editorScale: scale });
  },

  setNodes: (nodes: NodeData[]) => set({ nodes }, false, 'setNodes'),

  addNode: (node: NodeData) => {
    set(
      (state) => {
        state.nodes.push(node);
      },
      false,
      'addNode',
    );
  },

  findNode: (nodeId: string | null) => {
    if (!nodeId) return null;
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
      'updateNodePosition',
    );
  },

  setConnections: (connections: ConnectionData) =>
    set({ connections }, false, 'setConnections'),

  updateConnection: (
    connectionId: string,
    socketId: string,
    action: string,
  ) => {
    set(
      (state) => {
        const connection = state.connections.find((c) => c.id === connectionId);
        const socket = state.sockets.find((s) => s.id === socketId);

        switch (action) {
          case 'disconnect':
            if (socket.type === 'output') {
              connection.outputSocketId = null;
              connection.outputNodeId = null;
            } else {
              connection.inputNodeId = null;
              connection.inputSocketId = null;
            }
            socket.connections = socket.connections.filter(
              (c) => c.id === connectionId,
            );
            break;
          case 'connect':
            if (socket.type === 'output') {
              connection.outputNodeId = socket.nodeId;
              connection.outputSocketId = socket.id;
            } else {
              connection.inputNodeId = socket.nodeId;
              connection.inputSocketId = socket.id;
            }
            socket.connections.push(connectionId);
            break;
          default:
            break;
        }

        if (connection.outputSocketId && connection.inputSocketId) {
          state.activeConnection = null;
        } else {
          state.activeConnection = connection;
        }
      },
      false,
      'updateConnection',
    );
  },

  addConnection: (connection: ConnectionData) => {
    set(
      (state) => {
        state.connections.push(connection);
      },
      false,
      'addConnection',
    );
  },

  addNewConnection: (socketId: string) => {
    set(
      (state) => {
        const socket = state.sockets.find((s) => s.id === socketId);

        const connection = {
          id: nanoid(),
          outputNodeId: socket.type === 'output' ? socket.nodeId : null,
          outputSocketId: socket.type === 'output' ? socket.id : null,
          inputNodeId: socket.type === 'input' ? socket.nodeId : null,
          inputSocketId: socket.type === 'input' ? socket.id : null,
        };

        state.activeConnection = connection;
        state.connections.push(connection);
      },
      false,
      'addNewConnection',
    );

    get().updateConnection(get().activeConnection.id, socketId, 'connect');
  },

  setActiveConnection: (connection: ConnectionData) => {
    set(
      (state) => {
        state.activeConnection = connection;
      },
      false,
      'setActiveConnection',
    );
  },

  findConnection: (connectionId: string) => {
    const connection = get().connections.find((c) => c.id === connectionId);
    const inputSocket = get().sockets.find(
      (socket) => socket.id === connection.inputSocketId,
    );
    const outputSocket = get().sockets.find(
      (socket) => socket.id === connection.outputSocketId,
    );

    return {
      ...connection,
      inputSocket,
      outputSocket,
    };
  },

  removeConnection: (connectionId: string) => {
    set(
      (state) => {
        // get the connection
        const connection = state.connections.find((c) => c.id === connectionId);

        const inputSocket = state.sockets.find(
          (socket) => socket.id === connection.inputSocketId,
        );
        const outputSocket = state.sockets.find(
          (socket) => socket.id === connection.outputSocketId,
        );

        // remove the active connection from the socket.connections
        inputSocket.connections = inputSocket.connections.filter(
          (connectionId) => connectionId !== connection.id,
        );

        outputSocket.connections = outputSocket.connections.filter(
          (connectionId) => connectionId !== connection.id,
        );

        state.connections = state.connections.filter(
          (c) => c.id !== connectionId,
        );
      },
      false,
      'removeConnection',
    );
  },

  removeActiveConnection: (connectionId: string) => {
    set(
      (state) => {
        if (state.activeConnection) {
          // get the input socket and output socket for the active connection
          const inputSocket = state.sockets.find(
            (socket) => socket.id === state.activeConnection.inputSocketId,
          );
          const outputSocket = state.sockets.find(
            (socket) => socket.id === state.activeConnection.outputSocketId,
          );

          // remove the active connection from the socket.connections
          if (inputSocket) {
            inputSocket.connections = inputSocket.connections.filter(
              (connectionId) => connectionId !== state.activeConnection.id,
            );
          }

          if (outputSocket) {
            outputSocket.connections = outputSocket.connections.filter(
              (connectionId) => connectionId !== state.activeConnection.id,
            );
          }

          state.connections = state.connections.filter(
            (connection) => connection.id !== state.activeConnection.id,
          );

          state.activeConnection = null;
        }
      },
      false,
      'removeActiveConnection',
    );
  },

  addSocket: (socket: SocketData) => {
    set(
      (state) => {
        state.sockets.push(socket);
      },
      false,
      'addSocket',
    );
  },

  setSockets: (sockets: SocketData[]) => set({ sockets }, false, 'setSockets'),

  findSocket: (socketId: string) => {
    return get().sockets.find((socket) => socket.id === socketId);
  },
});

export const useStore = create<State & Actions>()(devtools(immer(store)));
