import {useStore} from "@/app/store";
import nodeFunctions from "@/app/components/node/nodeFunctions"

export const useGraph = () => {

    const updateSocket = useStore(store => store.updateSocket)
    const findNode = useStore(store => store.findNode)

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

    const onConnectionsChange = (connections: string[]) => {

        console.log("connections", connections)

        for (let connectionId of connections) {
            const connection = useStore.getState().connections[connectionId];
            const outputSocket = useStore.getState().nodes[connection.outputNodeId].outputs[connection.outputSocketName];

            console.log("outputSocket", outputSocket)
            console.log("connection", connection)

            updateSocket(connection.inputNodeId, "inputs", connection.inputSocketName, outputSocket.value)
            runGraph(connection.inputNodeId)
        }
    }


    return {onInputChange, onConnectionsChange, runGraph}
}
