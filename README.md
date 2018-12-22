# Javascript ES6 + Docker template

## Features
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.png?v=101)](https://typescriptlang.org/)
- Supports ES6 syntax out-of-the-box.
- Supports Typescript development and production use.
- Developer mode using nodemon and production mode using Docker.
- Contains ESLint for better coding.
- Designed for Javascript Standard style.


## How to use

1. Edit [package.json](./app/package.json) file (set name and description fields).
2. Add your libraries and run your app in developer mode (nodemon):
```sh
cd app/
yarn install
yarn dev
```
3. To build your code, please use:
```sh
cd app/
yarn build
```
This will compile your code and insert compiled code into the dist directory.

4. For production use, just type:
```sh
sudo docker-compose up -d
```
5. To lint code:
```sh
cd app/
yarn lint
```
