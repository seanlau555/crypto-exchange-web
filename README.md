# crypto-exchange

## Introduction

It is the frontend website written in Typescript by using the latest Frontend Tooling [Vite](https://github.com/vitejs/vite).
A first idea is to write a candlestick chart for displaying history with multiple timeframe just like Tradingview.
At first I am using [Alpaca](https://app.alpaca.markets/) for my API service provider. However, the authentication need to be
Oauth process.

## Demo

The published app is in Netlify.
Url link: https://firemessage-96e27.web.app/

## Installation

```sh
yarn or npm install
```

Installs all the needed dependencies

### Development & Builds Processes

```sh
yarn dev
```

The command above runs the app as a normal web app in development, deployed at http://localhost:3000/

```sh
yarn build
```

The final output build should be ready to be deployed like any normal react web app. The /dist folder is ready to be deployed 🚀

## Test case

As I am using vite for development and publishing, most of the frameworks quite new to me. I am using the official
test library, [Vitest](https://vitest.dev/), for the Unit test this time.

```sh
yarn test
```

Unit test for the main components, except Chart, which is to complicated.

```sh
yarn coverage
```

## Highlight coverage for functions

- OAuth login with redirection
- Currency list with selection
- Candlestick for displaying historical data.
- Supporting multiple timeframe
- React Hook for data query per minute.
