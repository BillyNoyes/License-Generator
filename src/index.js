#!/usr/bin/env node

import fs from 'fs/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { fetchJson, promptUser } from './utils.js';
import { GITHUB_LICENSES_URL } from './config.js';

const argv = yargs(hideBin(process.argv)).argv;

/**
 * Fetches license data from the GitHub API.
 * @returns {Array} - List of license data.
 */
async function getLicenseData() {
  return await fetchJson(GITHUB_LICENSES_URL);
}

/**
 * Fetches the data for the chosen license.
 * @param {string} url - The URL to fetch the chosen license data from.
 * @returns {Object} - Chosen license data.
 */
async function getChosenLicenseData(url) {
  return await fetchJson(url);
}

/**
 * Prompts the user to enter a name or uses the argument if passed in.
 * @returns {String} - Chosen name.
 */
async function promptName() {
  if (argv.name) {
    return argv.name
  }

  const question = {
    name: 'name',
    type: 'input',
    message: 'Enter your name',
    default: 'Name',
  }

  const name = await promptUser(question);

  return name
}

/**
 * Prompts the user to enter a year or uses the argument if passed in.
 * @returns {String} - Chosen year.
 */
async function promptYear() {
  if (argv.year) {
    return argv.year
  }

  const question = {
    name: 'year',
    type: 'input',
    message: 'Enter year',
    default: new Date().getFullYear(),
  }

  const year = await promptUser(question);

  return year
}

/**
 * Prompts the user to select a license type.
 * @param {Array} licenseData - List of available licenses.
 * @returns {Object} - Chosen license.
 */
async function promptLicenseType(licenseData) {
  const licenseNames = licenseData.map(license => license.name);

  const question = {
    name: 'license_name',
    type: 'list',
    message: 'Choose a license',
    choices: licenseNames,
    loop: false,
  };

  const chosenLicenseName = await promptUser(question);

  const chosenLicense = licenseData.find(license => license.name === chosenLicenseName);

  return chosenLicense;
}

async function promptPackageJsonUpdate(selectedLicense) {
  const question = {
    name: 'update_package_json',
    type: 'confirm',
    message: 'Do you want to update the package.json License field?',
  }

  const updateLicenseField = await promptUser(question);

  if (!updateLicenseField) {
    return;
  }

  const packageJsonPath = './package.json';
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  packageJson.license = selectedLicense.spdx_id;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

/**
 * Formats the license body with the user's name and year.
 * @param {String} body - The body of the license.
 * @param {String} name - User's name.
 * @param {String} year - Current year.
 * @returns {String} - Formatted license body.
 */
function formatLicenseBody(body, name, year) {
  const formattedBody = body
    .replace(/\[year\]|\<year\>/g, year)
    .replace(/\[fullname\]|\[name\]|\<name of copyright owner\>|\<name of author\>/g, name);

  return formattedBody;
}

/**
 * Initializes the license generation process.
 */
async function init() {
  try {
    const licenseData = await getLicenseData();
    const selectedLicense = await promptLicenseType(licenseData);

    const name = await promptName();
    const year = await promptYear();

    const chosenLicenseData = await getChosenLicenseData(selectedLicense.url);
    const formattedLicenseBody = formatLicenseBody(chosenLicenseData.body, name, year);

    await fs.writeFile('LICENSE', formattedLicenseBody);
    console.log('LICENSE file has been created successfully.');

    await promptPackageJsonUpdate(selectedLicense);
    console.log('package.json License field has been updated successfully.');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the initialization function
init();