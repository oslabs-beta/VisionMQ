import React, { useState } from 'react'
import Stats from "./Stats"
import PubSub from "./PubSub"

function TopContainer({ data }) {
  // const [count, setCount] = useState(0)

  return (
    <div id='top-container'>
      <div id='user-info'>
        <span>{`${data.user} • vhost: '${data.vhost}'`}</span>
        <span>{`${data.product_name}: ${data.product_version}`}</span>
      </div>
      <div className='divider'></div>
      <div id='rabbit-elements'>
        <PubSub queues={data.queues} bindings={data.bindings} />
        <div className='vert-divider'></div>
        <Stats />
      </div>
    </div>
  )
}

export default TopContainer