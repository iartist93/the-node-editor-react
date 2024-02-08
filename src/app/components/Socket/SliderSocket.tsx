import "./styles.css";
import { useState } from "react";
import { Socket } from "@/app/components/Socket/Socket";
import cc from "classcat";

type SliderSocketProps = {
  value: number;
  name: string;
  min?: number;
  max?: number;
};

export function SliderSocket({
  value,
  name,
  min = 0,
  max = 1,
}: SliderSocketProps) {
  const [val, setValue] = useState(value);

  return (
    <div className="flex flex-col relative px-4 my-2">
      <div className="w-full h-6 relative rounded-md overflow-hidden">
        <input
          type="range"
          min={min}
          max={max}
          step={0.01}
          value={val}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="slider w-full h-full bg-stone-300 outline-0 opacity-70 hover:opacity-100 "
        />

        <div
          className="absolute top-0 left-0 bg-indigo-600 pointer-events-none select-none h-full"
          style={{
            width: `${((val - min) / (max - min)) * 100}%`,
          }}
        ></div>

        <p
          className={cc([
            "select-none pointer-events-none absolute left-2 top-[50%] -translate-y-[50%]  text-xs font-light",
            {
              "text-purple-200": val > 0.2,
              "text-purple-950": val <= 0.2,
            },
          ])}
        >
          {name}
        </p>

        <p
          className={cc([
            "select-none pointer-events-none absolute right-2 top-[50%]  -translate-y-[50%] text-xs font-bold",
            {
              "text-purple-200": val > 0.94,
              "text-purple-950": val <= 0.94,
            },
          ])}
        >
          {val}
        </p>
      </div>
      <Socket id={"2"} type={"output"} datatype={"number"} />
    </div>
  );
}
