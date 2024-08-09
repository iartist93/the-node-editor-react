import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {devtools} from 'zustand/middleware';
import {
    ConnectionData,
    NodeData,
    Position,
    SocketData,
} from '@/app/components/node/utils';
import {nanoid} from 'nanoid';

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
    addNewConnection: (socket: SocketData) => void;
    findConnection: (connectionId: string) => ConnectionData;
    updateConnection: (
        connectionId: string,
        socketData: SocketData,
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
    updateSocket: (nodeId: string, type: 'input' | 'output', socketName: string, value: any) => void;
}

const store = (set, get) => ({
    nodes: [],
    connections: [],
    sockets: [],
    activeConnection: null,
    editorScale: 1,

    setEditorScale: (scale: number) => {
        set({editorScale: scale});
    },

    setNodes: (nodes: NodeData[]) => set({nodes}, false, 'setNodes'),

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
        set({connections}, false, 'setConnections'),

    updateConnection: (
        connectionId: string,
        socketData: SocketData,
        action: string,
    ) => {
        set(
            (state) => {
                const {nodeId, type, name} = socketData;
                const socket = state.nodes.find(n => n.id === nodeId)[type + 's'][name];
                const connection = state.connections.find((c) => c.id === connectionId);

                switch (action) {
                    case 'disconnect':
                        if (socket.type === 'output') {
                            connection.outputNodeId = null;
                            connection.outputSocketId = null;
                            connection.outputSocketName = null;
                        } else {
                            connection.inputNodeId = null;
                            connection.inputSocketId = null;
                            connection.inputSocketName = null;
                        }
                        socket.connections = socket.connections.filter(
                            (c) => c.id === connectionId,
                        );
                        break;
                    case 'connect':
                        if (socket.type === 'output') {
                            connection.outputNodeId = socket.nodeId;
                            connection.outputSocketId = socket.id;
                            connection.outputSocketName = socket.name;
                        } else {
                            connection.inputNodeId = socket.nodeId;
                            connection.inputSocketId = socket.id;
                            connection.inputSocketName = socket.name;
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

    addNewConnection: (socketData: SocketData) => {
        set(
            (state) => {
                const {nodeId, type, name} = socketData;
                const socket = state.nodes.find(n => n.id === nodeId)[type + 's'][name];

                const connection = {
                    id: nanoid(),
                    outputNodeId: socket.type === 'output' ? socket.nodeId : null,
                    outputSocketName: socket.type === 'output' ? socket.name : null,
                    outputSocketId: socket.type === 'output' ? socket.id : null,
                    inputNodeId: socket.type === 'input' ? socket.nodeId : null,
                    inputSocketId: socket.type === 'input' ? socket.id : null,
                    inputSocketName: socket.type === 'input' ? socket.name : null,
                };

                state.activeConnection = connection;
                state.connections.push(connection);
            },
            false,
            'addNewConnection',
        );

        get().updateConnection(get().activeConnection.id, socketData, 'connect');
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

    findConnection: (connectionId: string): ConnectionData => {
        const connection = get().connections.find((c) => c.id === connectionId);
        const inputSocket = get().sockets.find(
            (socket) => socket.id === connection.inputSocketId,
        );
        const outputSocket = get().sockets.find(
            (socket) => socket.id === connection.outputSocketId,
        );

        return {
            ...connection,
            inputSlot: inputSocket,
            outputSlot: outputSocket,
        };
    },

    removeConnection: (connectionId: string) => {
        set(
            (state) => {
                // get the connection
                const connection = state.connections.find((c) => c.id === connectionId);

                const inputNode = state.nodes.find(n => n.id === connection.inputNodeId);
                const outputNode = state.nodes.find(n => n.id === connection.outputNodeId);

                const inputSocket = inputNode.inputs[connection.inputSocketName];
                const outputSocket = outputNode.outputs[connection.outputSocketName];

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

    removeActiveConnection: () => {
        set(
            (state) => {
                if (state.activeConnection) {
                    // get the input socket and output socket for the active connection
                    const inputNode = state.nodes.find(n => n.id === state.activeConnection.inputNodeId);
                    const outputNode = state.nodes.find(n => n.id === state.activeConnection.outputNodeId);

                    // remove the active connection from the socket.connections
                    if (inputNode) {
                        const inputSocket = inputNode.inputs[state.activeConnection.inputSocketName];
                        inputSocket.connections = inputSocket.connections.filter(
                            (connectionId) => connectionId !== state.activeConnection.id,
                        );
                    }

                    if (outputNode) {
                        const outputSocket = outputNode.outputs[state.activeConnection.outputSocketName];
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

    findSocket: (
        nodeId: string,
        type: 'input' | 'output',
        socketName: string,
    ) => {
        return get().nodes.find(n => n.id === nodeId)[type][socketName];
    },

    updateSocket: (nodeId: string, type: 'input' | 'output', socketName: string, value: any) => {
        set(
            (state) => {
                const node = state.nodes.find(n => n.id === nodeId);
                node[type][socketName].value = value;
            },
            false,
            'updateSocket',
        );
    },
});

export const useStore = create<State & Actions>()(devtools(immer(store)));
