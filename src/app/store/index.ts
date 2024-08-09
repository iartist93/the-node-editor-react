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

    //-------------------------------------------
    // nodes
    //-------------------------------------------

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

    //-------------------------------------------
    // connections
    //-------------------------------------------

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
                            connection.outputSocket = null;
                        } else {
                            connection.inputSocket = null;
                        }
                        socket.connections = socket.connections.filter(
                            (c) => c.id === connectionId,
                        );
                        break;
                    case 'connect':
                        if (socket.type === 'output') {
                            connection.outputSocket = socket;
                        } else {
                            connection.inputSocket = socket;
                        }
                        socket.connections.push(connectionId);
                        break;
                    default:
                        break;
                }

                if (connection.outputSocket && connection.inputSocket) {
                    state.activeConnection = null;
                } else {
                    state.activeConnection = connection;
                }
            },
            false,
            'updateConnection',
        );
    },

    addNewConnection: (socketData: SocketData) => {
        set(
            (state) => {
                const {nodeId, type, name} = socketData;
                const socket = state.nodes.find(n => n.id === nodeId)[type + 's'][name];

                const connection = {
                    id: nanoid(),
                    outputSocket: socket.type === 'output' ? socket : null,
                    inputSocket: socket.type === 'input' ? socket : null,
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
            (socket) => socket.id === connection.inputSocket.id,
        );
        const outputSocket = get().sockets.find(
            (socket) => socket.id === connection.outputSocket.id,
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

                const inputNode = state.nodes.find(n => n.id === connection.inputSocket.nodeId);
                const outputNode = state.nodes.find(n => n.id === connection.outputSocket.nodeId);

                const inputSocket = inputNode.inputs[connection.inputSocket.name];
                const outputSocket = outputNode.outputs[connection.outputSocket.name];

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
                    const inputNode = state.nodes.find(n => n.id === state.activeConnection.inputsocket?.nodeId);
                    const outputNode = state.nodes.find(n => n.id === state.activeConnection.outputSocket?.nodeId);

                    // remove the active connection from the socket.connections
                    if (inputNode) {
                        const inputSocket = inputNode.inputs[state.activeConnection.inputSocket.name];
                        inputSocket.connections = inputSocket.connections.filter(
                            (connectionId) => connectionId !== state.activeConnection.id,
                        );
                    }

                    if (outputNode) {
                        const outputSocket = outputNode.outputs[state.activeConnection.outputSocket.name];
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

    //-------------------------------------------
    // sockets
    //-------------------------------------------

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

    //-------------------------------------------


});

export const useStore = create<State & Actions>()(devtools(immer(store)));
