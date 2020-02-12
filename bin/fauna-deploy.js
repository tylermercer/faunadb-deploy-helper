#!/usr/bin/env node

var lib = require('../index.js');

var printUsage = function() {
  console.log("Usage: fauna-deploy <db-name> <path-to-schema> [<path-to-fql-1> ... <path-to-fql-n>]");
}

var dotenv = require('dotenv');
dotenv.config();

if (!process.env.FAUNA_SECRET) {
  console.log("No FAUNA_SECRET environment variable found");
  process.exit(2);
}

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

if (args.length < 2) {
  printUsage();
  process.exit(1);
}

var db = args[0];
var schema = args[1];
var queries = [];

var i = 2;
while (i < args.length) {
  queries.push(args[i]);
}

// Displays the text in the console
lib.deploy(process.env.FAUNA_SECRET, db, schema, queries);
