const https = require('https');
const fs = require('fs');

const httpsPost = ({body, ...options}) => {
    return new Promise((resolve,reject) => {
        const req = https.request({
            method: 'POST',
            ...options,
        }, res => {
            const chunks = [];
            const statusCode = res.statusCode;
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let body = Buffer.concat(chunks);
                switch(res.headers['content-type']) {
                    case 'application/json':
                        body = JSON.parse(body);
                        break;
                }
                resolve({ body, statusCode })
            })
        })
        req.on('error',reject);
        if(body) {
            req.write(body);
        }
        req.end();
    })
}

/**
 * Deploys a GraphQL schema and/or runs FQL files
 *
 * @param {secret} String the Fauna DB's secret
 * @param {db} String the database name
 * @param {schema} String the path to the GraphQL schema to deploy
 * @param {queries} List<String> the paths of the fql files to run
 */
const deploy = async function(secret, schema, override) {

  const schemaContents = fs.readFileSync(schema, 'utf8');

  console.log(override? "Overriding schema..." : "Updating schema...");

  const res = await httpsPost({
    hostname: 'graphql.fauna.com',
    path: `/import` + (override? "?mode=override" : "?mode=merge"),
    headers: {
        'Authorization': `Bearer ${secret}:`,
    },
    body: schemaContents
  });

  if (res.statusCode === 200) {
    console.log("Schema updated successfully!");
  } else {
    console.log(`Schema update failed: ${res.statusCode} ${res.body.toString()}`);
    process.exit(3);
  }
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.deploy = deploy;
