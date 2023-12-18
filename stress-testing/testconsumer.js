const amqp = require('amqplib/callback_api');

const testConsume = (exchangeName) => {
  const exchange = exchangeName;
  amqp.connect('amqp://localhost', function (error, connection) {
    
    if (error) console.log('error connecting to amqp: ', error.message);
    connection.createChannel(function (error, channel) {
  
      if (error) console.log('error connecting to the channel: ',error.message)
      channel.assertExchange(exchange, 'topic', {durable: true})
      
      channel.assertQueue('TestQueue');
      channel.bindQueue('TestQueue', exchange, '*');
      channel.consume(
        'TestQueue',
        async (msg) => {
          const message = await JSON.parse(msg.toString());
          console.log(message);
        },
      { noAck: true })
    })
  })
};
  
testConsume('trekker_topic');

module.exports = testConsume;