import fetch from 'node-fetch';
import inquirer from 'inquirer';

/**
 * Fetches JSON data from the specified URL.
 * @param {String} url - The URL to fetch the JSON data from.
 * @returns {Object} - The JSON response.
 * @throws {Error} - If the request fails.
 */
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Prompts the user with the specified question.
 * @param {Object} question - The question object for inquirer.
 * @returns {String} - The user's answer.
 */
export async function promptUser(question) {
  const answer = await inquirer.prompt(question);
  return answer[question.name];
}
