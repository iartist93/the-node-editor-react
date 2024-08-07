'use client';

import {useEffect} from 'react';
import {NodeWrapper} from '@/app/components/node/NodeWrapper';
import {ConnectionWrapper} from '@/app/components/connection/ConnectionWrapper';
import {useStore} from '@/app/store';
import {nodes} from '@/app/example/data';
import Editor from '@/app/components/Editor/Editor';
import Viewport from '@/app/components/Viewport/Viewport';


export default function Home() {
    const setNodes = useStore((store) => store.setNodes);
    const state = useStore((store) => store);

    const buildSocketData = () => {
        nodes.map((node) => {
            for (let key in node.inputs) {
                const socket = node.inputs[key];
                socket.id = node.id + "-" + key;
                socket.nodeId = node.id;
                socket.type = "input";
                socket.connection = [];
            }

            for (let key in node.outputs) {
                const socket = node.outputs[key];
                socket.id = node.id + "-" + key;
                socket.nodeId = node.id;
                socket.type = "output";
                socket.connection = [];
            }

            return node;
        })
    }


    useEffect(() => {
        buildSocketData();
        setNodes(nodes);
    }, []);

    return (
        <main className='flex h-screen w-screen overflow-hidden '>
            <Editor>
                <ConnectionWrapper/>
                <NodeWrapper/>
            </Editor>
            <Viewport></Viewport>

            {
                <pre className='fixed top-0 right-0 h-screen overflow-auto select-none bg-slate-50/30 text-blue-950'>
          {JSON.stringify(state, null, 2)}
        </pre>
            }
        </main>
    );
}
