# Table of context:

- [Table of context:](#table-of-context)
- [Requirements](#requirements)
- [Installation](#installation)
- [How to run](#how-to-run)
  - [Manually](#manually)
  - [URL Examples](#url-examples)
  - [Tests](#tests)

# Requirements
For now, there's bo Docker container where you can run the app 
so you must have installed on your machine:
- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Postman](https://www.postman.com/downloads/)

# Installation

- Download the project either as a ZIP file or clone this repository via git
  `git clone https://github.com/mikhailidi/ts-node-api.git`
- Navigate to the project folder `cd ts-node-api`
- Install dependencies `yarn install`

# How to run

## Manually 

- Run `yarn dev`
- Access the project on `http://localhost:4000`

## URL Examples

- Get all tenant payments for a specific contract: `GET http://localhost:4000/contracts/{:id}/payments`
- Get all tenant payments for a specific contract starting from specific date: `GET http://localhost:4000/contracts/{:id}/payments?startDate=YYYY-MM-DD`
- Get all tenant payments for a specific contract ending by specific date: `GET http://localhost:4000/contracts/{:id}/payments?endDate=YYYY-MM-DD`
- Get all tenant payments for a specific contract in specific date range: `GET http://localhost:4000/contracts/{:id}/payments?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- Remove the payment: `DELETE http://localhost:4000/contracts/{:contractId}/payments/{:paymentId}`

## Tests

To run the tests, make sure you server is not running and run `yarn test` from you terminal.