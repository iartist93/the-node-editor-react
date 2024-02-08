import "./styles.css";
import { useState } from "react";
import { Socket } from "@/app/components/socket/Socket";

type NumberSocketType = {
  value: number;
};

export function NumberSocket({ value }: NumberSocketType) {
  const [val, setValue] = useState(value);

  return (
    <div className="flex flex-col relative px-4 my-2">
      <input
        type="number"
        value={val}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="bg-stone-300 px-2 py-1 rounded-md"
      />
      <Socket id={"1"} type={"output"} datatype={"color"} />
      <Socket id={"2"} type={"input"} datatype={"number"} />
    </div>
  );
}
