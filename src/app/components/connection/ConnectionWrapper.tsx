import {Connection} from "@/app/components/connection/Connection";
import {useStore} from "@/app/store";

export function ConnectionWrapper() {
    const connections = useStore((store) => store.connections);

    return (
        <div className="w-screen h-screen relative pointer-events-none ">
            <svg width="100%" height="100%" className="overflow-visible ">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#05a"/>
                        <stop offset="100%" stopColor="#0a5"/>
                    </linearGradient>
                </defs>

                {connections.map((connection) => (
                    <Connection
                        key={connection.id}
                        connectionData={connection}
                    />
                ))}
            </svg>
        </div>
    );
}
