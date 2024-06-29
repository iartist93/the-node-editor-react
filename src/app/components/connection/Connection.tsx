import {useEffect, useState} from "react";
import {useStore} from "@/app/store";
import {useMouse} from "@uidotdev/usehooks";
import {
    isSamePosition,
    getPath,
    getSocketPosition,
    getTransformedPosition,
} from "@/app/components/connection/utils";
import {ConnectionData, Position} from "@/app/components/node/utils";
import _ from "lodash";

export function Connection({
                               id,
                               outputNodeId,
                               outputSocketId,
                               inputNodeId,
                               inputSocketId,
                           }: ConnectionData) {
    const [mouse] = useMouse();

    const [outputPosition, setOutputPosition] = useState<Position>({
        x: mouse.x,
        y: mouse.y,
    });
    const [inputPosition, setInputPosition] = useState<Position>({
        x: mouse.x,
        y: mouse.y,
    });
    const [path, setPath] = useState("");

    const editorScale = useStore((store) => store.editorScale);
    const findNode = useStore((store) => store.findNode);

    const inputNode = findNode(inputNodeId);
    const outputNode = findNode(outputNodeId);

    const updatePositions = () => {
        // if the connection is connected to a socket, get the position of the socket.
        let sourcePosition: Position | null = outputSocketId
            ? getSocketPosition(outputSocketId, editorScale)
            : null;
        let targetPosition: Position | null = inputSocketId
            ? getSocketPosition(inputSocketId, editorScale)
            : null;

        const transformedPosition = getTransformedPosition(
            {x: mouse.x, y: mouse.y},
            editorScale,
        );


        if (!targetPosition) {
            if (
                mouse.x === 0 &&
                mouse.y === 0 &&
                sourcePosition
            ) {
                targetPosition = {x: sourcePosition.x, y: sourcePosition.y};
            } else {
                targetPosition = {x: transformedPosition.x, y: transformedPosition.y};
            }
        } else if (!sourcePosition) {
            if (
                mouse.x === 0 &&
                mouse.y === 0 &&
                targetPosition
            ) {
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
        outputNodeId,
        outputSocketId,
        inputNodeId,
        inputSocketId,
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
            stroke="#2F3645"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
        />
    );
}
