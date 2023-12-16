import React, { useState } from 'react'
import Stats from "./MetricTables/Stats"
import PubSub from "./MetricTables/PubSub"

function Metrics() {
  // const [count, setCount] = useState(0)

  return (
    <div id='metrics'>
        <ul>
            <li>Figure out how to make the minimap smaller</li>
            <li>Edit style of consumers</li>
            <li>Set up dynamic creation of nodes</li>
            <li>Figure out how to take parsed informaiton and make new nodes</li>
            <li>Figure out how to create binding and how to identify </li>
            <li>Make boxes on this side for metrics</li>
            <li>DONE Get X, Y values of a circle, divided by number of queues</li>
            <li>DONE Make a ServiceNode type that has handles on the bottom<br></br>So that I left could be in and the right out</li>
            <li>DONE Set up label on edges</li>
            <li>DONE Make a Queue type node</li>
            <li>DONE Figure out how to change color of edges dynamically</li>
        </ul>
        <PubSub />
        <Stats />
    </div>
  )
}

export default Metrics