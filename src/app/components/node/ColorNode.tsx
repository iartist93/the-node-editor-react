import '@/app/components/socket/styles.css';
import {NodeComponentProps} from '@/app/components/node/utils';
import {ColorSocket} from '@/app/components/socket/ColorSocket';
import {OutputSlot} from "../socket/OutputSlot";

export function ColorNode({node}: NodeComponentProps) {
    return (
        <div className='flex flex-col relative py-3'>
            <OutputSlot socketData={node.outputs.color}/>
            <ColorSocket
                socketData={node.inputs.color}
            />
        </div>
    );
}