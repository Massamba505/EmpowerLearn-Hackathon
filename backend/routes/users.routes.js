var express = require('express');
var router = express.Router();
const { CommunicationIdentityClient } = require('@azure/communication-identity');


const connectionString = process.env.ACS_CONNECTION_STRING;
const client = new CommunicationIdentityClient(connectionString);

router.post('/token', async (req, res) => {
  try {
    const user = await client.createUser();
    const tokenResponse = await client.getToken(user, ["voip"]);
    res.json(tokenResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating token');
  }
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;