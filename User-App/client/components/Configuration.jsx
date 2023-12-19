import React, { useState } from 'react'
import rmqLogo from '../../assets/rmqlogo.png'
import collab from '../../assets/collab.png'
import vmqLogo from '../../assets/visionlogo.png'
import { Link } from 'react-router-dom'
import Metrics from './Metrics'

function Configuration() {
  // const [count, setCount] = useState(0)
  const [switcher, setSwitcher] = useState(false)

  const changeSwitcher = () => {
    switcher ? setSwitcher(false) : setSwitcher(true)
  }

  return (
    <div id='configuration'>
        <div id='header'>
          <div id='logos'>
            <a href='https://github.com/oslabs-beta/VisionMQ'><img id='vmqlogo' src={vmqLogo} /></a>
            <img id='collab' src={collab} />
            <a href='https://rabbitmq.com/'><img id='rmqlogo' src={rmqLogo} /></a>
          </div>
          <button onClick={changeSwitcher} className='router-links'>Toggle</button>
          </div>
        <Metrics switcher={switcher}/>
    </div>
  )
}

export default Configuration