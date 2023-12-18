import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
// const handleStyle = { left: 10 };
 
function ExchangeNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className='exchange-node'>
      <Handle style= { {top: '50%', visibility: 'hidden'} } type="target" position={Position.Top} />
      <div className='exchange-body'>
        <p>Exchange</p>
      </div>
      <Handle style= { {top: '50%', visibility: 'hidden'} } type="source" position={Position.Top} id="a" />
    </div>
  );
}

export default ExchangeNode