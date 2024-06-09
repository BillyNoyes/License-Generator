# License-Generator
# Super Simple License Generator

## Overview
Super Simple License Generator is a Node.js command-line tool for generating LICENSE files for your projects. It uses the GitHub API to fetch available license templates and allows you to customize the license with your name and the current year.

## Features
- Fetches license templates from GitHub.
- Prompts for license type, user name, and year.
- Supports command-line arguments for non-interactive usage.
- Writes the customized LICENSE file to your project directory.

## Installation
Ensure you have Node.js installed on your machine. You can install the package dependencies using npm or yarn:

- `npm install`
- or `yarn install`

## Usage
You can use the tool interactively or by passing command-line arguments.

### Interactive Mode
Run the script without any arguments to enter the interactive mode:

- `node licenseGenerator.js`

You will be prompted to choose a license, enter your name, and specify the year.

### Command-Line Arguments
You can also provide your name and year directly via command-line arguments to skip the prompts:

- `node licenseGenerator.js --name "John Doe" --year 2024`

### Help
You can display help information using:

- `node licenseGenerator.js --help`

## Configuration
The tool uses a configuration file (`config.js`) to store URLs and other configurable parameters.

## Examples

### Example 1: Interactive Mode
- `node licenseGenerator.js`

  This command will prompt you to:
  - Choose a license from the list
  - Enter your name
  - Enter the year

### Example 2: Command-Line Arguments
- `node licenseGenerator.js --name "Jane Doe" --year 2024`

  This command will generate a LICENSE file for "Jane Doe" in the year 2024 without any prompts.

## Development
### Folder Structure
- `licenseGenerator.js`: Main script file.
- `config.js`: Configuration file containing URLs and other settings.
- `utils.js`: Utility functions for fetching data and prompting user input.

### Code Style
The project follows standard JavaScript coding conventions. Please ensure your code is properly linted before submitting a pull request.

### Contributing
Feel free to open issues or submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.

## Acknowledgements
- [Node.js](https://nodejs.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [node-fetch](https://github.com/node-fetch/node-fetch)
- [Yargs](https://github.com/yargs/yargs)

## Contact
For any questions or feedback, please open an issue on GitHub.
