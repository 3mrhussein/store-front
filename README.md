<div float="left" align="middle">

# Store Front

####

</div>

<details ><summary> 
 
 ### Project Requirements 
 </summary>
 
 Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements. Create a RESTful API to be accessible to the frontend developer. You will also have written test, secured user information with encryption, and provide tokens for integration into the frontend.

</details>

  
  ### Installation
 
  
  You need to have [Node](https://nodejs.org/) & [Docker](https://www.docker.com/) installed in your machine, then you can follow one of these two ways to clone and install project dependencies.
  
  #### One way 
   - Is to open your terminal and run command `npx store-front-by-amr <Project-Name>` & follow instructions on your terminal.
  #### Another way 
   1- clone repo on `https://github.com/3amr7ussein/store-front` you local machine
   
   2- cd into project directory and run `npm install`
   
   3- create .env file in the project directory and copy/paste https://github.com/3amr7ussein/.env-files/blob/main/.env
   
   4- run `docker-compose up` & keep this terminal running
   
   5- Open new terminal and run project scripts
   
  - `npm run test` to run jasmine unit test on the project
      
  - `npm start` to fill database with dummy data & start server on http://localhost:4000
      

<details >
<summary> 
 
 ### Endpoints

 </summary>
 
 
#### Main Route

| HTTP Verbs | Endpoints | Action            |
| ---------- | --------- | ----------------- |
| GET        | /signup   | Sign Up [Page]    |
| POST       | /signup   | Create New User   |
| GET        | /signin   | Sign In [Page]    |
| POST       | /signin   | Authenticate user |
| GET        | /signout  | Remove user token |

#### `users/` Route

| HTTP Verbs | Endpoints     | Action                                               |
| ---------- | ------------- | ---------------------------------------------------- |
| GET        | /             | Users Table [Require Authentication]                 |
| GET        | /current-user | current logined user [Require Authentication]        |
| GET        | /search       | Search User By ID [Page] [Require Authentication]    |
| POST       | /:id          | Get data of user with `:id` [Require Authentication] |

#### `products/` Route

| HTTP Verbs | Endpoints           | Action                                       |
| ---------- | ------------------- | -------------------------------------------- |
| GET        | /                   | Products Table [Require Authentication]      |
| GET        | /top                | top 5 popular products                       |
| GET        | /create             | New product [Page] [Require Authentication]  |
| POST       | /create             | Add new product row [Require Authentication] |
| GET        | /search             | Search Products [Page]                       |
| GET        | /:id                | Search Product By `:id`                      |
| GET        | /category           | Find product by category [Page]              |
| GET        | /category/:category | Search Products by `:category`               |

#### `orders/` Route

| HTTP Verbs | Endpoints          | Action                                                        |
| ---------- | ------------------ | ------------------------------------------------------------- |
| GET        | /                  | Orders Table [Page]                                           |
| GET        | /create            | New Order [Page]                                              |
| POST       | /create            | Add New Order Row                                             |
| GET        | /addItem           | New Order Item [Page]                                         |
| POST       | /addItem           | Add New Order Item                                            |
| GET        | /current           | User Active Order [Page] [Require Authentication]             |
| GET        | /current/:userId   | Get User Active Order by `userId` [Require Authentication]    |
| GET        | /completed         | User Completed Order [Page] [Require Authentication]          |
| GET        | /completed/:userId | Get User Completed Order by `userId` [Require Authentication] |

</details>

### Database Schema
<img src="https://user-images.githubusercontent.com/34787413/210238932-bbdf2670-611a-48ef-87b8-2f4a01325e7f.png" width="700"/>

### Used Technologies

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

- [Postgres](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

- [Jasmine](https://jasmine.github.io/) Jasmine is a behavior-driven development framework for testing JavaScript code.

- [Docker](https://www.docker.com/) Docker’s comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.
