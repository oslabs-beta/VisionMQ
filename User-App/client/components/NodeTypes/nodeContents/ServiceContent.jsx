import React, { useState } from 'react'

function Service({ name }) {
  // const [count, setCount] = useState(0)
  const componentNode = { reactComponent: (props) => <Service {...props} />};

  return (
    <div className='service-body'>
      <p>{name}</p>
    </div>
  )
}

export default Service