import "./styles.css";
import {useState} from "react";
import {Socket} from "@/app/components/socket/Socket";
import cc from "classcat";

type SliderSocketProps = {
    id: string;
    nodeId: string;
    value: number;
    name: string;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
};

export function SliderSocket({
                                 id,
                                 nodeId,
                                 value,
                                 name,
                                 min = 0,
                                 max = 1,
                                 onChange,
                             }: SliderSocketProps) {
    const [val, setValue] = useState(value);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseFloat(e.target.value));
        if (onChange) {
            onChange(parseFloat(e.target.value));
        }
    };

    return (
        <div className="no-drag flex flex-col relative px-4 my-2">
            <div className="w-full h-6 relative rounded-md overflow-hidden">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={0.01}
                    value={val}
                    onChange={handleSliderChange}
                    className="slider w-full h-full bg-stone-300 outline-0 opacity-70 hover:opacity-100 "
                />

                <div
                    className="absolute top-0 left-0 bg-blue-600 pointer-events-none select-none h-full"
                    style={{
                        width: `${((val - min) / (max - min)) * 100}%`,
                    }}
                ></div>

                <p
                    className={cc([
                        "select-none pointer-events-none absolute left-2 top-[50%] -translate-y-[50%]  text-xs font-light",
                        {
                            "text-purple-200": val > min + (max - min) * 0.2,
                            "text-purple-950": val <= min + (max - min) * 0.2,
                        },
                    ])}
                >
                    {name}
                </p>

                <p
                    className={cc([
                        "select-none pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] text-xs font-bold",
                        {
                            "text-purple-200": val > min + (max - min) * 0.94,
                            "text-purple-950": val <= min + (max - min) * 0.94,
                        },
                    ])}
                >
                    {val}
                </p>
            </div>
            <Socket id={id} nodeId={nodeId} type={"input"} datatype={"number"}/>
        </div>
    );
}


// 5 - 10
// What's the 95th percentile of (5-10) ?
// (0 - 10) * 0.95 = 9.5
// (5 - 10) * 0.95 = 4.75