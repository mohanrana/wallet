
# Wallet 

This project help you to create REST APIs on Express server Node.Js. This project has MVC architecture for creating REST APIs. This project has mainly three componants Controller, services aand repository. Controller layer only take care for APIs endpoints, Service layer drive your business logic and repository layer will help to interact with you database.

I this project MongoDB is used as a database for storing wallets records and transactions.


## Installation

To install this project, clone the repository first. In this project MongoDB docker-compose.yml also present. Also has a script to install docker on Ubuntu.

```bash
  # To setup docker and docker-compose on Ubuntu.

  cd wallet/mongodb
  bash setup-docker-ubuntu.sh

  # To Run MongoDB 
  docker-compose --compatibility up -d
```
Once your MongoDB will setup, you can run the wallet project and test APIs.

```bash
# To Run project.
cd wallet
npm i
npm run prod
```
You can check the logs once the project will start.
```bash
> express-wallet-app@1.0.0 prod
> NODE_ENV=production node index.js

WARNING: NODE_ENV value of 'production' did not match any deployment config file names.
WARNING: See https://github.com/node-config/node-config/wiki/Strict-Mode
2023-02-28T15:57:45.744Z [service] [null] [wallet] [INFO] [index.js] App started on port 3000
2023-02-28T15:57:45.772Z [service] [null] [wallet] [INFO] [MongoDB-connection.js] Mongoose default connection is open to MongoDB://localhost:24000/wallet?authsource=admin
```

NOTE: If MongoDB is already setup you can change the password inside `wallet/config/default.json`

```json
{
  "database": {
    "uri": "MongoDB://localhost:24000/wallet?authsource=admin",
    "username": "wallet",
    "password": "wallet"
  }
}
```
## API Reference

#### check service health

```http
  GET /health
```

#### Create wallet

```http
  POST /wallet
```

| Request body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Wallet name. |
| `balance`      | `number` | **Required**. Initial amount to add in a wallet. |

It will create the wallet with initial amount.

#### Get the wallet
```http
  GET /wallet/${walletId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `walletId`      | `string` | **Required**. Wallet ID. |

Return the wallet details, if exist.

#### Create a transactions
```http
  POST /wallet/${walletId}/transactions
```
| Request body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      | `number` | **Required**. The amount to be deposited/withdrawal. |
| `description`      | `string` | **Optional**. Reason to deposited/withdrawal amount. |

It will create a transactions for the amount you have entered.

#### Get transactions history
```http
  GET /wallet/${walletId}/transactions
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `walletId`      | `string` | **Required**. Wallet ID. |

Return the last 10 transactions history.
## Authors

- [@mohanrana](https://github.com/mohanrana)

