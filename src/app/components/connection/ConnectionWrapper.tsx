import { Connection } from "@/app/components/connection/Connection";

export function ConnectionWrapper() {
  return (
    <div>
      <Connection
        sourceNodeId="1"
        sourceSocketId="1"
        targetNodeId="2"
        targetSocketId="2"
      />
    </div>
  );
}
