## Table of context:

- [Installation](#installation)
- [How to run](#how-to-run)
- [Available URLs](#available-urls)

# Installation

- Download the project either as a ZIP file or clone this repository via git
  `git clone https://github.com/mikhailidi/ts-node-api.git`
- Navigate to the project folder `cd ts-node-api`
- Start the Docker container `docker-compose up -d`

# How to run

- Run `sh toolset.sh bash` to login to bash container
- Run `sh toolset.sh test` to run the tests from the Docker container

# Available URLs

- Get all tenant payments for a specific contract: `GET http://localhost:4000/contracts/{:id}/payments`
- Get all tenant payments for a specific contract starting from specific date: `GET http://localhost:4000/contracts/{:id}/payments?startDate=YYYY-MM-DD`
- Get all tenant payments for a specific contract ending by specific date: `GET http://localhost:4000/contracts/{:id}/payments?endDate=YYYY-MM-DD`
- Get all tenant payments for a specific contract in specific date range: `GET http://localhost:4000/contracts/{:id}/payments?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- Remove the payment: `DELETE http://localhost:4000/contracts/{:contractId}/payments/{:paymentId}`