import '@/app/components/socket/styles.css';
import { IOData, NodeComponentProps } from '@/app/components/node/utils';
import { useState } from 'react';
import { SliderSocket } from '@/app/components/socket/SliderSocket';
import { OutputSocket } from '../socket/OutputSocket';

export function AddNode({ node }: NodeComponentProps) {
  const [inputs, setInputs] = useState(node.data.inputs);
  const [outputs, setOutputs] = useState(node.data.outputs);

  const calculate = () => {
    const result = (inputs.x.value + inputs.y.value).toFixed(2);
    setOutputs({ result: { value: result } });
  };

  const onChange = (key: string, value: number) => {
    setInputs((prev: IOData) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          value,
        },
      };
    });
    calculate();
  };

  return (
    <div className='flex flex-col relative py-3'>
      <OutputSocket value={outputs.result.value} nodeId={node.id} />
      <SliderSocket
        id={node.id + '-1'}
        nodeId={node.id}
        value={inputs.x.value}
        min={0}
        max={10}
        name={inputs.x.name}
        onChange={onChange}
      />
      <SliderSocket
        id={node.id + '-2'}
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
