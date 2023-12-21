import React, { useState, useEffect } from 'react'


function Stats( {queus, bindings, selected} ) {
  // const [count, setCount] = useState(0)

  // for(let i = 0; i < queues.length; i++){
  //   queues[i].name

  // }
  const details = [];
  const hashtags = []

  //`${selected === 'Overview' ? 'Total bindings:' : 'Bindings'}`

  const cache = {};
  for(let i = 0; i < bindings.length; i++){
    // console.log(bindings[i])

    if(selected === 'Overview'){
      const route = bindings[i].routing_key
      cache[route] = !(cache[route]) ? 1 : cache[route] + 1;
      // console.log(route, cache[route]) 
      if(cache[bindings[i].routing_key] === 1) {
        if(bindings[i].routing_key[0] === '#') {
          hashtags.push(<p>•{bindings[i].routing_key}</p>)
          continue;
        }
        details.push(<p>•{bindings[i].routing_key}</p>)
      }
    }

    if(selected === bindings[i].destination){
      if(bindings[i].routing_key[0] === '#') {
          hashtags.push(<p>•{bindings[i].routing_key}</p>)
          continue;
        }
      details.push(<p>•{bindings[i].routing_key}</p>)
    }

  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const [ready, setReady] = useState(false);
const [queueINFO, setQueueINFO] = useState({});
// Assuming 'selected' is a prop or state variable coming from another file
// If it's a prop, make sure to add it to the dependency array of the useEffect below.

const getRate = (prev, current) => {
  if (current - prev <= 0) return 0;
  return current - prev;
};

useEffect(() => {
  const intervalId = setInterval(async () => {
    try {
      const request = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages');
      const response = await request.json();
      const result = response.data.result;

      setQueueINFO(prevQueueINFO => {
        const updatedQueueINFO = { ...prevQueueINFO };

        result.forEach(queue => {
          let queueName = queue.metric.queue || 'Overview';
          let messageCount = Number(queue.value[1]);

          if (updatedQueueINFO[queueName]) {
            updatedQueueINFO[queueName].PREVIOUSMESSAGES = updatedQueueINFO[queueName].CURRENTMESSAGES;
            updatedQueueINFO[queueName].CURRENTMESSAGES = messageCount;

            if (updatedQueueINFO[queueName].TOTALMESSAGES !== messageCount && updatedQueueINFO[queueName].PREVIOUSMESSAGES !== messageCount) {
              updatedQueueINFO[queueName].TOTALMESSAGES += Math.abs(updatedQueueINFO[queueName].PREVIOUSMESSAGES - messageCount);
            }

            updatedQueueINFO[queueName].RATE = getRate(
              updatedQueueINFO[queueName].PREVIOUSMESSAGES,
              updatedQueueINFO[queueName].CURRENTMESSAGES
            );
          } else {
            const props = {
              PREVIOUSMESSAGES: 0,
              CURRENTMESSAGES: messageCount,
              RATE: messageCount,
              TOTALMESSAGES: messageCount,
            };

            updatedQueueINFO[queueName] = props;
          }
        });

        return updatedQueueINFO;
      });

      // Log the selected value and current messages
      console.log('THIS IS THE SELECTED  ', selected); // Assuming 'selected' is defined somewhere
      console.log(queueINFO[selected]?.CURRENTMESSAGES);
      setReady(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, [selected, queueINFO]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <div id='stats'>
      <div className="statistic"><div><h4 id='bindings-header'>box 1 </h4></div>
        <div><h1>{ready ? queueINFO[selected].CURRENTMESSAGES : 'loading...'}</h1></div>
      </div>
      <div className="statistic"><div><h4 id='bindings-header'>box 2</h4></div>
      <div><h1>{ready ? queueINFO[selected].RATE : 'loading...'}</h1></div>
      </div>
      <div className="statistic"><div><h4 id='bindings-header'>box 3</h4></div>
        <div><h1>{ready ? queueINFO[selected].TOTALMESSAGES : 'loading...'}</h1></div>
      </div>
      <div className="statistic"><div><h4 id='bindings-header'>bindings</h4></div>
      <div id='bindings-collection'>{details}{hashtags}</div>
      </div>
    </div>
  )
}

export default Stats