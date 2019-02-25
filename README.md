[![Build Status](https://travis-ci.org/danial-k/date-api.svg?branch=master)](https://travis-ci.org/danial-k/date-api)

# Introduction
Simple Date API

# API Documentation
OpenAPI is used to define the API endpoints, located in ```public/openapi.json``` or accessed when the application is running by accessing ```/openapi.json```.

# Startup
## Run using NodeJS
NodeJS and npm are required if running the application directly.
```
git clone https://github.com/danial-k/date-api
npm install
npm run start
```
If you wish to use SSL/TLS, supply and run instead with the following environment variables:
```
DATE_API_SSL_CRT='/path/to/cert.crt' DATE_API_SSL_KEY='/path/to/cert.key' DATE_API_PORT=5001 npm run start
```

## Running Docker container
```
docker run --name date_api -d -p 5001:80
```
To enable HTTPS, a certificate and key file must be mapped as separate file volumes.
```
docker run --name date_api -d -p 5001:443 \
-v /path/to/cert.crt:/certs/api.crt:Z \
-v /path/to/cert.key:/certs/api.key:Z \
dnaialkhoshkhou/date-api:1.0.0
```
Note that ```:Z``` is require on SELinux (e.g. CentOS or RHEL) to allow access to volume mounts.

# Tests
## Code standards
Linting tests are carried out using ESLint.  See the test section in ```package.json``` for execution.

## Unit tests
Unit tests are executed using the [Mocha](https://mochajs.org) framework.  Code coverage is provided via the [Istanbul](https://istanbul.js.org) framework.  See the test section in ```package.json``` for details.
Coverage report output to the ```coverage``` folder.

## End to end tests
A collection of Postman requests are available at ```postman/date_api.postman_collection.json```.  This file
may be imported into Postman and executed via the Postman Collection Runner.  Alternatively, to run via the
command line the Postman cli collection runner (Newman) may be used .  You will need to create an environment file with ```{{date_api_url}}``` pointing to ```http://127.0.0.1:port```.  This may be generated using the postman UI.
```
./node_modules/.bin/newman run postman/date_api.postman_collection.json -e newman/dev.postman_environment.json -k
```
The ```-k``` argument disables SSL validation, only use in development.  An environment file (specified with ```-e```) must also be used.

# Development
## Building docker image
Use the following command to build a tagged image.  This may then be run locally.
```
docker build -t date_api:X.Y.Z .
```