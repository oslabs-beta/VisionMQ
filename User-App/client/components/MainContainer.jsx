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
  const [runProm, setProm] = useState(true)

  // const [running, setRun] = useState(false)
  let intervalId = '';

  const stressTest = async (input) => {
    // clearTimeout(intervalId)
    
    // console.log('button')
    if(intervalId !== ''){
      setProm(false);
      console.log('clear')
      intervalId = '';
      return;
    }

    setProm(true)

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
          const { exchanges, bindings } = res;

          console.log('this is it', input);
          const target = input === '' ? 100 : +input
          const toSend = {
            rabbitAddress: 'amqp://localhost',
            exchanges,
            bindings,
            target: target
          }

          const tester = () => {
            fetch('/roundrobin', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(toSend)
            })
            .then(res => res.json())
            .then(res => {
              console.log('tester back from server: ', res)
              // clearInterval(intervalId)  
              if(runProm) intervalId = setTimeout(tester, 1000)
            })
          }

          tester();
        })
      // const parsedData = JSON.parse(data);
  }

  return (
    <div id='main'>
      <Configuration refresh={refresh} refreshed={refreshed} stressTest={stressTest} runProm={runProm}/>
      <FlowChart refresh={refresh} refreshed={refreshed} stressTest={stressTest} />
    </div>
  )
}

export default MainContainer