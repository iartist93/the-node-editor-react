import "@/app/components/socket/styles.css";
import { NodeComponentProps } from "@/app/components/node/utils";
import { useState } from "react";
import { SliderSocket } from "@/app/components/socket/SliderSocket";
import { RowColorSocket } from "@/app/components/socket/RowColorSocket";
import { useViewportStore } from "@/app/store/viewport";

export function PrincipleShader({ node }: NodeComponentProps) {
  const [value, setValue] = useState(node.data.value);

  const albedo = useViewportStore((s) => s.albedo);
  const roughness = useViewportStore((s) => s.roughness);
  const metalness = useViewportStore((s) => s.metalness);
  const opacity = useViewportStore((s) => s.opacity);

  const setAlbedo = useViewportStore((s) => s.setAlbedo);
  const setRoughness = useViewportStore((s) => s.setRoughness);
  const setMetallic = useViewportStore((s) => s.setMetallic);
  const setOpacity = useViewportStore((s) => s.setOpacity);

  return (
    <div className="flex flex-col relative py-3">
      <RowColorSocket
        id={node.id + "-albedo"}
        nodeId={node.id}
        value={`#${albedo.getHexString()}`}
        name={"color"}
        variant="row"
        onChange={(value) => setAlbedo(value)}
      />
      <SliderSocket
        id={node.id + "-roughness"}
        nodeId={node.id}
        value={roughness}
        min={0}
        max={1}
        name={"roughness"}
        onChange={(value) => setRoughness(value)}
      />
      <SliderSocket
        id={node.id + "-metallic"}
        nodeId={node.id}
        value={metalness}
        min={0}
        max={1}
        name={"metallic"}
        onChange={(value) => setMetallic(value)}
      />
      <SliderSocket
        id={node.id + "-opacity"}
        nodeId={node.id}
        value={opacity}
        min={0}
        max={1}
        name={"opacity"}
        onChange={(value) => setOpacity(value)}
      />
    </div>
  );
}
