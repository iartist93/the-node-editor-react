"use client";

import { useEffect } from "react";
import { NodeWrapper } from "@/app/components/node/NodeWrapper";
import { ConnectionWrapper } from "@/app/components/connection/ConnectionWrapper";
import { useStore } from "@/app/store";
import { nodes } from "@/app/example/data";
import Editor from "@/app/components/Editor/Editor";
import Viewport from "@/app/components/Viewport/Viewport";
import { ConnectionTEMP } from "@/app/components/connection/ConnectionTEMP";

export default function Home() {
  const setNodes = useStore((store) => store.setNodes);
  const state = useStore((store) => store);

  useEffect(() => {
    setNodes(nodes);
  }, []);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-green-300">
      <Editor>
        <ConnectionWrapper />
        <NodeWrapper />
      </Editor>
      <Viewport></Viewport>

      {/*<ConnectionTEMP />*/}

      {
        <pre className="fixed top-0 right-0 h-screen overflow-auto select-none bg-slate-50/30 text-blue-950">
          {JSON.stringify(state, null, 2)}
        </pre>
      }
    </main>
  );
}
