# README

This project is a desktop client for [Basecamp](https://basecamp.com/), built on [Electron](https://github.com/electron/electron).

## Stack

* Node 16.13.0
* Electron 22.0.0

## Setup

1. Clone the project.
2. Set the right version for Node ([nvm](https://github.com/nvm-sh/nvm) is recommended).
3. Run `npm install` to install Node dependencies.
4. Run `npm start` to execute program.

## Create new Linux executable

1. Run `npm run build`.
2. Create executable by running `npm run create-installer`.

The executable will be placed on `dist/installers/`.
