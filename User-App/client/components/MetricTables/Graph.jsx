import React, { useState, useEffect } from 'react'
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import CustomToolTip from './CustomTooltip'

function Graph({ runProm }) {
  const [lineData,setLineData] = useState([{time:0,InvQueue: 20,AppQueue:20,BillQueue:20,AuthQueue:20},{time:0,InvQueue: 10,AppQueue:10,BillQueue:10,AuthQueue:10}])
  const [time, setTime] = useState(1)
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
          // const newTime = Date.now()
          // const diff = newTime - ogTime

          const newEntry = {
            time: `${(Math.floor(time/60))}:${time%60 < 10 ? '0' : ''}${time%60}` //new Date().toLocaleTimeString()
          };
          setTime(time + 1)

          // ogTime += diff;
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
    let intervalId;
    if(runProm)
    {intervalId = setInterval(() => {
      fetchData();
    }, 1000);}
    // Run fetchData every 1 second
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [lineData, runProm]);


const margin = { top: 20, right: 15, bottom: 0, left: -20 }
const renderLineChart = (
  <ResponsiveContainer height={'95%'} width={'100%'}>
    <LineChart id='line-chart' margin={margin} data={lineData}>
    <Line stroke='#ff6600' dataKey='AppQueue' type='monotone' isAnimationActive={false} />
    <Line stroke='#ff6600' dataKey='InvQueue' type='monotone' isAnimationActive={false} />
    <Line stroke='#ff6600' dataKey='BillQueue' type='monotone' isAnimationActive={false}/>
    <Line stroke='#ff6600' dataKey='AuthQueue' type='monotone' isAnimationActive={false}/>
      {/* <CartesianGrid stroke="#ccc" strokeDasharray={" 5 5"} vertical={false} /> */}
      <XAxis dataKey="time" stroke="#ccc"/>
      <YAxis stroke="#ccc"/>
      <Tooltip content={<CustomToolTip />}/>
    </LineChart>
  </ResponsiveContainer>
)

  return (
    <div className='graph'>
      <h4>throughput</h4>
            {renderLineChart}
    </div>
  )
}

export default Graph