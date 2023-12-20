import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
// const handleStyle = { left: 10 };
 
function ExchangeNode({data}) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className='exchange-node' onClick={() => data.refresh()}>
      <Handle style= { {top: '50%', visibility: 'hidden'} } type="target" position={Position.Top} />
      <div className='exchange-body' style={{textAlign: 'center'}}>
        <p>exchange:<br></br><i>{data.name}</i></p>
      </div>
      <Handle style= { {top: '50%', visibility: 'hidden'} } type="source" position={Position.Top} id="a" />
    </div>
  );
}

export default ExchangeNode