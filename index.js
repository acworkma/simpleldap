module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //const name = (req.query.name || (req.body && req.body.name));
    //const responseMessage = name
    //    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

const ldap = require('ldapjs');

//create the client
const client = ldap.createClient({
  url: ['<your ip>>:1389']
});

//bind the client
client.bind('cn=root', 'secret', (err) => {
    //assert.ifError(err);
  });

//perform the search

const opts = {
    filter: '(cn=root)',
    scope: 'sub',
    attributes: ['dn', 'sn', 'cn']
  };

client.search('o=myhost', opts, (err, res) => {
    //assert.ifError(err);
  
    res.on('searchRequest', (searchRequest) => {
      console.log('searchRequest: ', searchRequest.messageID);
    });
    res.on('searchEntry', (entry) => {
      console.log('entry: ' + JSON.stringify(entry.object));
    });
    res.on('searchReference', (referral) => {
      console.log('referral: ' + referral.uris.join());
    });
    res.on('error', (err) => {
      console.error('error: ' + err.message);
    });
    res.on('end', (result) => {
      console.log('status: ' + result.status);
    });
  });

//error  
client.on('error', (err) => {
  // handle connection error
  console.log(err);
})    
    
    
    const responseMessage = "bob"
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
