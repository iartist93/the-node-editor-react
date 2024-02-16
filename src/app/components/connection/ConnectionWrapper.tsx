import { Connection } from "@/app/components/connection/Connection";
import { useStore } from "@/app/store";

export function ConnectionWrapper() {
  const connections = useStore((store) => store.connections);

  return (
    <div className="w-screen h-screen relative pointer-events-none">
      <Connection
        sourceNodeId="1"
        sourceSocketId="1"
        targetNodeId="2"
        targetSocketId="2"
      />
      {connections.map((connection) => (
        <Connection
          key={connection.id}
          sourceNodeId={connection.sourceNodeId}
          sourceSocketId={connection.sourceSocketId}
          targetNodeId={connection.targetNodeId}
          targetSocketId={connection.targetSocketId}
        />
      ))}
    </div>
  );
}
