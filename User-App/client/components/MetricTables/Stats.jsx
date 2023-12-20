import React, { useState } from 'react'


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
          hashtags.push(<p>• {bindings[i].routing_key}</p>)
          continue;
        }
        details.push(<p>• {bindings[i].routing_key}</p>)
      }
    }

    if(selected === bindings[i].destination){
      if(bindings[i].routing_key[0] === '#') {
          hashtags.push(<p>• {bindings[i].routing_key}</p>)
          continue;
        }
      details.push(<p>• {bindings[i].routing_key}</p>)
    }

  }



  return (
    <div id='stats'>
      <div className="statistic"><div><h4 id='bindings-header'>{`${selected === 'Overview' ? 'in queues' : 'in queue'}`}</h4></div><h2>5,000</h2></div>
      <div className="statistic"><div><h4 id='bindings-header'>rate</h4></div><h2>50,000/s</h2></div>
      <div className="statistic"><div><h4 id='bindings-header'>total delivered</h4></div><div id="total-messages"><h2 >10,000,000</h2></div></div>
      <div className="statistic"><div><h4 id='bindings-header'>bindings</h4></div>
      <div id='bindings-collection'>{details}{hashtags}</div>
      </div>
    </div>
  )
}

export default Stats