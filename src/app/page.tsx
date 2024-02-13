"use client";

import {useEffect} from "react";
import {NodeWrapper} from "@/app/components/node/NodeWrapper";
import {ConnectionWrapper} from "@/app/components/connection/ConnectionWrapper";
import {useStore} from "@/app/store";
import {nodes} from "@/app/example/data";

export default function Home() {
    const setNodes = useStore((store) => store.setNodes);

    useEffect(() => {
        setNodes(nodes);
    }, []);

    return (
        <main className="flex h-screen w-screen">
            <NodeWrapper/>
            <ConnectionWrapper/>
        </main>
    );
}
