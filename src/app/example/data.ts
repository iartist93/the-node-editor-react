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
import {Color} from "three";

export const nodes: NodeData[] = [
    {
        id: '1',
        type: 'color',
        inputs: {
            color: {
                name: 'color',
                value: '#13ab17',
                dataType: 'color',
            },
            roughness: {
                name: 'roughness',
                value: 0.3,
                dataType: 'number',
            }
        },
        outputs: {
            color: {
                name: 'color',
                value: '#13ab17',
                dataType: 'color',
            },
            roughness: {
                name: 'roughness',
                value: 0.3,
                dataType: 'number',
            }
        },
        data: {},
        position: {
            x: 100,
            y: 100,
        },
    },
    {
        id: '2',
        type: 'color',
        inputs: {
            color: {
                name: 'color',
                value: '#520ccb',
                dataType: 'color',
            },
            roughness: {
                name: 'roughness',
                value: 0.3,
                dataType: 'number',
            }
        },
        outputs: {
            color: {
                name: 'color',
                value: '#520ccb',
                dataType: 'color',
            },
            roughness: {
                name: 'roughness',
                value: 0.3,
                dataType: 'number',
            }
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
        inputs: {
            albedo: {
                name: 'albedo',
                value: new Color(0.3, 0, 0),
                dataType: 'color',
            },
            roughness: {
                name: 'roughness',
                value: 0.5,
                dataType: 'number',
            },
            metalness: {
                name: 'metalness',
                value: 0.5,
                dataType: 'number',
            },
            opacity: {
                name: 'opacity',
                value: 1.0,
                dataType: 'number',
            },
            emissive: {
                name: 'emissive',
                value: new Color(0, 0, 0),
                dataType: 'color',
            },
            emissiveIntensity: {
                name: 'emissiveIntensity',
                value: 1.0,
                dataType: 'number',
            },
            flatShading: {
                name: 'flatShading',
                value: false,
                dataType: 'boolean',
            },
            wireframe: {
                name: 'wireframe',
                value: false,
                dataType: 'boolean',
            },
            wireframeLinewidth: {
                name: 'wireframeLinewidth',
                value: 1,
                dataType: 'number',
            },

        },
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
    {
        id: 'mix1',
        type: 'mix',
        inputs: {
            color1: {
                name: 'color1',
                value: new Color(0.3, 0, 0),
                dataType: 'color',
            },
            color2: {
                name: 'color2',
                value: new Color(0.3, 0, 0),
                dataType: 'color',
            },
            fraction: {
                name: 'fraction',
                value: 0.5,
                dataType: 'number',
            }
        },
        outputs: {
            result: {
                name: 'result',
                value: new Color(0.3, 0, 0),
                dataType: 'color',
            },
        },
        data: {},
        position: {
            x: 900,
            y: 900,
        },
    },
];
