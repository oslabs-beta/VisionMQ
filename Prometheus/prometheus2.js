let fetcher = async() => {

let published = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages');

      const published_object = await published.json()
      const published_result = published_object.data.result
  
      console.log('this is the amount in queues: ', published_result)

let acknowlegded = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_queue_messages_acknowledged_total');

      const acknowledged_object = await acknowlegded.json()
      const acknowledged_result = acknowledged_object.data.result

      console.log('this is the amount consumed: ', acknowledged_result)

fetcher()

}
//rabbitmq_queue_messages_acknowledged_total


//successful vs unsuccseful auth attempts
      // rabbitmq_auth_attempts_succeeded_total
      //rabbitmq_auth_attempts_failed_total