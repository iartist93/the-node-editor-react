import "./styles.css";
import { NodeComponentProps } from "@/app/components/node/utils";
import { useState } from "react";

export function ColorNode({ node }: NodeComponentProps) {
  const [color, setColor] = useState(node.data.color);

  return (
    <div className="flex p-4 h-full">
      <div className="w-full">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
