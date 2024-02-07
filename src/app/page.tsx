"use client";

import { NodeWrapper } from "@/app/components/node/NodeWrapper";
import { nodes } from "@/app/example/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NodeWrapper nodes={nodes} />
    </main>
  );
}
