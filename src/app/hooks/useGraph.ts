import {useStore} from "@/app/store";
import nodeFunctions from "@/app/components/node/nodeFunctions"

export const useGraph = () => {

    const updateSocket = useStore(store => store.updateSocket)
    const findNode = useStore(store => store.findNode)
    const connections = useStore(store => store.connections)
    const nodes = useStore(store => store.nodes)

    const runGraph = (nodeId: string) => {
        const node = findNode(nodeId);
        const nodeType = node.type;
        const nodeFn = nodeFunctions[nodeType]
        const result = nodeFn(node.inputs);

        for (let socket in node.outputs) {
            updateSocket(nodeId, 'outputs', socket, result[socket])
        }
    }
    /**
     *
     * when input socket value change -- update the socket value and run the graph
     * which will update the output socket value
     */
    const onInputChange = (nodeId: string, socketName: string, value: any) => {
        updateSocket(nodeId, "inputs", socketName, value);
        runGraph(nodeId)
    }

    const onConnectionsChange = (socketConnections: string[]) => {
        for (let connectionId of socketConnections) {
            const connection = connections.find(connection => connection.id === connectionId)

            if (!connection.inputNodeId || !connection.outputNodeId) return;

            const outputNode = nodes.find(node => node.id === connection.outputNodeId)
            const outputSocket = outputNode.outputs[connection.outputSocketName]

            updateSocket(connection.inputNodeId, "inputs", connection.inputSocketName, outputSocket.value)
            runGraph(connection.inputNodeId)
        }
    }


    return {onInputChange, onConnectionsChange, runGraph}
}
