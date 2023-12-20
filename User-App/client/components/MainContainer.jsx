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

  // const [running, setRun] = useState(false)
  let intervalId = '';

  const stressTest = async () => {
    // console.log('button')
    if(intervalId !== ''){
      console.log('clear')
      clearTimeout(intervalId)
      intervalId = '';
      return;
    }

    const username = 'guest';
      const password = 'guest';
      const url = 'http://localhost:15672/api/definitions';

      const base64Credentials = btoa(`${username}:${password}`);

      await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json())
        .then(async res => {
          console.log(res)
          console.log('now on to the test...')

          const tester = () => {
            fetch('/roundrobin', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(res)
            })
            .then(res => res.json())
            .then(res => {
              console.log('back from server: ', res)
              intervalId = setTimeout(tester, 1000)
            })
          }

          tester();
        })
      // const parsedData = JSON.parse(data);
  }

  return (
    <div id='main'>
      <Configuration refresh={refresh} refreshed={refreshed} stressTest={stressTest} />
      <FlowChart refresh={refresh} refreshed={refreshed} stressTest={stressTest} />
    </div>
  )
}

export default MainContainer