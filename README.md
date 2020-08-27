# Project Management System

## Prerequisites

- Node.js
- Yarn
- NPM
- PostgreSQL

## Setup

### For Backend
---
Clone the repository, install the dependencies and run the application right away.
```
$ git clone git@github.com:rahul-fabled2020/project-management-system.git <application-name>
$ cd <application-name>
$ cd project-management-system/
$ npm install
```
Make a copy of .env.example as .env and update your application details and database credentials.
Now run the migrations and seed the database. Make sure you have entered some secret key for the `JWT_SECRET`.
```
$ npm run migrate
```
Press ctrl+c twice after the table is created successfully
```
$ npm run seed
```
Press ctrl+c twice after seeding is complete.
Now, start the backend service using
```
$ npm run start
```
or
```
$ npm start
```
This will start the server at http://127.0.0.1:5000/api

### For Front End
---
Open another terminal in the location: `<application-name>/pms-front-end/`

Install the dependencies
```
$ yarn install
```
Run the application
```
$ yarn start
```

Now visit http://localhost:3000/leapfrog/pms/ from your chrome or mozilla browser

## Different User Emails to access the system

### Admin
> rahul.fabled@gmail.com

### Project Managers
> chumlung@gmail.com

> aatu@gmail.com

### Team  Leads
> shradha@gmail.com

> eliza@gmail.com

### Engineers
> lucky@gmail.com

> prashant@gmail.com

