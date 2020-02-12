/**
 * Deploys a GraphQL schema and/or runs FQL files
 *
 * @param {secret} String the Fauna DB's secret
 * @param {db} String the database name
 * @param {schema} String the path to the GraphQL schema to deploy
 * @param {queries} List<String> the paths of the fql files to run
 */
var deploy = function(secret, db, schema, queries) {

    //TODO: implement
    console.log("Deploying schema [" + schema + "] and queries [" + queries.join(", ") + "] to database [" + db + "] using secret [" + secret + "]");
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.deploy = deploy;
