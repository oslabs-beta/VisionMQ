import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
 
function ServiceNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  //style={{ left: 150 }}
  return (
    <div className='service-node'>
      <Handle id='in' type="target" position={Position.Top} />
      {/* <div className='service-body'>
        <p>Micro</p>
      </div> */}
      <Handle id='out' type="source" position={Position.Bottom} />
    </div>
  );
}

export default ServiceNode