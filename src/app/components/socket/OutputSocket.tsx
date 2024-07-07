import './styles.css';
import { Socket } from '@/app/components/socket/Socket';

export function OutputSocket({ value, nodeId }) {
  return (
    <div className='no-drag flex flex-col relative px-4 my-6'>
      <div className='absolute right-4 top-[50%] -translate-y-[50%]'>
        <p className='text-black'>Result = {value}</p>
      </div>
      <Socket
        id={'2'}
        type={'output'}
        datatype={'number'}
        name='output'
        nodeId={nodeId}
        value={value}
        connections={[]}
      />
    </div>
  );
}
