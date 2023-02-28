
# Wallet 

This project helps you to create REST APIs on the Node.Js Express server. This project has MVC architecture for creating REST APIs. This project has mainly three components Controller, services, and repository. The controller layer only takes care of API endpoints, the Service layer drives your business logic and the repository layer helps to interact with your database.

MongoDB is used as a database for storing wallet records and transaction history.


## Installation

Clone the repository and set up MongoDB first. In this project, MongoDB docker-compose.yml is present.  You can setup docker on Ubuntu by simply running a shell script as mentioned below.

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
<span style="color:red">NOTE: If MongoDB is already setup you can change the password inside 'wallet/config/default.json'</span>

https://github.com/mohanrana/wallet/blob/master/config/default.json

## API Reference

<span style="color:red">NOTE: Postman collection has added for APIs reference, Import the collection and start API testing.</span>

https://github.com/mohanrana/wallet/blob/master/Wallet.postman_collection.json

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

