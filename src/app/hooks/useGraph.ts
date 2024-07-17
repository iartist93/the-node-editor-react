import {useStore} from "@/app/store";

export const useGraph = () => {

    const updateSocket = useStore(store => store.updateSocket)

    const onInputChange = (nodeId: string, type: 'input' | 'output', socketName: string, value: any) => {
        updateSocket(nodeId, type, socketName, value);
    }

    return {onInputChange}
}
