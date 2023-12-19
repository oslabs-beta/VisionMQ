import React, { useState } from 'react'
function TopContainer({ data }) {
  // const [count, setCount] = useState(0)

  return (
    <div id='top-container'>
      <div id='user-info'>
        <span>{`${data.user} • vhost: '${data.vhost}'`}</span>
        <span>{`${data.product_name}: ${data.product_version}`}</span>
      </div>
      <div id='top-divider'></div>
      <div id='rabbit-elements'></div>
    </div>
  )
}

export default TopContainer