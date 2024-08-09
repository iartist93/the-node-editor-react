import {useStore} from "@/app/store";
import nodeFunctions from "@/app/components/node/nodeFunctions"
import {SocketData} from "../components/node/utils";

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
    const onInputChange = (socketData: SocketData, newValue: any) => {
        updateSocket(socketData.nodeId, "inputs", socketData.name, newValue);
        runGraph(socketData.nodeId)
    }


    const onOutputChange = (socketData: SocketData, newValue: any) => {
        updateSocket(socketData.nodeId, "outputs", socketData.name, newValue);

        if (socketData.connections.length > 0) {
            onConnectionsChange(socketData.connections)
        }
    }


    const onConnectionsChange = (socketConnections: string[]) => {
        for (let connectionId of socketConnections) {
            const connection = connections.find(connection => connection.id === connectionId)
            if (!connection.inputSocket || !connection.outputSocket) return;
            const outputNode = nodes.find(node => node.id === connection.outputSocket.nodeId)
            const outputSocket = outputNode.outputs[connection.outputSocket.name]

            updateSocket(connection.inputSocket.nodeId, "inputs", connection.inputSocket.name, outputSocket.value)
            runGraph(connection.inputSocket.nodeId)
        }
    }


    return {onInputChange, onOutputChange, onConnectionsChange, runGraph}
}
