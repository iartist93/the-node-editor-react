import "./styles.css";
import React, {useState} from "react";
import {Socket} from "@/app/components/socket/Socket";
import cc from "classcat";

type ColorSocketProps = {
    id: string;
    nodeId: string;
    value: string;
    name: string;
    variant: string;
    onChange?: (value: string) => void;
};

export function RowColorSocket({
                                   id,
                                   nodeId,
                                   value,
                                   name,
                                   onChange,
                               }: ColorSocketProps) {
    const [color, setColor] = useState(value);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="no-drag flex justify-between items-center relative px-4 my-2 h-6">
            <div className="select-none pointer-events-none text-xs text-black font-bold">
                <p>{name}</p>
            </div>

            <div className="relative h-full">
                <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-32 h-full"
                />
                <p className="text-white text-xs absolute right-2 top-1">{color}</p>
            </div>
            <Socket id={id} nodeId={nodeId} type={"input"} datatype={"color"}/>
        </div>
    );
}
