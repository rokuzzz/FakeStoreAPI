# FakeStoreAPI by Roman and Hoan
## About
The [FakeStoreAPI](https://funshopping-api.herokuapp.com/api-docs/) provides free online e-commerce REST API. Can be used to develop front-end projects when placeholder data is needed without running any server-side code. 

Main paths are: 
- Users
- Admin
- Products
- Categories
- Carts

Project was developed by Roman Kuzero and Hoan Ho.

## Used Technologies
- TypeScript
- Node.js
- Express.js
- Mongoose
- Swagger
- Jest

## Getting started
### Installation
1. Clone the repo
```
git clone https://github.com/alexh0810/fs11-backend.git
```
2. Install NPM packages
```
npm install
```
### Set .env
1. Get this from mongodb atlas after you've logged in and created a database
```
SHOP_DB_URI="mongodb+srv://<username>:<password>@cluster0.juxbs.mongodb.net/<databaseName>?retryWrites=true&w=majority"
```
2. Set the port
```
PORT="5000"
```

## Usage
you can fetch data with any kind of methods you know (fetch API, Axios, jquery ajax, etc.)
### Get All Products
```js
fetch("https://funshopping-api.herokuapp.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));
```
### Get Single Product
```js
fetch("https://funshopping-api.herokuapp.com/products/{id}")
  .then((res) => res.json())
  .then((json) => console.log(json));
```
