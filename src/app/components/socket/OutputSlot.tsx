import './styles.css';
import {Socket} from '@/app/components/socket/Socket';
import {useEffect} from "react";
import {useGraph} from "../../hooks/useGraph";

// TODO: Need to fix the Prop type here
export function OutputSlot({socketData}) {
    const {id, nodeId, value, name, connections} = socketData;

    const {onOutputChange} = useGraph()

    useEffect(() => {
        onOutputChange(socketData, value);
    }, [value]);

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
                dataType={'number'}
                name={name}
                nodeId={nodeId}
                value={value}
                connections={connections}
            />
        </div>
    );
}
