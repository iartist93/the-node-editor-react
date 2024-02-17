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

export const getSocketPosition = (nodeId: string, socketId: string) => {
  const el = document.getElementById(`${socketId}`);
  const bbox = el?.getBoundingClientRect();
  if (bbox) {
    return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
  }
  return undefined;
};
