// import { useState } from 'react'
import FlowChart from './FlowChart'
import Metrics from './Metrics'

function MainContainer() {
  // const [count, setCount] = useState(0)

  return (
    <div id='main'>
      <Metrics />
      <div id='chart'>
        <FlowChart />
      </div>
    </div>
  )
}

export default MainContainer