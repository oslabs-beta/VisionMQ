import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
 
function QueueNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className='queue-node'>
      <Handle type="target" position={Position.Top} />
      <div className='queue-body'>
        <p>Queue</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default QueueNode