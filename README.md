# H O M E

## Installation

```
$ yarn install
$ yarn dev:web
```

## Building and Syncing Smart Contracts

```
$ npm install -g truffle
$ cd packages/blockchain
$ yarn migrate --reset
$ yarn syncContracts
```

## Installing New Packages

```
$ yarn workspace @teamzero/dev add PACKAGE_NAME
```

## Deployment

Pushes to the `main` branch are automatically deployed to Vercel at the URL https://teamzero.vercel.app
