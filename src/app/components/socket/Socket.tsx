import { socketColors, SocketData } from "@/app/components/node/utils";
import cc from "classcat";
import { useEffect, useRef } from "react";
import { useStore } from "@/app/store";
import { nanoid } from "nanoid";
import { node } from "prop-types";

export function Socket({ id, nodeId, type, datatype }: SocketData) {
  const size = 20;

  const addSocket = useStore((state) => state.addSocket);
  const findSocket = useStore((state) => state.findSocket);
  const findConnection = useStore((state) => state.findConnection);
  const setActiveConnection = useStore((state) => state.setActiveConnection);
  const addNewConnection = useStore((state) => state.addNewConnection);
  const updateConnection = useStore((state) => state.updateConnection);

  const socketRef = useRef(null);
  const activeConnection = useStore((state) => state.activeConnection);

  const socketConnections = useStore(
    (store) => findSocket(id)?.connections || [],
  );

  const handleSocketClick = () => {
    console.log("all connection to socket ", socketConnections);

    // if (type === "input" && socketConnections.length > 0) {
    if (socketConnections.length > 0) {
      const connection = findConnection(socketConnections[0]);

      setActiveConnection(connection);

      updateConnection(
        {
          ...connection,
          inputNodeId: null,
          inputSocketId: null,
        },
        "remove-target",
      );

      return;
    }

    //TODO: the issue is here as we're playing with an existing connection nota new one
    if (activeConnection) {
      if (activeConnection.outputNodeId === nodeId) return;
      updateConnection(
        {
          ...activeConnection,
          inputNodeId: nodeId,
          inputSocketId: id,
        },
        "add-target",
      );
    } else {
      addNewConnection({
        id: nanoid(),
        outputNodeId: nodeId,
        outputSocketId: id,
        inputSocketId: null,
        inputNodeId: null,
      });
    }
  };

  useEffect(() => {
    addSocket({ id, nodeId, type, datatype, connections: [] });
  }, []);

  return (
    <svg
      ref={socketRef}
      id={id}
      width={size}
      height={size}
      className={cc([
        "absolute top-1/2",
        {
          "right-0 -translate-y-1/2 translate-x-1/2": type === "output",
          "left-0 -translate-y-1/2 -translate-x-1/2": type === "input",
        },
      ])}
      onClick={handleSocketClick}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 2}
        fill={socketColors[datatype]}
        className="stroke`-1 stroke-indigo-500 hover:stroke-amber-500 hover:stroke-2"
      />
    </svg>
  );
}
