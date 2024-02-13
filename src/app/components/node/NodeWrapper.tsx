import {NodeRenderer} from "@/app/components/node/NodeRenderer";
import {useStore} from "@/app/store";

export function NodeWrapper() {
    const nodes = useStore((store) => store.nodes);

    return (
        <div>
            {nodes.map((node, index) => {
                // return <pre>{JSON.stringify(node, null, 2)}</pre>
                return <NodeRenderer key={index} node={node}/>;
            })}
        </div>
    );
}
