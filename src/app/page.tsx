"use client";

import { useEffect } from "react";
import { NodeWrapper } from "@/app/components/node/NodeWrapper";
import { ConnectionWrapper } from "@/app/components/connection/ConnectionWrapper";
import { useStore } from "@/app/store";
import { nodes } from "@/app/example/data";
import Editor from "@/app/components/Editor";

export default function Home() {
  const setNodes = useStore((store) => store.setNodes);
  const state = useStore((store) => store);

  useEffect(() => {
    setNodes(nodes);
  }, []);

  return (
    <main className="flex h-screen w-screen">
      <Editor>
        <ConnectionWrapper />
        <NodeWrapper />
      </Editor>
      <pre className="fixed top-0 right-0 h-screen overflow-auto select-none text-white">
        {JSON.stringify(state, null, 2)}
      </pre>
    </main>
  );
}
