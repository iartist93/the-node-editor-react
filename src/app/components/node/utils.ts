import { ExampleNode1 } from "@/app/components/node/ExampleNode1";
import React from "react";
import { PrincipleShader } from "@/app/components/node/PrincipleShader";

export type Position = {
  x: number;
  y: number;
};

export type NodeComponentProps = {
  node: NodeData;
};

export type NodeRendererProps = {
  node: NodeData;
};

type NodeTypes = {
  [key: string]: React.FC<{ node: NodeData }>;
};

export type NodeData = {
  id: string;
  type: string;
  data: { [key: string]: any };
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
  datatype: string;
  connections: string[];
};

export type ConnectionData = {
  id: string;
  outputNodeId: string | null;
  outputSocketId: string | null;
  inputNodeId: string | null;
  inputSocketId: string | null;
};

type SocketColors = {
  [key: string]: string;
};

export const nodeTypes: NodeTypes = {
  custom1: ExampleNode1,
  shader: PrincipleShader,
};

export const socketColors: SocketColors = {
  default: "#000",
  // number: "#f39c12",
  // color: "#e74c3c",
  number: "#e1e1ec",
  color: "#dfdfe8",
  boolean: "#3498db",
  string: "#9b59b6",
  object: "#2ecc71",
  array: "#1abc9c",
  function: "#e67e22",
};
