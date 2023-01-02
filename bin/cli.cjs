#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

//Get the name of the project from user second argument
// npx express-pg-template  <repoName>
const repoName = process.argv[2];

console.log(`Cloning the repository with name ${repoName}`);

const gitCheckoutCommand = `git clone --depth 1 https://github.com/3amr7ussein/store-front ${repoName}`;
//clone the template repo into folder with new name repoName
const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit(-1);

//go inside the created dir and run npm install to install project dependncies
const installDepsCommand = `cd ${repoName} && npm install`;
console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) process.exit(-1);

console.log('Congratulations! you are ready. Follow the following command to start');
console.log(`\n1- cd ${repoName} `);
console.log(
  `2- create .env file in ${repoName} directory & copy/paste https://github.com/3amr7ussein/.env-files/blob/main/.env `
);

console.log(
  `3- Run 'docker-compose' to Create & Start postgres container\nNote: keep the terminal running after step #3 & open a new terminal to run Project scripts`
);

console.log(`\nProject Scripts`);
console.log(`Run 'npm run test' run jasmine unit tests `);
console.log(
  `Run 'npm start' to fill database with dummy data & start project on http://localhost:4000/`
);
