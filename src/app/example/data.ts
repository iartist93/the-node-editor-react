/*
type NodeProps = {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    unit: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    borderRadius: number;
    draggable: boolean;
    socketRadius: number;
    socketSpacing: number;
    headerHeight: number;
    inputSocketIds: string[];
    outputSocketIds: string[];
    inputs: number;
    outputs: number;
};
*/

import {NodeData} from '@/app/components/node/utils';

export const nodes: NodeData[] = [
    {
        id: '1',
        type: 'custom1',
        inputs: {
            color: {
                name: 'Color',
                value: '#13ab17',
                dataType: 'color',
            },
        },
        outputs: {
            result: {
                name: 'result',
                value: '#13ab17',
                dataType: 'color',
            },
        },
        data: {},
        position: {
            x: 100,
            y: 100,
        },
    },
    {
        id: '2',
        type: 'custom1',
        inputs: {
            color: {
                name: 'Color',
                value: '#520ccb',
                dataType: 'color',
            },
        },
        outputs: {
            result: {
                name: 'result',
                value: '#520ccb',
                dataType: 'color',
            },
        },
        data: {},
        position: {
            x: 300,
            y: 600,
        },
    },
    {
        id: '3',
        type: 'shader',
        inputs: {},
        outputs: {},
        data: {},
        position: {
            x: 600,
            y: 100,
        },
    },
    {
        id: '4',
        type: 'add',
        inputs: {
            x: {
                name: 'x',
                value: 1,
                dataType: 'number',

            },
            y: {
                name: 'y',
                value: 2,
                dataType: 'number',
            },
        },
        outputs: {
            result: {
                name: 'result',
                value: 3,
                dataType: 'number',
            },
        },
        position: {
            x: 500,
            y: 800,
        },
        data: {},
    },
    {
        id: '5',
        type: 'add',
        inputs: {
            x: {
                name: 'x',
                value: 1,
                dataType: 'number',
            },
            y: {
                name: 'y',
                value: 2,
                dataType: 'number',
            },
        },
        outputs: {
            result: {
                name: 'result',
                value: 3,
                dataType: 'number',
            },
        },
        data: {},
        position: {
            x: 700,
            y: 400,
        },
    },
];
