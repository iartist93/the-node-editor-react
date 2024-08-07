import {Connection} from "@/app/components/connection/Connection";
import {useStore} from "@/app/store";

export function ConnectionWrapper() {
    const connections = useStore((store) => store.connections);

    return (
        <div className="w-screen h-screen relative pointer-events-none ">
            <svg width="100%" height="100%" className="overflow-visible ">
                {connections.map((connection) => (
                    <Connection
                        key={connection.id}
                        id={connection.id}
                        outputNodeId={connection.outputNodeId}
                        outputSocketId={connection.outputSocketId}
                        inputNodeId={connection.inputNodeId}
                        inputSocketId={connection.inputSocketId}
                    />
                ))}
            </svg>
        </div>
    );
}
