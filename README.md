# Super Simple License Generator

## Overview
Super Simple License Generator is a Node.js command-line tool for generating LICENSE files for your projects. It uses the GitHub API to fetch available license templates and allows you to customize the license with your name and the current year.

## Installation
Ensure you have Node.js installed on your machine. You can install the package globally using npm or yarn:

`npm install -g node-license-generator`

or

`yarn global add node-license-generator`

## Usage
Navigate to your project directory and run the following command to generate a license:

`node-license-generator`

You will be prompted to choose a license, enter your name, and specify the year.

### Command-Line Arguments
You can also provide your name and year directly via command-line arguments to skip the prompts:

`node-license-generator --name "John Doe" --year 2024`

## Examples

### Example 1: Interactive Mode
`node-license-generator`

This command will prompt you to:
- Choose a license from the list
- Enter your name
- Enter the year

### Example 2: Command-Line Arguments
`node-license-generator --name "Jane Doe" --year 2024`

This command will generate a LICENSE file for "Jane Doe" in the year 2024 without any prompts.

## Development
Feel free to open issues or submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please open an issue on GitHub.