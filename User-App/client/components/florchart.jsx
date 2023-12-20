// import Stats from "./MetricTables/Stats"
// import PubSub from "./MetricTables/PubSub"
// import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import TopContainer from './MetricTables/TopContainer'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Metrics({ switcher }) {
  const [data, setData] = useState({
    product_name: '',
    product_version: '',
    user: '',
    vhost: '',
  })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let lines = []
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          console.log(res.queues)
          for(let queue of res.queues){
            console.log(queue.name)
            lines.push(<Line type='monotone' stroke='red' dataKey={queue.name}/>)
          }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        setData({
          product_name: res.product_name,
          product_version: res.product_version,
          user: res.users[0].name,
          vhost: res.vhosts[0].name,
        })
        })
        console.log('THESE ARE THE LINES', lines)
    }, [])
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [lineData,setLineData] = useState([{time:0,InvQueue: 20,AppQueue:20,BillQueue:20,AuthQueue:20},{time:0,InvQueue: 10,AppQueue:10,BillQueue:10,AuthQueue:10}])
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const queues = {}
// Function used to calculate the rate of the
const getRate = (prev,current) => {
    if(current - prev <= 0) return 0
    return current - prev
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages');
        const response = await request.json();
        const result = response.data.result;
        // Create a new array with the updated data
        const updatedInfo = lineData.map(entry => ({ ...entry })); // Create a shallow copy
        // Find the entry with the same timestamp or add a new one
        const existingEntry = updatedInfo.find(entry => entry.time === new Date().toLocaleTimeString());
        if (existingEntry) {
          // Update the existing entry
          result.forEach(queue => {
            let queueName = queue.metric.queue;
            if (!queueName) queueName = 'TotalOfQueues';
            let messageCount = Number(queue.value[1]);
            existingEntry[queueName] = messageCount;
            if (Object.keys(queues).includes(queueName)) {
              queues[queueName].PREVIOUSMESSAGES = queues[queueName].CURRENTMESSAGES;
              queues[queueName].CURRENTMESSAGES = messageCount;
              queues[queueName].RATE = getRate(queues[queueName].PREVIOUSMESSAGES, queues[queueName].CURRENTMESSAGES);
            } else {
              const props = {
                PREVIOUSMESSAGES: 0,
                CURRENTMESSAGES: messageCount,
                RATE: messageCount,
                active: true
              };
              queues[queueName] = props;
            }
          });
        } else {
          // Add a new entry
          const newEntry = {
            time: new Date().toLocaleTimeString(),
          };
          result.forEach(queue => {
            let queueName = queue.metric.queue;
            if (!queueName) queueName = 'TotalOfQueues';
            let messageCount = Number(queue.value[1]);
            newEntry[queueName] = messageCount;
            if (Object.keys(queues).includes(queueName)) {
              queues[queueName].PREVIOUSMESSAGES = queues[queueName].CURRENTMESSAGES;
              queues[queueName].CURRENTMESSAGES = messageCount;
              queues[queueName].RATE = getRate(queues[queueName].PREVIOUSMESSAGES, queues[queueName].CURRENTMESSAGES);
            } else {
              const props = {
                PREVIOUSMESSAGES: 0,
                CURRENTMESSAGES: messageCount,
                RATE: messageCount,
                active: true
              };
              queues[queueName] = props;
            }
          });
          updatedInfo.push(newEntry);
        }
        console.log('THIS IS THE REPLACEMENT INFORMATION', updatedInfo);
        // Update state with the new array
        setLineData(updatedInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Run fetchData every 1 second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [lineData]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const newData = () => {
  console.log('newData ran')
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const margin = { top: 5, right: 5, bottom: 5, left: 5 }
const renderLineChart = (
  <ResponsiveContainer height={200} width={400}>
    <LineChart margin={margin} data={lineData}>
    <Line stroke='red' dataKey='AppQueue' type='monotone'/>
    <Line stroke='orange' dataKey='InvQueue' type='monotone'/>
    <Line stroke='green' dataKey='BillQueue' type='monotone'/>
    <Line stroke='blue' dataKey='AuthQueue' type='monotone'/>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="time" />
      <YAxis/>
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div id='left-side'>
      <div id='metrics'>
      <button onClick={newData}>CHANGE STATE</button>
        <TopContainer data={data}/>
          <iframe id='mgmt-api' style={{visibility: `${!switcher ? 'hidden' : 'visible'}`}} src="http://localhost:15672/#/" frameborder="0"></iframe>
          <div id='bottom-grid' style={{visibility: `${switcher ? 'hidden' : 'visible'}`}}>
                {renderLineChart}
          </div>
        </div>
    </div>
  )
}
export default Metrics