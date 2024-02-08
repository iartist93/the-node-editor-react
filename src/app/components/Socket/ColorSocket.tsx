import "./styles.css";
import { useState } from "react";
import { Socket } from "@/app/components/Socket/Socket";
import cc from "classcat";

type ColorSocketProps = {
  value: string;
  height?: number;
  name: string;
};

export function ColorSocket({ value, name, height = 200 }: ColorSocketProps) {
  const [color, setColor] = useState(value);

  return (
    <div className="flex flex-col relative px-4 my-2">
      <div
        className="rounded-md overflow-hidden relative"
        style={{ height: `${height}px` }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-full"
        />

        <div className="select-none pointer-events-none absolute left-2 top-2 text-xs text-sky-50">
          <p className={cc(["font-light"])}>{name}</p>
          <p className={cc(["font-bold"])}>{color}</p>
        </div>
      </div>
      <Socket id={"4"} type={"output"} datatype={"color"} />
    </div>
  );
}
