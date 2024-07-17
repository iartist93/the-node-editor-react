import {NodeRenderer} from '@/app/components/node/NodeRenderer';
import {useStore} from '@/app/store';
import React from 'react';

export const NodeWrapper = () => {
    const nodes = useStore((store) => store.nodes);

    return (
        <div>
            {nodes.map((node, index) => {
                return <NodeRenderer key={index} node={node}/>;
            })}
        </div>
    );
};
