import '@/app/components/socket/styles.css';
import {NodeComponentProps} from '@/app/components/node/utils';
import {SliderSocket} from "@/app/components/socket/SliderSocket"
import {OutputSlot} from '../socket/OutputSlot';

export function AddNode({node}: NodeComponentProps) {

    return (
        <div className='flex flex-col relative py-3'>
            <OutputSlot
                socketData={node.outputs.result}
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
