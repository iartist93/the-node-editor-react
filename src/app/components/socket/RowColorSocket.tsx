import './styles.css';
import React, {useState} from 'react';
import {Socket} from '@/app/components/socket/Socket';
import {useGraph} from "../../hooks/useGraph";
import {Color} from "three";


//TODO: Need to fix the Prop type here
export function RowColorSocket({socketData}) {
    const {id, nodeId, value, name, connections} = socketData

    console.log("color = ", value, typeof value)

    const convertColorToHex = (color: Color) => {
        if (typeof color === 'string') return color
        else if (typeof color === 'object' && color instanceof Color) {
            return '#' + color.getHexString();
        } else {
            return '#000000'
        }
    }

    const [color, setColor] = useState(convertColorToHex(value))

    const {onInputChange} = useGraph()
    
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("color changed ", e.target.value)
        setColor(e.target.value);
        onInputChange(nodeId, name, new Color(e.target.value))
    };

    return (
        <div className='no-drag flex justify-between items-center relative px-4 my-2 h-6'>
            <div className='select-none pointer-events-none text-xs text-black font-bold'>
                <p>{name}</p>
            </div>

            <div className='relative h-full'>
                <input
                    type='color'
                    value={color}
                    onChange={handleColorChange}
                    className='w-32 h-full'
                />
                <p className='text-white text-xs absolute right-2 top-1'>{color}</p>
            </div>
            <Socket
                id={id}
                nodeId={nodeId}
                type={'input'}
                datatype={'color'}
                value={color}
                name={name}
                connections={connections}
            />
        </div>
    );
}
