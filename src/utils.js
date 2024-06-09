import fetch from 'node-fetch';
import inquirer from 'inquirer';

export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return await response.json();
}

export async function promptUser(question) {
  const answer = await inquirer.prompt(question);
  return answer[question.name];
}