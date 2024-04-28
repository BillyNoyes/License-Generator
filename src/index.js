#!/usr/bin/env node

import fetch from 'node-fetch';
import inquirer from 'inquirer';

import fs from 'fs';

let name;
let year;

async function getLicenseData() {
  const response = await fetch('https://api.github.com/licenses');
  return await response.json();
}

async function getChosenLicenseData(url) {
  const response = await fetch(url);
  return await response.json();
}

async function promptLicenseType(licenseData) {
  const licenseNames = licenseData?.map(license => license.name);

  const answer = await inquirer.prompt({
    name: 'license_name',
    type: 'list',
    message: 'Choose a license',
    choices: [...licenseNames],
    loop: false
  });

  const chosenLicense = licenseData?.find(license => license.name === answer.license_name);

  return chosenLicense
}

async function promptName() {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter your name',
    default() {
      return 'Name';
    },
  });

  return answer.name;
}

async function promptYear() {
  const answer = await inquirer.prompt({
    name: 'year',
    type: 'input',
    message: 'Enter year',
    default() {
      return new Date().getFullYear();
    },
  });

  return answer.year;
}

function formatLicenseBody(body) {
  const formattedBody = body
    .replace("[year]", year)
    .replace("<year>", year)
    .replace("[fullname]", name)
    .replace("[name]", name)
    .replace("<name of copyright owner>", name)
    .replace("<name of author>", name);

  return formattedBody
}

// Run it with top-level await
async function init() {
  const licenseData = await getLicenseData();

  const selectedLicense = await promptLicenseType(licenseData);

  name = await promptName();
  year = await promptYear();

  const chosenLicenseData = await getChosenLicenseData(selectedLicense.url);

  const formattedLicenseBody = formatLicenseBody(chosenLicenseData?.body)

  fs.writeFileSync('LICENSE', formattedLicenseBody);
}

init();