<div float="left" align="middle"> 
 

 #  Store Front

####
</div>



<details ><summary> 
 
 ### Project Requirements 
 </summary>
 
 Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements. Create a RESTful API to be accessible to the frontend developer. You will also have written test, secured user information with encryption, and provide tokens for integration into the frontend.


</details>
<details open ><summary> 
  
  ### Installation
  </summary>
  
  You need to have Node & Docker installed in your machine, then you can follow one of these two ways to clone and install project dependencies.
  
  #### One way 
   - Is to open your terminal and run command `npx store-front-by-amr <Project-Name>` & follow instructions on your terminal.
  #### Another way 
   1- clone repo on `https://github.com/3amr7ussein/store-front` you local machine
   
   2- cd into project directory and run `npm install`
   
   3- run `docker-compose up` & keep this terminal running
   
   4- Open new terminal and run project scripts
   
  - `npm run test` to run jasmine unit test on the project
      
  - `npm start` to start server on http://localhost:4000
      
  
</details  >

 

  
### API Endpoints

    
  
  | HTTP Verbs | Endpoints             | Action                                                                         |
  | ---------- | --------------------- | ------------------------------------------------------------------------------ |
  | GET        | /signup               | Sign Up Page                                                                   |
  | POST       | /signup               | Create New User                                           |
  | GET        | /signin                | sign in page |
  | POST       | /signin         | Authenticate user                                         |




  
  
### Used Technologies

  - [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

  - [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

  - [ReactJs](https://reactjs.org/) A JavaScript library for building user interfaces

  - [axios](https://axios-http.com/docs/intro/) Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase).
    
