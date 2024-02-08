import { socketColors, SocketProps } from "@/app/components/node/utils";
import cc from "classcat";

export function Socket({ id, type, datatype }: SocketProps) {
  const size = 20;

  return (
    <svg
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
