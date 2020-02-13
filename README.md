# FaunaDB Deployment Helper

This is a package to facilitate deploying a FaunaDB GraphQL schema from a Continuous Deployment pipeline.

## Installation
```
npm install --save-dev faunadb-deploy-helper
```

## Usage
```
fauna-deploy myschema.gql
```

You can use the optional `--override` flag to specify override mode. Without the override flag, merge mode is used. See [the Fauna Docs](https://docs.fauna.com/fauna/current/api/graphql/endpoints#modes) for more on the schema import modes.
