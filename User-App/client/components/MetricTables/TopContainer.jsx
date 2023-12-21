import React, { useState } from 'react'
import Stats from "./Stats"
import PubSub from "./PubSub"

function TopContainer({ data, runProm }) {
  const [selected, setSelected] = useState('Overview')

  const select = (e) => {
    // console.log(e.target.innerText)
    setSelected(`${e.target.innerText}`)
  }

  return (
    <div id='top-container'>
      <div id='user-info'>
        <span>{`${data.user} • vhost: '${data.vhost}'`}</span>
        <span>{`${data.product_name}: ${data.product_version}`}</span>
      </div>
      <div className='divider'></div>
      <div id='rabbit-elements'>
        <PubSub queues={data.queues} bindings={data.bindings} select={select} selected={selected}/>
        <div className='vert-divider'></div>
        <Stats queues={data.queues} bindings={data.bindings} selected={selected} runProm={runProm}/>
      </div>
    </div>
  )
}

export default TopContainer