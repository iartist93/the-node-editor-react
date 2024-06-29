import "@/app/components/socket/styles.css";
import {NodeComponentProps} from "@/app/components/node/utils";
import {useState} from "react";
import {SliderSocket} from "@/app/components/socket/SliderSocket";
import {RowColorSocket} from "@/app/components/socket/RowColorSocket";
import {useViewportStore} from "@/app/store/viewport";
import {BooleanSocket} from "@/app/components/socket/BooleanSocket";

export function PrincipleShader({node}: NodeComponentProps) {
    const albedo = useViewportStore((s) => s.albedo);
    const roughness = useViewportStore((s) => s.roughness);
    const metalness = useViewportStore((s) => s.metalness);
    const opacity = useViewportStore((s) => s.opacity);
    const emissive = useViewportStore((s) => s.emissive);
    const emissiveIntensity = useViewportStore((s) => s.emissiveIntensity);
    const flatShading = useViewportStore((s) => s.flatShading);
    const wireframe = useViewportStore((s) => s.wireframe);
    const wireframeLinewidth = useViewportStore((s) => s.wireframeLinewidth);

    const setAlbedo = useViewportStore((s) => s.setAlbedo);
    const setRoughness = useViewportStore((s) => s.setRoughness);
    const setMetallic = useViewportStore((s) => s.setMetallic);
    const setOpacity = useViewportStore((s) => s.setOpacity);
    const setEmissive = useViewportStore((s) => s.setEmissive);
    const setEmissiveIntensity = useViewportStore((s) => s.setEmissiveIntensity);
    const setFlatShading = useViewportStore((s) => s.setFlatShading);
    const setWireframe = useViewportStore((s) => s.setWireframe);
    const setWireframeLinewidth = useViewportStore(
        (s) => s.setWireframeLinewidth,
    );

    const compute = () => {

    }
    
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

            <RowColorSocket
                id={node.id + "-emissive"}
                nodeId={node.id}
                value={`#${emissive.getHexString()}`}
                name={"emissive"}
                variant="row"
                onChange={(value) => setEmissive(value)}
            />

            <SliderSocket
                id={node.id + "-emissiveIntensity"}
                nodeId={node.id}
                value={emissiveIntensity}
                min={0}
                max={10}
                name={"emissiveIntensity"}
                onChange={(value) => setEmissiveIntensity(value)}
            />

            <BooleanSocket
                id={node.id + "-flatShading"}
                nodeId={node.id}
                value={flatShading}
                name={"flatShading"}
                onChange={(value) => setFlatShading(value)}
            />

            <BooleanSocket
                id={node.id + "-wireframe"}
                nodeId={node.id}
                value={wireframe}
                name={"wireframe"}
                onChange={(value) => setWireframe(value)}
            />

            <SliderSocket
                id={node.id + "-wireframeLinewidth"}
                nodeId={node.id}
                value={wireframeLinewidth}
                min={1}
                max={10}
                name={"wireframeLinewidth"}
                onChange={(value) => setWireframeLinewidth(value)}
            />
        </div>
    );
}
