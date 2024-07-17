import {useStore} from '@/app/store';
import {ConnectionData} from '../node/utils';
import './styles.css';
import {Socket} from '@/app/components/socket/Socket';

type OutputSlotType = {
    id: string;
    nodeId: string;
    value: number;
    name: string;
};

export function OutputSlot({id, nodeId, value, name}: OutputSlotType) {
    const updateSocket = useStore((store) => store.updateSocket);

    const onConnectionsChange = (connections: ConnectionData[]) => {
        // console.log('connections changes for > OutputSocket ', name, connections);

        for (let connection of connections) {
            if (connection.inputSlot && connection.outputSlot) {
                connection.inputSlot.value = connection.outputSlot.value;
                updateSocket(connection.inputSlot.id, connection.inputSlot.value);
            }
        }
    };

    return (
        <div className='no-drag flex flex-col relative px-4 my-6'>
            <div className='absolute right-4 top-[50%] -translate-y-[50%]'>
                <p className='text-black'>
                    {name} = {value}
                </p>
            </div>
            <Socket
                id={id}
                type={'output'}
                datatype={'number'}
                name='output'
                nodeId={nodeId}
                value={value}
                connections={[]}
                onConnectionsChange={onConnectionsChange}
            />
        </div>
    );
}
