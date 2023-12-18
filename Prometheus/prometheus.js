// Used to access all of the information outside of out grabInfo function 
const queues = {}

// Function used to calculate the rate of the 
const getRate = (prev,current) => {
    if(current - prev <= 0) return 0
    return current - prev
  } 
  
  
  const grabInfo = async () => {
  
    // console.log(result)
    setInterval(async () => {
      let request = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages');
      const response = await request.json()
      const result = response.data.result
      let promQueues = []
      result.forEach(queue => {
      let queueName = queue.metric.queue 
      promQueues.push(queueName)
      if(!queueName) queueName = 'TotalOfQueues'
      let messageCount = Number(queue.value[1])
      if(Object.keys(queues).includes(queueName)){
        queues[queueName].PREVIOUSMESSAGES = queues[queueName].CURRENTMESSAGES
        queues[queueName].CURRENTMESSAGES = messageCount
        queues[queueName].RATE = getRate(queues[queueName].PREVIOUSMESSAGES,queues[queueName].CURRENTMESSAGES) 
      } else {
        const props = {}
        props.PREVIOUSMESSAGES = 0
        props.CURRENTMESSAGES = messageCount
        props.RATE = messageCount
        props.active = true
        queues[queueName] = props
      }
    })
    for(queue in queues){
      if(!(promQueues.includes(queue))) queues[queue].active = false
    }
    console.log(queues)
  },2000)
  
}

grabInfo()
