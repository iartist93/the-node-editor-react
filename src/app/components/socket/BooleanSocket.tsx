import "./styles.css";
import {useState} from "react";
import {Socket} from "@/app/components/socket/Socket";
import cc from "classcat";

type BooleanSocketProps = {
    id: string;
    nodeId: string;
    value: boolean;
    name: string;
    onChange?: (value: boolean) => void;
};

export function BooleanSocket({
                                  id,
                                  nodeId,
                                  value,
                                  name,
                                  onChange,
                              }: BooleanSocketProps) {
    const [socketValue, setSocketValue] = useState(value);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocketValue(e.target.checked);
        if (onChange) {
            onChange(e.target.checked);
        }
    };

    return (
        <div className="no-drag flex justify-between items-center relative px-4 my-2 h-6">
            <div className="select-none pointer-events-none text-xs text-black font-bold">
                <p>{name}</p>
            </div>

            <input
                type="checkbox"
                checked={socketValue}
                onChange={handleColorChange}
                className="w-4 h-4"
            />
            <Socket id={id} nodeId={nodeId} type={"output"} datatype={"color"} value={socketValue}/>
        </div>
    );
}
