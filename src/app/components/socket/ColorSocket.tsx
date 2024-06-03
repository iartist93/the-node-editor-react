import "./styles.css";
import {useState} from "react";
import {Socket} from "@/app/components/socket/Socket";
import cc from "classcat";

type ColorSocketProps = {
    id: string;
    nodeId: string;
    value: string;
    height?: number;
    name: string;
};

export function ColorSocket({
                                id,
                                nodeId,
                                value,
                                name,
                                height = 200,
                            }: ColorSocketProps) {
    const [color, setColor] = useState(value);

    return (
        <div className="no-drag flex flex-col relative px-4 my-2">
            <div
                className="rounded-md overflow-hidden relative"
                style={{height: `${height}px`}}
            >
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-full"
                />
                )
                <div className="select-none pointer-events-none absolute left-2 top-2 text-xs text-sky-50">
                    <p className={cc(["font-light"])}>{name}</p>
                    <p className={cc(["font-bold"])}>{color}</p>
                </div>
            </div>
            <Socket id={id} nodeId={nodeId} type={"output"} datatype={"color"}/>
        </div>
    );
}
