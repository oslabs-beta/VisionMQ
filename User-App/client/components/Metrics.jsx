import React, { useState, useEffect } from 'react'
import TopContainer from './MetricTables/TopContainer'
import Graph from './MetricTables/Graph'
import { Routes, Route } from 'react-router-dom'


function Metrics({ switcher, refreshed }) {
  const [data, setData] = useState({
    product_name: '',
    product_version: '',
    user: '',
    vhost: '',
    queues: [],
    bindings: [],
  })


  useEffect( () => {

      const username = 'guest';
      const password = 'guest';
      const url = 'http://localhost:15672/api/definitions';

      const base64Credentials = btoa(`${username}:${password}`);

      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        console.log('THIS IS THE RESPONSE FROM MANAGEMENT API', res);
        console.log(res.product_name,
        res.product_version,
          res.users[0].name,
          res.vhosts[0].name)
        setData({
          product_name: res.product_name,
          product_version: res.product_version,
          user: res.users[0].name,
          vhost: res.vhosts[0].name,
          queues: res.queues,
          bindings: res.bindings
        })
        })

    }, [refreshed])
  


  return (
    <div id='left-side'>
      <div id='metrics'>
        <TopContainer data={data}/>
          <iframe id='mgmt-api' style={{visibility: `${!switcher ? 'hidden' : 'visible'}`}} src="http://localhost:15672/#/" frameBorder="0"></iframe>
          <div id='bottom-grid' style={{visibility: `${switcher ? 'hidden' : 'visible'}`}}>
            <Graph />
          </div>
          {/* <ul>
              <li>Hide binding labels unless you hover over the queue, and display that nodes data</li>
              <li>Make page refresh and adjust other nodes when new ones are added</li>
              <li>Make boxes on this side for metrics</li>
              <li>eh Possibly add secondary view between services not using exhcnage</li>
              <li>DONE When you click a node, it hides any nodes that that nodes edges aren't touching</li>
              <br></br>
            </ul> */}
        </div>
    </div>
  )
}

export default Metrics