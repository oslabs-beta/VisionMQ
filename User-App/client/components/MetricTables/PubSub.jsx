import React, { useState } from 'react'
function PubSub({queues, bindings, select, selected}) {
  // const [count, setCount] = useState(0)


  const queueSelectors = [<button onClick={select} className='queue-selector' style={{color: `${selected === 'Overview' ? '#FF6600' : 'rgb(82, 82, 82)'}`}} key={`Overview`}>{'Overview'}</button>];

  for(let i = 0; i < queues.length; i++){
    queueSelectors.push(<button onClick={select} className='queue-selector' style={{color: `${selected === queues[i].name ? '#FF6600' : 'rgb(82, 82, 82)'}`}} key={`${queues[i].name}`}>{queues[i].name}</button>)
  }


  return (
    <div id='pubsub'>
      {queueSelectors}
    </div>
  )
}

export default PubSub