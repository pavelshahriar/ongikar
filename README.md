In bengali Ongikar means promise. This api based web app will help the create revolutions in bengali community by making people more and more inclined to keeping their promises made !

## Tech Stack :

### Integrated
* PaaS : Heroku
* Server : Node.js
* Middleware : ExpressJS
* DB : MongoDB
* UX : Sass
* Build : Gulp
* Documentation : ApiDoc
* Test :
   * Integration : Postman + Newman

### Pending
* _Transpiler :_
* _Client :_
* _Unit Test :_
* _Coverage :_


## Local MongoDB Setup
* Install mongoDB with brew
* Run `mongod`
* In another terminal run `mongo`
* In the mongo console run these one by one :
```
use admin

db.createUser(
  {
    user: "root",
    pwd: "<rootPass>",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" },
             { role: "dbAdminAnyDatabase", db: "admin" },
             { role: "readWriteAnyDatabase", db: "admin" } ]
  }
)
db.auth('root', '<rootPass>')

use ongikar
db.createUser(
  {
    user: "ongikari",
    pwd: "0ng1k@rI",
    roles: [ { role: "readWrite", db: "ongikar" }]
  }
)
db.auth('ongikari', '0ng1k@rI')
```

## Run Locally
* Run `mongod`
* Run `npm start`
* Hit `localhost:4000/api`
