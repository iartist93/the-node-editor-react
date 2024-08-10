import '@/app/components/socket/styles.css';
import {NodeComponentProps} from '@/app/components/node/utils';
import {OutputSlot} from '../socket/OutputSlot';
import {RowColorSocket} from "../socket/RowColorSocket";
import {SliderSocket} from "../socket/SliderSocket";

export function MixNode({node}: NodeComponentProps) {

    return (
        <div className='flex flex-col relative py-3'>
            <OutputSlot
                socketData={node.outputs.result}
            />
            <SliderSocket
                socketData={node.inputs.fraction}
                min={0}
                max={1}
            />
            <RowColorSocket
                socketData={node.inputs.color1}
            />
            <RowColorSocket
                socketData={node.inputs.color2}
            />
        </div>
    );
}
