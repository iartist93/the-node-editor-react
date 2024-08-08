import '@/app/components/socket/styles.css';
import {NodeComponentProps} from '@/app/components/node/utils';
import {ColorSocket} from '@/app/components/socket/ColorSocket';
import {SliderSocket} from '@/app/components/socket/SliderSocket';

export function ExampleNode1({node}: NodeComponentProps) {
    return (
        <div className='flex flex-col relative py-3'>
            <ColorSocket
                socketData={node.inputs.color}
            />
            <SliderSocket
                socketData={node.inputs.roughness}
                min={0}
                max={1}
            />
        </div>
    );
}
