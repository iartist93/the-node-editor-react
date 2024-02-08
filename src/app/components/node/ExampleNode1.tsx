import "../Socket/styles.css";
import { NodeComponentProps } from "@/app/components/node/utils";
import { useState } from "react";
import { Socket } from "@/app/components/Socket/Socket";
import { NumberSocket } from "@/app/components/Socket/NumberSocket";
import { ColorSocket } from "@/app/components/Socket/ColorSocket";
import { SliderSocket } from "@/app/components/Socket/SliderSocket";

export function ExampleNode1({ node }: NodeComponentProps) {
  const [value, setValue] = useState(node.data.value);

  return (
    <div className="flex flex-col relative py-3">
      {/*<NumberSocket value={40} />*/}
      {/*<NumberSocket value={40} />*/}
      <ColorSocket value={"#406d73"} name={"color"} />
      <SliderSocket value={0.3} min={0} max={1} name={"roughness"} />
    </div>
  );
}
