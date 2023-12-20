import React, { useState } from 'react'
import FlowChart from './FlowChart'
import Configuration from './Configuration'

function MainContainer() {
  // const [count, setCount] = useState(0)

  const [refreshed, setRefresh] = useState([])
  const refresh = () => {
    console.log('refreshed')
    setRefresh([])
  }

  const [running, setRun] = useState(false)

  return (
    <div id='main'>
      <Configuration refresh={refresh} refreshed={refreshed} stressTest={{running: running}} />
      <FlowChart refresh={refresh} refreshed={refreshed} stressTest={{running: running}} />
    </div>
  )
}

export default MainContainer