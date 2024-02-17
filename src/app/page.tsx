"use client";

import { useEffect } from "react";
import { NodeWrapper } from "@/app/components/node/NodeWrapper";
import { ConnectionWrapper } from "@/app/components/connection/ConnectionWrapper";
import { useStore } from "@/app/store";
import { nodes } from "@/app/example/data";

export default function Home() {
  const setNodes = useStore((store) => store.setNodes);
  const state = useStore((store) => [
    store.activeConnection,
    store.connections,
    // store.sockets,
  ]);

  useEffect(() => {
    setNodes(nodes);
  }, []);

  return (
    <main className="flex h-screen w-screen">
      <NodeWrapper />
      <ConnectionWrapper />
      <pre className="fixed top-0 right-0 h-screen overflow-auto">
        {JSON.stringify(state, null, 2)}
      </pre>
    </main>
  );
}
