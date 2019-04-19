# GraphQL-server-todo 🚀

The project implements a graphQL server to manage todo tasks. You can run the server using a dockerfile.

This project use **TypeScript** for type-checking, **CircleCI** for continuous integration, **coveralls** for test coverage support, **docker** for deployment and share purpose, **Apollo** which provide an easy way to create a graphQL server (which I also met at a conference/workshop) and **chai** for testing purpose.

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### **Prerequisites**

You have to install nodeJs from the [official website](https://nodejs.org/en/download/)

You can check that everything is ok by typing: `nodejs -v` and `npm -v`

## **Docker** 🐳

You have to install docker from the [official website](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/#install-compose)(If you are on Mac, Docker installation already includes docker-compose).

And then you can run :
```
docker-compose build
```
Which will buid the containers and then :
```
docker-compose run
```
Which will run the containers.

By default app will launch on port **3000** and mongoDB on port **27017**

You can list all your running containers by typing the command: 
``` docker container ls ```

Then go to : `http://localhost:3000/graphql`

### **Configure** ( without docker ) 

To use the server you will have to configure the database you use.

In case of local deployment :

- Install MongoDB

- Create `todo` database

Add an `.env` file at the root of the project and add your mongo config:

```
MONGO_PORT = 27017
MONGO_HOST = localhost
MONGO_DB = todo
```

### Installing the dependencies

There is two ways to install the server:

##### Using npm

```
npm install
```

##### 2. Using yarn

```
yarn install
```

## List of commands

### `npm run migrate:up`

It will run the **UP** migration files inside the `migrations` folder to populate our databse.

### `npm run migrate:down`

It will run the **DOWN** migration files inside the `migrations` folder to rollback data from our up migrations.

### `npm run compile`

It will basically compile all the `*.ts` file inside app folder to `*.js` file inside a new build folder.

### `npm run start:ts` 

It will launch the server in `watch mode`, which let you make change inside `*.ts` file directly without re-compiling.

### `npm run start` 

It will launch the server from the `build` folder.

### `npm run lint`

The project also use [ESlint](https://eslint.org/) (a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code) and [Prettier](https://prettier.io/). You can see lint warnings / errors by running this command.

### `npm run test`

Launches the test runner in the interactive watch mode.<br>

### `npm run coverage`

Coveralls.io will create a coverage report from your app.


## Using the API

Here are some example queries which you can use as a starting point when using the playground.
In order: Get all tasks, Add a new task, Delete a task by ID, Edit the `isChecked` field task by ID

```graphql
query getTasks {
  getTasks {
    content
    isChecked
  }
}

mutation addTask {
  addTask(content: "testContent", isChecked: false) {
    content
    isChecked
  }
}

mutation deleteTask {
  deleteTask(id: "5cb88553365ce31ea65221d3") {
    id
    content
    isChecked
  }
}

mutation editTask {
  editTask(id: "5cb88572365ce31ea65221d4", input: { isChecked: false }) {
    id
    content
    isChecked
  }
}
```

## Deployment

For deployment, I recommend using [Heroku](https://dashboard.heroku.com/apps).

## Configure https

I recommend you to use [Let's Encrypt](https://letsencrypt.org/).    
You have to create a self-signed certificate with openSSL :

```openssl req -nodes -new -x509 -keyout server.key -out server.cert```

And put the `cert.pem` and `key.pem` under a folder `cert` in `./app`.

Then enable https in Express by adding this lines in app/server.ts:

``` js 
const httpsOptions = {
    key:   fs.readFileSync(path.join(__dirname, 'cert', 'server.key')),
    cert:   fs.readFileSync(path.join(__dirname, 'cert', 'server.cert'))
};
```

You can then add those lines in the `server.ts` file: 

``` js
https.createServer(httpsOptions, app).listen(process.env.PORT || DEFAULT_PORT, function() {
    console.log('Express HTTPS server listening on port ' + DEFAULT_PORT);
});
```

## Built With ❤️ by ayshiff


