import React, { useState } from 'react'
import FlowChart from './FlowChart'
import Configuration from './Configuration'

function MainContainer() {
  // const [count, setCount] = useState(0)

  return (
    <div id='main'>
      <Configuration />
      <FlowChart />
    </div>
  )
}

export default MainContainer