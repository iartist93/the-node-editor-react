import {
    socketColors,
    SocketData,
} from '@/app/components/node/utils';
import cc from 'classcat';
import {useEffect, useRef} from 'react';
import {useStore} from '@/app/store';
import {useGraph} from "../../hooks/useGraph";

export function Socket(socketData: SocketData) {
    const {id, nodeId, name, type, dataType, connections} = socketData;
    const size = 15;

    const allConnections = useStore((state) => state.connections);
    const activeConnection = useStore((state) => state.activeConnection);
    const addNewConnection = useStore((state) => state.addNewConnection);
    const updateConnection = useStore((state) => state.updateConnection);
    const removeConnection = useStore((state) => state.removeConnection);
    const removeActiveConnection = useStore((state) => state.removeActiveConnection);


    const socketRef = useRef(null);
    const {onConnectionsChange} = useGraph()

    /**
     * Check if the connection is valid - don't connect to self
     * @param socketData
     */
    const checkIfValidConnection = (socketData: SocketData) => {
        if (activeConnection) {
            if (type === 'input') {
                if (activeConnection.outputSocket.id === id || activeConnection.outputSocket.dataType !== socketData.dataType) {
                    console.log("note same ", activeConnection.outputSocket, activeConnection.outputSocket.dataType, socketData.dataType)
                    return false;
                }

            } else {
                if (activeConnection.inputSocket.id === id || activeConnection.inputSocket.dataType !== socketData.dataType) {
                    console.log("note same ", activeConnection.inputSocket, activeConnection.inputSocket.dataType, socketData.dataType)
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * input socket can only have one connection
     * output socket can have multiple connections
     * @param event
     */
    const handleSocketClick = (event: any) => {
        event.stopPropagation();

        if (!checkIfValidConnection(socketData)) {
            console.log("====================> invalid connection ")
            if (activeConnection) {
                removeActiveConnection();
            }
            return;
        }

        // check if there's an existing connections to the socket or is it empty
        if (connections.length > 0) {
            const connectionId = connections[0];
            const connection = allConnections.find((c) => c.id === connectionId);
            if (activeConnection) {
                if (type === 'input') {
                    removeConnection(connection.id);
                    updateConnection(activeConnection.id, socketData, 'connect');
                } else {
                    updateConnection(activeConnection.id, socketData, 'connect');
                }
            } else {
                if (type === 'input') {
                    updateConnection(connection.id, socketData, 'disconnect');
                } else {
                    addNewConnection(socketData);
                }
            }
        } else {
            if (activeConnection) {
                updateConnection(activeConnection.id, socketData, 'connect');
            } else {
                addNewConnection(socketData);
            }
        }
    };

    useEffect(() => {
        onConnectionsChange(connections);
    }, [connections]);


    return (
        <svg
            ref={socketRef}
            id={id}
            width={size}
            height={size}
            className={cc([
                'no-drag',
                'absolute top-1/2',
                {
                    'right-0 -translate-y-1/2 translate-x-1/2': type === 'output',
                    'left-0 -translate-y-1/2 -translate-x-1/2': type === 'input',
                },
            ])}
            onClick={handleSocketClick}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 2}
                fill={socketColors[dataType]}
                className='no-drag stroke-1 stroke-slate-400 hover:stroke-amber-500 hover:stroke-2'
            />
        </svg>
    );
}
