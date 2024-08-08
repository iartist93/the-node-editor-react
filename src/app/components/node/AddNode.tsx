import '@/app/components/socket/styles.css';
import {IOData, NodeComponentProps} from '@/app/components/node/utils';
import {SliderSocket} from '@/app/components/socket/SliderSocket';
import {OutputSlot} from '../socket/OutputSlot';

export function AddNode({node}: NodeComponentProps) {
    return (
        <div className='flex flex-col relative py-3'>
            <OutputSlot
                id={node.id + '-' + node.outputs.result.name}
                nodeId={node.id}
                value={node.outputs.result.value}
                name={node.outputs.result.name}
            />
            <SliderSocket
                socketData={node.inputs.x}
                min={0}
                max={10}
            />
            <SliderSocket
                socketData={node.inputs.y}
                min={0}
                max={10}
            />
        </div>
    );
}
