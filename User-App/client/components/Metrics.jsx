import React, { useState } from 'react'
import Stats from "./MetricTables/Stats"
import PubSub from "./MetricTables/PubSub"
import TopContainer from './MetricTables/TopContainer'
import Graph from './MetricTables/Graph'
import { Routes, Route } from 'react-router-dom'

function Metrics({ switcher }) {
  // const [count, setCount] = useState(0)
  


  return (
    <div id='left-side'>
      <div id='metrics'>
        <TopContainer />
          <iframe id='mgmt-api' style={{visibility: `${!switcher ? 'hidden' : 'visible'}`}} src="http://localhost:15672/#/" frameborder="0"></iframe>
          <div id='bottom-grid' style={{visibility: `${switcher ? 'hidden' : 'visible'}`}}>
            <Graph />
            <Graph />
            <Graph />
            <Graph />
            <Graph />
            <Graph />
          </div>
          <ul>
              <li>Hide binding labels unless you hover over the queue</li>
              <li>Possibly add secondary view between services not using exhcnage</li>
              <li>Make boxes on this side for metrics</li>
              <li>DONE When you click a node, it hides any nodes that that nodes edges aren't touching</li>
              <br></br>
            </ul>
          
          {/* <PubSub />
          <Stats /> */}
        </div>
    </div>
  )
}

export default Metrics