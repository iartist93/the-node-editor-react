import '@/app/components/socket/styles.css';
import {IOData, NodeComponentProps} from '@/app/components/node/utils';
import {useState} from 'react';
import {SliderSocket} from '@/app/components/socket/SliderSocket';
import {OutputSlot} from '../socket/OutputSlot';

export function AddNode({node}: NodeComponentProps) {
    const [inputs, setInputs] = useState(node.inputs);
    const [outputs, setOutputs] = useState(node.outputs);

    const calculate = () => {
        const result = (inputs.x.value + inputs.y.value).toFixed(2);
        setOutputs({result: {value: result}});
    };

    const onChange = (name: string, value: number) => {
        setInputs((prev: IOData) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value,
                },
            };
        });
        calculate();
    };

    return (
        <div className='flex flex-col relative py-3'>
            <OutputSlot
                id={node.id + '-' + outputs.result.name}
                nodeId={node.id}
                value={outputs.result.value}
                name={outputs.result.name}
            />
            <SliderSocket
                id={node.id + '-' + inputs.x.name}
                nodeId={node.id}
                value={inputs.x.value}
                min={0}
                max={10}
                name={inputs.x.name}
                onChange={onChange}
            />
            <SliderSocket
                id={node.id + '-' + inputs.y.name}
                nodeId={node.id}
                value={inputs.y.value}
                min={0}
                max={10}
                name={inputs.y.name}
                onChange={onChange}
            />
        </div>
    );
}
