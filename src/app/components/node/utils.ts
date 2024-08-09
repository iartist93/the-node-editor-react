import {ColorNode} from '@/app/components/node/ColorNode';
import React from 'react';
import {PrincipleShader} from '@/app/components/node/PrincipleShader';
import {AddNode} from '@/app/components/node/AddNode';

export type Position = {
    x: number;
    y: number;
};

type NodeTypes = {
    [key: string]: React.FC<{ node: NodeData }>;
};

export type NodeComponentProps = {
    node: NodeData;
};

export type IOData = {
    [key: string]: any;
};

export type NodeData = {
    id: string;
    type: string;
    inputs: IOData;
    outputs: IOData;
    data: {
        [key: string]: any;
    };
    position: {
        x: number;
        y: number;
    };
    dragging?: false; // TODO: don't add this we it's a state variable only
};

export type SocketData = {
    id: string;
    nodeId: string;
    type: string;
    dataType: string;
    connections: string[];
    value: any;
    name: string;
};

export type ConnectionData = {
    id: string;
    inputSocket: SocketData | null;
    outputSocket: SocketData | null;
};

type SocketColors = {
    [key: string]: string;
};

export const nodeTypes: NodeTypes = {
    color: ColorNode,
    shader: PrincipleShader,
    add: AddNode,
};

export const socketColors: SocketColors = {
    default: '#000',
    // number: "#f39c12",
    // color: "#e74c3c",
    number: '#e1e1ec',
    color: '#dfdfe8',
    boolean: '#3498db',
    string: '#9b59b6',
    object: '#2ecc71',
    array: '#1abc9c',
    function: '#e67e22',
};
