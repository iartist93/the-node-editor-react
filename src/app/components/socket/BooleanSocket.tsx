import "./styles.css";
import {Socket} from "@/app/components/socket/Socket";
import {useGraph} from "../../hooks/useGraph";


export function BooleanSocket({socketData}) {
    const {id, nodeId, value, name, dataType, connections} = socketData
    const {onInputChange} = useGraph()

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(socketData, parseFloat(e.target.value))
    };

    return (
        <div className="no-drag flex justify-between items-center relative px-4 my-2 h-6">
            <div className="select-none pointer-events-none text-xs text-black font-bold">
                <p>{name}</p>
            </div>
            <input
                type="checkbox"
                checked={value}
                onChange={handleColorChange}
                className="w-4 h-4"
            />
            <Socket
                id={id}
                nodeId={nodeId}
                type={"input"}
                dataType={dataType}
                value={value}
                connections={connections}/>
        </div>
    );
}
