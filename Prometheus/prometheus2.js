


let fetcher = async() => {



let published = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages_published_total');

      const published_object = await published.json()
      const published_result = published_object.data.result[0].value[1]
  

      console.log('this is the amount published: ', published_result)

let acknowlegded = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages_acknowledged_total');

      const acknowledged_object = await acknowlegded.json()
      const acknowledged_result = acknowledged_object.data.result

      console.log('this is the amount acknowledged: ', acknowledged_result)

let delievered = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages_delivered_total');

  let delieverd_object = await delievered.json()
  let delieverd_result = delieverd_object.data.result

  console.log('this is the amount delieverd: ', delieverd_result)
  
}

fetcher()