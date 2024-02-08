import { NodeData } from "@/app/example/data";
import { ColorNode } from "@/app/components/node/ColorNode";
import { NumberNode } from "@/app/components/node/NumberNode";
import React from "react";

export type NodeComponentProps = {
  node: NodeData;
};

export type NodeRendererProps = {
  node: NodeData;
};

type NodeTypes = {
  [key: string]: React.FC<{ node: NodeData }>;
};

export type SocketProps = {
  id: string;
  type: string;
  datatype: string;
};

type SocketColors = {
  [key: string]: string;
};

export const nodeTypes: NodeTypes = {
  color: ColorNode,
  number: NumberNode,
};

export const socketColors: SocketColors = {
  default: "#000",
  number: "#f39c12",
  color: "#e74c3c",
  boolean: "#3498db",
  string: "#9b59b6",
  object: "#2ecc71",
  array: "#1abc9c",
  function: "#e67e22",
};
