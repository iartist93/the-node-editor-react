import { useStore } from "@/app/store";
import { type Position } from "@/app/components/node/utils";

// function to compare 2 Positions and return true if they are equal
export const isSamePosition = (a: Position, b: Position) => {
  return a.x === b.x && a.y === b.y;
};

export const getPath = (
  source: {
    x: number;
    y: number;
  },
  target: {
    x: number;
    y: number;
  },
) => {
  const distance = { x: target.x - source.x, y: target.y - source.y };
  const offsetY = 5;
  const offsetX = 3;
  const control1 = {
    x: source.x + distance.x / offsetX,
    y: source.y + offsetY,
  };
  const control2 = {
    x: target.x - distance.x / offsetX,
    y: target.y - offsetY,
  };
  return `M${source.x} ${source.y} C${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${target.x} ${target.y}`;
};

export const getSocketPosition = (
  socketId: string,
  editorScale: number,
): Position | null => {
  // get the editor DOMRect
  const canvas = document.getElementById("canvas");
  const canvasBBox = canvas?.getBoundingClientRect();
  const el = document.getElementById(`${socketId}`);
  const bbox = el?.getBoundingClientRect();

  if (canvasBBox && bbox) {
    return {
      x: (bbox.x + bbox.width / 2 - canvasBBox.x) / editorScale,
      y: (bbox.y + bbox.height / 2 - canvasBBox.y) / editorScale,
    };
  }
  return null;
};

export const getTransformedPosition = (
  position: Position,
  editorScale: number,
) => {
  const canvas = document.getElementById("canvas");
  const canvasBBox = canvas?.getBoundingClientRect();

  return canvasBBox
    ? {
        x: (position.x - canvasBBox.x) / editorScale,
        y: (position.y - canvasBBox.y) / editorScale,
      }
    : position;
};
