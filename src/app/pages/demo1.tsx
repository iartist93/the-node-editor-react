import { useDemoStore } from '../store/demo';

export const Demo1 = () => {
  const updateSocketValue = useDemoStore((store) => store.updateSocketValue);
  const nodes = useDemoStore((store) => store.nodes);

  const handleUpdateSocket = () => {
    updateSocketValue(1, 'inputs', 'x', 1330);
  };

  return (
    <div className='overflow-auto min-h-screen'>
      <button onClick={handleUpdateSocket}>Update</button>
      <div>
        <h1>Demo1 page</h1>
        {nodes.map((node) => (
          <div key={node.id} className='w-96 bg-red-300 m-4 p-4'>
            <pre>{JSON.stringify(node, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};
