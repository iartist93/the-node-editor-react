import '@/app/components/socket/styles.css';
import { NodeComponentProps } from '@/app/components/node/utils';
import { ColorSocket } from '@/app/components/socket/ColorSocket';
import { SliderSocket } from '@/app/components/socket/SliderSocket';

export function ExampleNode1({ node }: NodeComponentProps) {
  return (
    <div className='flex flex-col relative py-3'>
      <ColorSocket
        id={node.id + '-1'}
        nodeId={node.id}
        value={'#406d73'}
        name={'color'}
      />
      <SliderSocket
        id={node.id + '-2'}
        nodeId={node.id}
        value={0.3}
        min={0}
        max={1}
        name={'roughness'}
      />
    </div>
  );
}
