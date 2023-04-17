var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-4x7zwd201vaqn263.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"tcHfwPhZVVrhN27gsFMiJdF4a31SZwzA","client_secret":"Oc3s2hgwKYTGnHGYYQAwatuFpbOLgli5v2pL4JK4-sTp1s4edBUJpEO1dDuMkXP0","audience":"https://dev-4x7zwd201vaqn263.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});