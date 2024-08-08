import '@/app/components/socket/styles.css';
import {SliderSocket} from '@/app/components/socket/SliderSocket';
import {RowColorSocket} from '@/app/components/socket/RowColorSocket';
import {BooleanSocket} from '@/app/components/socket/BooleanSocket';

export function PrincipleShader({node}: NodeComponentProps) {
    // TODO: We don't need to define each socket manually --- we can check the node.inputs and outputs to construct the UI
    return (
        <div className='flex flex-col relative py-3'>
            <RowColorSocket
                socketData={node.inputs.albedo}
                name={'color'}
                variant='row'
            />

            <SliderSocket
                socketData={node.inputs.roughness}
                min={0}
                max={1}
            />

            <SliderSocket
                socketData={node.inputs.metalness}
                min={0}
                max={1}
            />

            <SliderSocket
                socketData={node.inputs.opacity}
                min={0}
                max={1}
            />

            <RowColorSocket
                socketData={node.inputs.emissive}
                variant='row'
            />

            <SliderSocket
                socketData={node.inputs.emissiveIntensity}
                min={0}
                max={10}
            />

            <BooleanSocket
                socketData={node.inputs.flatShading}
            />

            <BooleanSocket
                socketData={node.inputs.wireframe}
            />

            <SliderSocket
                socketData={node.inputs.wireframeLinewidth}
                min={1}
                max={10}
            />
        </div>
    );
}
