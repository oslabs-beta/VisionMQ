let fetcher = async() => {

  let read = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_io_read_ops_total')

    const read_object = await read.json()
    const read_result = read_object.data.result[0].value[1]

    console.log('this is the amount of read operations: ', read_result)

    let wrote = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_io_write_ops_total');

    const wrote_object = await wrote.json()
    const wrote_result = wrote_object.data.result[0].value[1]

    console.log('this is the amount of write operations: ', wrote_result)

}
fetcher()
