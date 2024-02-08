"use client";

import { NodeWrapper } from "@/app/components/node/NodeWrapper";
import { nodes } from "@/app/example/data";
import { ConnectionWrapper } from "@/app/components/connection/ConnectionWrapper";

export default function Home() {
  return (
    <main className="flex h-screen w-screen">
      <NodeWrapper nodes={nodes} />
      <ConnectionWrapper />
    </main>
  );
}
