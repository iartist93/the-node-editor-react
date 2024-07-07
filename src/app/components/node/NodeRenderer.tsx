import '@/app/components/socket/styles.css';
import {
  NodeRendererProps,
  nodeTypes,
  type Position,
} from '@/app/components/node/utils';
import { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { drag } from 'd3-drag';
import { useStore } from '@/app/store';
import { hasParentClass } from '@/app/utils';

export function NodeRenderer({ node }: NodeRendererProps) {
  const NodeComponent = nodeTypes[node.type];
  const nodeRef = useRef<HTMLDivElement>(null);
  const previousPosition = useRef<Position>({ x: 0, y: 0 });
  const updateNodePosition = useStore((store) => store.updateNodePosition);
  const editorScale = useStore((store) => store.editorScale);

  const getEventPosition = (event: MouseEvent): Position => {
    const x = event.x;
    const y = event.y;
    return { x, y };
  };

  const calculateNewPosition = (position: Position) => {
    const prevPosition = previousPosition.current;

    const diff = {
      x: position.x - prevPosition.x,
      y: position.y - prevPosition.y,
    };

    return {
      x: node.position.x + diff.x / editorScale,
      y: node.position.y + diff.y / editorScale,
    };
  };

  // NOTE: if we print prevPossition using useState inside useEffect it will work, but inside the event handler won't
  const dragInstance = drag()
    .on('start', (event) => {
      previousPosition.current = getEventPosition(event);
    })
    .on('drag', (event) => {
      const position = getEventPosition(event);
      const newPosition = calculateNewPosition(position);
      updateNodePosition(node.id, newPosition, true);
    })
    .on('end', (event) => {
      const position = getEventPosition(event);
      const newPosition = calculateNewPosition(position);
      updateNodePosition(node.id, newPosition, false);
    })
    .filter((event: MouseEvent) => {
      const target = event.target as HTMLElement;
      return !hasParentClass(event, 'no-drag');
    });

  useEffect(() => {
    const nodeSelection = select(nodeRef.current);
    nodeSelection.call(dragInstance);
  }, [dragInstance]);

  return (
    <div
      ref={nodeRef}
      tabIndex={0}
      className='no-pan node-renderer opacity-90 bg-white border-2 border-stone-200 rounded-2xl select-none w-64 flex flex-col shadow-lg focus:border-green-500 focus:shadow-xl'
      style={{
        position: 'absolute',
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className='border-b-2 border-stone-200 p-4 font-medium h-12'>
        <h1 className='text-slate-700'>{node.type}</h1>
      </div>
      <div className='flex flex-col flex-1 '>
        <NodeComponent node={node} />
      </div>
    </div>
  );
}
