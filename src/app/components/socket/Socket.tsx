import {
  ConnectionData,
  socketColors,
  SocketData,
} from '@/app/components/node/utils';
import cc from 'classcat';
import { useEffect, useRef } from 'react';
import { useStore } from '@/app/store';

export function Socket({
  id,
  nodeId,
  type,
  datatype,
  onConnectionsChange,
  value,
  name,
}: SocketData) {
  const size = 15;

  const addSocket = useStore((state) => state.addSocket);
  const findSocket = useStore((state) => state.findSocket);
  const findConnection = useStore((state) => state.findConnection);
  const setActiveConnection = useStore((state) => state.setActiveConnection);
  const addNewConnection = useStore((state) => state.addNewConnection);
  const updateConnection = useStore((state) => state.updateConnection);
  const removeConnection = useStore((state) => state.removeConnection);

  const socketRef = useRef(null);
  const activeConnection = useStore((state) => state.activeConnection);

  const socketConnections = useStore(
    (store) => findSocket(id)?.connections || [],
  );

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

    if (socketConnections.length > 0) {
      const connection = findConnection(socketConnections[0]);

      if (activeConnection) {
        if (type === 'input') {
          removeConnection(connection.id);
          updateConnection(activeConnection.id, id, 'connect');
        } else {
          updateConnection(activeConnection.id, id, 'connect');
        }
      } else {
        if (type === 'input') {
          updateConnection(connection.id, id, 'disconnect');
        } else {
          addNewConnection(id);
        }
      }
    } else {
      if (activeConnection) {
        updateConnection(activeConnection.id, id, 'connect');
      } else {
        addNewConnection(id);
      }
    }
  };

  useEffect(() => {
    if (onConnectionsChange) {
      const connections = socketConnections.map((connectionId) => {
        return findConnection(connectionId);
      });
      onConnectionsChange(connections);
    }
  }, [socketConnections]);

  useEffect(() => {
    addSocket({ id, name, nodeId, type, datatype, value, connections: [] });
  }, []);

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
