import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
const handleStyle = { left: 10 };
 
function ExchangeNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className='exchange-node'>
      <Handle type="target" position={Position.Top} />
      <div className='exchange-body'>
        <p>in</p>
        <p>Exchange</p>
        <p>out</p>
        {/* <label htmlFor="text">Exchange</label> */}
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      /> */}
    </div>
  );
}

export default ExchangeNode