import './styles.css';
import React, {useMemo, useState} from 'react';
import {Socket} from '@/app/components/socket/Socket';
import {useGraph} from "../../hooks/useGraph";
import {Color} from "three";


//TODO: Need to fix the Prop type here
export function RowColorSocket({socketData}) {
    const {id, nodeId, value, name, connections} = socketData
    const {onInputChange} = useGraph()

    const convertColorToHex = (color: Color) => {
        if (typeof color === 'string') return color
        else if (typeof color === 'object' && color instanceof Color) {
            return '#' + color.getHexString();
        } else {
            return '#000000'
        }
    }

    const color = useMemo(() => convertColorToHex(value), [value])

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(socketData, new Color(e.target.value))
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
                dataType={'color'}
                value={color}
                name={name}
                connections={connections}
            />
        </div>
    );
}
