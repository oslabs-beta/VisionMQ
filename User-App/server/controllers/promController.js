const RoundRobinTest = require('../stress-testing/round-robin');

const promController = {};

// promController.getDefinitions = async (req, res, next) => {
//   console.log('[/load] Fetching Definitions from Management API');

//   const username = 'guest';
//   const password = 'guest';
//   const url = 'http://localhost:15672/api/definitions';

//   const base64Credentials = btoa(`${username}:${password}`);

//   let request = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Basic ${base64Credentials}`,
//       'Content-Type': 'application/json',
//     },
//   });
//   let response = await request.json();
//   console.log('THIS IS THE RESPONSE FROM MANAGEMENT API', response);

//   res.locals.definitions = response;
//   next();
// };

promController.roundRobin = async (req, res, next) => {
  const { rabbitAddress, exchanges, bindings, target } = req.body;
  // console.log(req.body);
  // console.log(
  //   '[/roundrobin] yum',
  //   new RoundRobinTest('amqp://localhost', exchanges, bindings, 100)
  // );

  const robinTest = new RoundRobinTest(
    rabbitAddress,
    exchanges,
    bindings,
    target
  );

  robinTest.prepTests();
  robinTest.runTest();

  next();
};

module.exports = promController;
