import './styles.css';
import {Socket} from '@/app/components/socket/Socket';
import {useEffect, useMemo} from "react";
import {useGraph} from "../../hooks/useGraph";
import {Color} from "three";

// TODO: Need to fix the Prop type here
export function OutputSlot({socketData}) {
    const {id, nodeId, value, name, dataType, connections} = socketData;

    const {onOutputChange} = useGraph()

    const displayValue = useMemo(() => {
        if (typeof value === 'number') {
            return value.toFixed(2);
        } else if (typeof value === "object" && value instanceof Color) {
            return '#' + value.getHexString();
        }
        return value;
    }, [value]);

    useEffect(() => {
        onOutputChange(socketData, value);
    }, [value]);

    return (
        <div className='no-drag flex flex-col relative px-4 my-6'>
            <div className='absolute right-4 top-[50%] -translate-y-[50%]'>
                <p className='text-black'>
                    {name} <b>({displayValue})</b>
                </p>
            </div>
            <Socket
                id={id}
                type={'output'}
                dataType={dataType}
                name={name}
                nodeId={nodeId}
                value={value}
                connections={connections}
            />
        </div>
    );
}
