/* 
This test will act as a publisher itself, and connect to the host to send messages to all exchanges, queues, and consumers. 
The test is a Class that has the following methods: turnOnConsumer, prepTests, runTest, stopTest, takeSnapShot, and updateRoundRobinSuite

To create a new instance of the RoundRobin class, you will need to provide the following: rabbitAddress, exchanges, bindings
  * rabbitAddress is the URL or URL in which the test can connect to the user's RabbitMQ's enviornmnet.
  * exchanges is an array containing objects with information on the exchanges
  * bindings is an array containing objects with the information on all of the bindings 

examples: 
  rabbitAddress = 'amqp://localhost'
  exchanges = [{ 
      name: 'trekker_topic',
      vhost: '/',
      type: 'topic',
      durable: true,
      auto_delete: false,
      internal: false,
      arguments: {}
    }, {...}, {...}]
  bindings = [{
      source: 'trekker_topic',
      vhost: '/',
      destination: 'AuthQueue',
      destination_type: 'queue',
      routing_key: 'Auth',
      arguments: {}
    }, {...}, {...}]
*/ 

const amqp = require('amqplib/callback_api');

//this test consumer is currently connecting but is not showing the messages in the console of this test
const testConsume = (exchangeName) => {
  const exchange = exchangeName;
  amqp.connect('amqp://localhost', function (error, connection) {
    console.log('consumer is on')
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
          console.log(msg);
        },
      { noAck: true })
    })
  })
};

//this is the test publisher that will send out all of the messages during the test
const testPublisher = (exchangeName, exchangeType, rabbitAddress, key, msgObj) => {
  console.log('connecting to the publisher')

  amqp.connect(rabbitAddress, function (error, connection) {

    if (error) console.log('error connecting to amqp: ', error.message);

    connection.createChannel(function (err, channel) {

    if (error) console.log('error connecting to the channel: ', err.message);
      channel.assertExchange(exchangeName, exchangeType, {durable: true})
      channel.publish(exchangeName, key, Buffer.from(JSON.stringify(msgObj)))
      //console.log(key, msgObj)
      })
      setTimeout(() => {
        connection.close();
      }, 500)
    })
};

//these are only used to test the RoundRobin Class
const exchanges = [
    { 
      name: 'trekker_topic',
      vhost: '/',
      type: 'topic',
      durable: true,
      auto_delete: false,
      internal: false,
      arguments: {}
    }]
const bindings1 = [
  {
    source: 'trekker_topic',
    vhost: '/',
    destination: 'AuthQueue',
    destination_type: 'queue',
    routing_key: 'Auth',
    arguments: {}
  },
  {
    source: 'trekker_topic',
    vhost: '/',
    destination: 'AppQueue',
    destination_type: 'queue',
    routing_key: '#.failed',
    arguments: {}
  }]


class roundRobinTest {
  constructor (rabbitAddress, exchanges, bindings) {
    this.rabbitAddress = rabbitAddress;
    this.exchanges = {}
    this.bindings = bindings;
    this.readyToTest = false;
    this.testMessages = [];
    this.totalMessagesSent = 0;
    this.snapShots = [];
    this.message = {
      type: 'Round Robin',
    };
    exchanges.forEach((exc) => {
      this.exchanges[exc.name] = exc;
    })
  }
  //this will be removed later, it's only been added for testing purposes. 
  turnOnConsumer () {
    testConsume('trekker_topic');
  }
  //this method needs to be run so it can compile all of the exchanges and bindings in a format to be easily sent to the publisher 
  prepTests () { 
    this.turnOnConsumer();
    this.bindings.forEach((binding) => {
      this.testMessages.push({
        exchangeName: binding.source,
        exchangeType: this.exchanges[binding.source].type,
        rabbitAddress: this.rabbitAddress,
        key: binding.routing_key,
        message: this.message,
      })
    })
    this.readyToTest = true; 
  }

  //method to begin testing
  runTest () { 
    if (this.readyToTest === false) return;
    this.testMessages.forEach((msg) => {
      testPublisher(msg.exchangeName, msg.exchangeType, msg.rabbitAddress, msg.key, msg.message)
      this.totalMessagesSent++;
    })
  }

  //method to stop running the test 
  stopTest () {
    if (this.readyToTest === false) return;
  }

  //this will take a snapshot of the current testing environment 
  takeSnapShot () {
    this.snapShots.push({
      rabbitAddress: this.rabbitAddress,
      exchanges: this.exchanges,
      bindings: this.bindings,
      testMessages: this.testMessages,
      totalMessagesSent: this.totalMessagesSent,
    });
  } 

  //this method will allow you to completely update your Round Robin test environment 
  updateRoundRobinSuite (rabbitAddress, exchanges, bindings) {
    this.rabbitAddress = rabbitAddress;
    this.exchanges = {}
    this.bindings = bindings;
    this.readyToTest = false;
    this.testMessages = [];
    this.totalMessagesSent = 0;
    this.message = {
      type: 'Round Robin',
    };
    exchanges.forEach((exc) => {
      this.exchanges[exc.name] = exc;
    })
  }
}

const tester = new roundRobinTest('amqp://localhost', exchanges, bindings1)
tester.prepTests()
tester.runTest();
tester.takeSnapShot()


//export default roundRobinTest;