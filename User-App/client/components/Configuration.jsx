import React, { useState } from 'react'
import rmqLogo from '../../assets/rmqlogo.png'
import collab from '../../assets/collab.png'
import vmqLogo from '../../assets/visionlogo.png'
import { Link } from 'react-router-dom'
import Metrics from './Metrics'

function Configuration({ refresh, refreshed, stressTest}) {
  // const [count, setCount] = useState(0)
  const [switcher, setSwitcher] = useState(false)
  const [showing, setShowing] = useState(false);

  const changeSwitcher = () => {
    switcher ? setSwitcher(false) : setSwitcher(true)
  }

  const showInput = () => {
    setShowing(true)
  }


  return (
    <div id='configuration'>
        <div id='header'>
          <div id='logos'>
            <a href='https://github.com/oslabs-beta/VisionMQ'><img id='vmqlogo' src={vmqLogo} /></a>
            <img id='collab' src={collab} />
            <a href='https://rabbitmq.com/'><img id='rmqlogo' src={rmqLogo} /></a>
          </div>
          <div id='router-links' >
          <button onClick={changeSwitcher} className='link-right'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
</svg>
</button>
          <button onClick={() => stressTest(document.querySelector('#input-right').value)} onMouseEnter={showInput} className='link-left'>stress test</button>
<input id='input-right' placeholder='#' style={{opacity: `${showing ? '1' : '0'}`}}></input>
</div>
          </div>
        <Metrics switcher={switcher} refreshed={refreshed}/>
    </div>
  )
}

export default Configuration