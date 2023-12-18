import React, { useState } from 'react'
import Stats from "./MetricTables/Stats"
import PubSub from "./MetricTables/PubSub"
import TopContainer from './MetricTables/TopContainer'
import Graph from './MetricTables/Graph'

function Metrics() {
  // const [count, setCount] = useState(0)

  return (
    <div id='metrics'>
      <div id='header'>
        VisionMQ x RabbitMQ
      </div>
        <TopContainer />
        {/* <ul>
            <li>When you click a node, it hides any nodes that that nodes edges aren't touching</li>
            <li>Possibly add secondary view between services not using exhcnage</li>
            <li>Make boxes on this side for metrics</li>
            <br></br>
          </ul> */}
        <div id='bottom-grid'>
          <Graph />
          <Graph />
          <Graph />
          <Graph />
          <Graph />
          <Graph />
        </div>
        {/* <PubSub />
        <Stats /> */}
    </div>
  )
}

export default Metrics