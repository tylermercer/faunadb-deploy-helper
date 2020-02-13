#!/usr/bin/env node

var lib = require('../index.js');

var printUsage = function() {
  console.log("Usage: fauna-deploy path/to/schema [--override] \n" +
    "Params in square brackets are optional. If --override is not used, schema is imported using merge mode.");
}

var dotenv = require('dotenv');
dotenv.config();

if (!process.env.FAUNA_SECRET) {
  console.log("No FAUNA_SECRET environment variable found");
  process.exit(2);
}

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

//Detect the --override flag
var override = false;
for (var arg in args) {
  if (args[arg] === '--override' || args[arg] === '-o') {
    override = true;
    args.splice(arg, 1);
    break;
  }
}

if (args.length !== 1) {
  printUsage();
  process.exit(1);
}

var schema = args[0];

// Displays the text in the console
lib.deploy(process.env.FAUNA_SECRET, schema, override);
