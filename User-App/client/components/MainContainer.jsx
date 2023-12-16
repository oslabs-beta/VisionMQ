import React, { useState } from 'react'
import FlowChart from './FlowChart'
import Metrics from './Metrics'

function MainContainer() {
  // const [count, setCount] = useState(0)

  return (
    <div id='main'>
      <Metrics />
        <FlowChart />
    </div>
  )
}

export default MainContainer