import './styles.css';
import {Socket} from '@/app/components/socket/Socket';
import cc from 'classcat';
import {useGraph} from "../../hooks/useGraph";
import {useMemo} from "react";


//TODO: Need to fix the Prop type here
export function SliderSocket({min = 0, max = 1, socketData}) {
    const {id, nodeId, name, value, connections} = socketData;
    const {onInputChange} = useGraph()

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(socketData, parseFloat(e.target.value))
    };

    const disabled = useMemo(() => connections.length > 0, [connections])

    return (
        <div className='no-drag flex flex-col relative px-4 my-2'>

            {disabled &&
                <div className="h-6">
                    <p
                        className={cc([
                            'select-none pointer-events-none absolute text-xs font-bold text-black'
                        ])}
                    >
                        {name}
                    </p>
                </div>
            }


            {!disabled &&
                <div className='w-full h-6 relative rounded-md overflow-hidden'>
                    <input
                        type='range'
                        min={min}
                        max={max}
                        step={0.01}
                        value={value}
                        onChange={handleSliderChange}
                        className='slider w-full h-full bg-stone-300 outline-0 opacity-70 hover:opacity-100 disabled:bg-transparent'
                    />

                    <div
                        className='absolute top-0 left-0 bg-blue-600 pointer-events-none select-none h-full'
                        style={{
                            width: `${((value - min) / (max - min)) * 100}%`,
                        }}
                    />


                    <p
                        className={cc([
                            'select-none pointer-events-none absolute left-2 top-[50%] -translate-y-[50%] text-xs font-light',
                            {
                                'text-purple-200': value > min + (max - min) * 0.2 && !disabled,
                                'text-purple-950': value <= min + (max - min) * 0.2 && !disabled,
                            },
                        ])}
                    >
                        {name}
                    </p>

                    <p
                        className={cc([
                            'select-none pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] text-xs font-bold',
                            {
                                'text-purple-200': value > min + (max - min) * 0.94,
                                'text-purple-950': value <= min + (max - min) * 0.94,
                            },
                        ])}
                    >
                        {value}
                    </p>
                </div>
            }


            <Socket
                id={id}
                nodeId={nodeId}
                type={'input'}
                dataType={'number'}
                name={name}
                value={value}
                connections={connections}
            />
        </div>
    );
}
