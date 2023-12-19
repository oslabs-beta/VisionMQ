const promController = {};

promController.getDefinitions = async (res, req, next) => {
  console.log('[/load] Fetching Definitions from Management API');

  const username = 'guest';
  const password = 'guest';
  const url = 'http://localhost:15672/api/definitions';

  const base64Credentials = btoa(`${username}:${password}`);

  let request = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/json',
    },
  });
  let response = await request.json();
  console.log('THIS IS THE RESPONSE FROM MANAGEMENT API', response);

  res.locals.definitions = response;
  next();
};

module.exports = promController;
