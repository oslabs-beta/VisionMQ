import React, { useState } from 'react'
function PubSub({queues, bindings}) {
  // const [count, setCount] = useState(0)

  const queueSelectors = [];

  for(let i = 0; i < queues.length; i++){
    queueSelectors.push(<div className='queue-selector' key={`${queues.name}`}>{queues[i].name}</div>)
  }

  return (
    <div id='pubsub'>
      {queueSelectors}
    </div>
  )
}

export default PubSub