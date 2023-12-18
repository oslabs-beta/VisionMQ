import React, { useCallback } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
 
 
function QueueNode({data}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const handles = [];
  const fraction = 100/data.offset

  for(let i = 1; i <= data.offset; i++){
    handles.push(<Handle type="target" style={{left: i*fraction - fraction/2 }} position={Position.Bottom} id={`${i}`} />)
  }

  const preview = () => {
    
  }

  const nothing = () => {

  }

  // console.log(data)
 
  return (
    <div className='queue-node' id={data.name} onClick={() => data.isolate(data.name)} onMouseEnter={preview}>
      {handles}
      <div className='queue-body'>
        <p className='queue-name'>{data.name}</p>
      </div>
      <Handle type="source" position={Position.Top} id="a" />
    </div>
  );
}

export default QueueNode