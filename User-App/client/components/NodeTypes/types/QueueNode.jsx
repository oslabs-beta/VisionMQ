import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
 
function QueueNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className='queue-node'>
      <Handle type="target" position={Position.Right} />
      <div className='queue-body'>
        <p>Queue</p>
      </div>
      <Handle type="source" position={Position.Left} id="a" />
    </div>
  );
}

export default QueueNode