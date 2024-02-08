import "./styles.css";
import { NodeComponentProps } from "@/app/components/node/utils";
import { useState } from "react";
import { Socket } from "@/app/components/Socket/Socket";

export function NumberNode({ node }: NodeComponentProps) {
  const [value, setValue] = useState(node.data.value);

  return (
    <div className="flex">
      <div className="w-full">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-stone-300 px-2 py-1 rounded-lg"
        />
        <Socket id={"1"} type={"output"} datatype={"color"} />
        <Socket id={"2"} type={"input"} datatype={"number"} />
      </div>
    </div>
  );
}
