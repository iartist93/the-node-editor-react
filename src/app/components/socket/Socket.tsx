import {
    socketColors,
    SocketData,
} from '@/app/components/node/utils';
import cc from 'classcat';
import {useEffect, useRef} from 'react';
import {useStore} from '@/app/store';
import {useGraph} from "../../hooks/useGraph";

export function Socket(socketData: SocketData) {
    const {id, nodeId, name, type, datatype, connections} = socketData;
    const size = 15;

    const activeConnection = useStore((state) => state.activeConnection);
    const addNewConnection = useStore((state) => state.addNewConnection);
    const updateConnection = useStore((state) => state.updateConnection);
    const removeConnection = useStore((state) => state.removeConnection);

    const socketRef = useRef(null);
    const {onConnectionsChange} = useGraph()

    const handleSocketClick = (event: any) => {
        event.stopPropagation();

        // rule: don't connect to the self
        if (
            activeConnection &&
            ((type === 'output' && activeConnection.outputSocketId === id) ||
                (type === 'input' && activeConnection.inputSocketId === id))
        ) {
            return;
        }

        if (connections.length > 0) {
            const connection = connections[0];

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
                fill={socketColors[datatype]}
                className='no-drag stroke-1 stroke-slate-400 hover:stroke-amber-500 hover:stroke-2'
            />
        </svg>
    );
}
