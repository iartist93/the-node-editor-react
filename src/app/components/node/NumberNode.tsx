import "./styles.css";
import { NodeComponentProps } from "@/app/components/node/utils";
import { useState } from "react";

export function NumberNode({ node }: NodeComponentProps) {
  const [value, setValue] = useState(node.data.value);

  return (
    <div className="flex p-4 h-full">
      <div className="w-full">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-stone-300 px-2 py-1 rounded-lg"
        />
      </div>
    </div>
  );
}
