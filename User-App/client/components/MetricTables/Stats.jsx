import React, { useState, useEffect } from 'react'


function Stats( {queus, bindings, selected, runProm} ) {
  const [ready, setReady] = useState(false);
  const [queueINFO, setQueueINFO] = useState({});

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
          hashtags.push(<p key={i}>• {bindings[i].routing_key}</p>)
          continue;
        }
        details.push(<p key={i}>• {bindings[i].routing_key}</p>)
      }
    }

    if(selected === bindings[i].destination){
      if(bindings[i].routing_key[0] === '#') {
          hashtags.push(<p key={i}>• {bindings[i].routing_key}</p>)
          continue;
        }
      details.push(<p key={i}>• {bindings[i].routing_key}</p>)
    }

  }
//////////

const getRate = (prev, current) => {
  if (current - prev <= 0) return 0;
  return current - prev;
};

let intervalId;

useEffect(() => {
  if(runProm)
  {
     intervalId = setInterval(async () => {
    try {
      const request = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages');
      const response = await request.json();
      const result = response.data.result;
      console.log(result)

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
      console.log('THIS IS THE SELECTED  ', selected, queueINFO); // Assuming 'selected' is defined somewhere
      console.log(queueINFO[selected].CURRENTMESSAGES);
      setReady(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 1000);
}
  return () => {
    clearInterval(intervalId);
  };
}, [selected, queueINFO, runProm]);


  ////////


  return (
    <div id='stats'>
      <div className="statistic"><div><h4 id='bindings-header'>{`${selected === 'Overview' ? 'in queues' : 'in queue'}`}</h4></div><h2>{ready ? queueINFO[selected].CURRENTMESSAGES : '...'}</h2></div>
      <div className="statistic"><div><h4 id='bindings-header'>rate</h4></div><h2>{ready ? `${queueINFO[selected].RATE}/s` : '...'}</h2></div>
      <div className="statistic"><div><h4 id='bindings-header'>total delivered</h4></div><div id="total-messages"><h2>{ready ? queueINFO[selected].TOTALMESSAGES : '...'}</h2></div></div>
      <div className="statistic"><div><h4 id='bindings-header'>bindings</h4></div>
      <div id='bindings-collection'>{details}{hashtags}</div>
      </div>
    </div>
  )
}

export default Stats