import '@/app/components/socket/styles.css';
import {NodeComponentProps} from '@/app/components/node/utils';
import {SliderSocket} from "@/app/components/socket/SliderSocket"
import {OutputSlot} from '../socket/OutputSlot';

export function FloatNode({node}: NodeComponentProps) {

    return (
        <div className='flex flex-col relative py-3'>
            <OutputSlot
                socketData={node.outputs.result}
            />
            <SliderSocket
                socketData={node.inputs.float}
                min={0}
                max={1}
            />
        </div>
    );
}
