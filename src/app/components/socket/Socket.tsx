import { socketColors, SocketProps } from "@/app/components/node/utils";
import cc from "classcat";
import { useEffect, useRef } from "react";
import { useStore } from "@/app/store";
import { nanoid } from "nanoid";

export function Socket({ id, type, datatype }: SocketProps) {
  const size = 20;

  const socketRef = useRef(null);
  const addSocket = useStore((state) => state.addSocket);
  const addNewConnection = useStore((state) => state.addNewConnection);
  const updateConnection = useStore((state) => state.updateConnection);

  const newConnection = useStore((state) => state.newConnection);

  const handleSocketClick = () => {
    // if(newConnection.sourceNodeId === "" && type === "output")

    if (newConnection) {
      updateConnection({
        ...newConnection,
        targetNodeId: "2",
        targetSocketId: "1",
      });
    } else {
      addNewConnection({
        id: nanoid(),
        sourceNodeId: "1",
        sourceSocketId: "1",
      });
    }
  };

  useEffect(() => {
    addSocket({ id, type, datatype });
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
