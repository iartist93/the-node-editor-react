import { socketColors, SocketProps } from "@/app/components/node/utils";
import cc from "classcat";
import { useEffect, useRef } from "react";
import { useStore } from "@/app/store";

export function Socket({ id, type, datatype }: SocketProps) {
  const size = 20;

  const socketRef = useRef(null);
  const addSocket = useStore((state) => state.addSocket);

  useEffect(() => {
    const bbox = socketRef.current.getBoundingClientRect();
    const position = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    addSocket({ id, type, datatype, position });
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
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 2}
        fill={socketColors[datatype]}
        className="stroke-1 stroke-indigo-500 hover:stroke-amber-500 hover:stroke-2"
      />
    </svg>
  );
}
