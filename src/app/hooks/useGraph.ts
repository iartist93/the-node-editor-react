import {useStore} from "@/app/store";
import nodeFunctions from "@/app/components/node/nodeFunctions"

export const useGraph = () => {

    const updateSocket = useStore(store => store.updateSocket)
    const findNode = useStore(store => store.findNode)

    const runGraph = (nodeId) => {
        const node = findNode(nodeId);
        const nodeType = node.type;
        const nodeFn = nodeFunctions[nodeType]
        const result = nodeFn(node.inputs);

        for (let socket in node.outputs) {
            updateSocket(nodeId, 'outputs', socket, result[socket])
        }
    }


    const onInputChange = (nodeId: string, socketName: string, value: any) => {
        updateSocket(nodeId, "inputs", socketName, value);
        runGraph(nodeId)
    }


    return {onInputChange, runGraph}
}
