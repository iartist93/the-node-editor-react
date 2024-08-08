import {useStore} from '@/app/store';
import {ConnectionData} from '../node/utils';
import './styles.css';
import {Socket} from '@/app/components/socket/Socket';
import {useEffect} from "react";

type OutputSlotType = {
    id: string;
    nodeId: string;
    value: number;
    name: string;

};

export function OutputSlot({socketData}) {
    const {id, nodeId, value, name, connections} = socketData;
    const updateSocket = useStore((store) => store.updateSocket);

    const onConnectionsChange = (connections: ConnectionData[]) => {
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
                name={name}
                nodeId={nodeId}
                value={value}
                connections={connections}
                onConnectionsChange={onConnectionsChange}
            />
        </div>
    );
}
