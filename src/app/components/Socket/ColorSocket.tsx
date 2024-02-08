import "./styles.css";
import { useState } from "react";
import { Socket } from "@/app/components/Socket/Socket";

type ColorSocketProps = {
  value: string;
  height?: number;
};

export function ColorSocket({ value, height = 200 }: ColorSocketProps) {
  const [color, setColor] = useState(value);

  return (
    <div
      className="flex flex-col relative px-4 my-2"
      style={{ height: `${height}px` }}
    >
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-full"
      />
      <Socket id={"4"} type={"output"} datatype={"color"} />
    </div>
  );
}
