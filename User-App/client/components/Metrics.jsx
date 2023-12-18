import React, { useState } from 'react'
import Stats from "./MetricTables/Stats"
import PubSub from "./MetricTables/PubSub"

function Metrics() {
  // const [count, setCount] = useState(0)

  return (
    <div id='metrics'>
        <ul>
            <li>When you click a node, it hides any nodes that that nodes edges aren't touching</li>
            <li>Figure out how to make the minimap smaller</li>
            <li>Make boxes on this side for metrics</li>
            <li>Change handle orientation if possible</li>
            <br></br>
            <li>DONE Make a ServiceNode type that has handles on the bottom</li>
            <li>DONE Set up label on edges</li>
            <li>DONE Edit style of consumers</li>
            <li>DONE Make a Queue type node</li>
            <li>DONE Figure out how to change color of edges dynamically</li>
            <li>DONE Figure out how to create binding and how to identify </li>
            <li>DONE Figure out how to take parsed informaiton and make new nodes</li>
            <li>DONE Set up dynamic creation of nodes</li>
            <li>DONE Get X, Y values of a circle, divided by number of queues</li>
        </ul>
        <PubSub />
        <Stats />
    </div>
  )
}

export default Metrics