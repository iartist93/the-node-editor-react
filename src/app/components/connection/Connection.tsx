import {useEffect, useState} from 'react';
import {useStore} from '@/app/store';
import {useMouse} from '@uidotdev/usehooks';
import {
    isSamePosition,
    getPath,
    getSocketPosition,
    getTransformedPosition,
} from '@/app/components/connection/utils';
import {ConnectionData, Position} from '@/app/components/node/utils';
import _ from 'lodash';

export function Connection({connectionData}: ConnectionData) {
    const [mouse] = useMouse();

    const [outputPosition, setOutputPosition] = useState<Position>({
        x: mouse.x,
        y: mouse.y,
    });
    const [inputPosition, setInputPosition] = useState<Position>({
        x: mouse.x,
        y: mouse.y,
    });
    const [path, setPath] = useState('');

    const editorScale = useStore((store) => store.editorScale);
    const findNode = useStore((store) => store.findNode);

    const inputNode = findNode(connectionData.inputSocket?.nodeId);
    const outputNode = findNode(connectionData.outputSocket?.nodeId);

    const updatePositions = () => {
        // if the connection is connected to a socket, get the position of the socket.
        let sourcePosition: Position | null = connectionData.outputSocket?.id
            ? getSocketPosition(connectionData.outputSocket.id, editorScale)
            : null;
        let targetPosition: Position | null = connectionData.inputSocket?.id
            ? getSocketPosition(connectionData.inputSocket.id, editorScale)
            : null;

        const transformedPosition = getTransformedPosition(
            {x: mouse.x, y: mouse.y},
            editorScale,
        );

        if (!targetPosition) {
            if (mouse.x === 0 && mouse.y === 0 && sourcePosition) {
                targetPosition = {x: sourcePosition.x, y: sourcePosition.y};
            } else {
                targetPosition = {x: transformedPosition.x, y: transformedPosition.y};
            }
        } else if (!sourcePosition) {
            if (mouse.x === 0 && mouse.y === 0 && targetPosition) {
                sourcePosition = {x: targetPosition.x, y: targetPosition.y};
            } else {
                sourcePosition = {x: transformedPosition.x, y: transformedPosition.y};
            }
        }

        if (sourcePosition && !isSamePosition(outputPosition, sourcePosition)) {
            setOutputPosition(sourcePosition);
        }

        if (targetPosition && !isSamePosition(inputPosition, targetPosition)) {
            setInputPosition(targetPosition);
        }
    };

    const updatePath = () => {
        const p = getPath(outputPosition, inputPosition);
        setPath(p);
    };

    const throttleUpdatePosition = _.throttle(updatePositions, 100);
    const throttleUpdatePath = _.throttle(updatePath, 100);

    useEffect(() => {
        throttleUpdatePosition();
    }, [
        connectionData,
        mouse,
        inputNode,
        outputNode,
    ]);

    useEffect(() => {
        throttleUpdatePath();
    }, [outputPosition, inputPosition]);


    return (
        <path
            d={path}
            stroke='#2F3645'
            strokeWidth='2'
            fill='none'
            strokeLinecap='round'
        />
    );
}
