# Deidara

SDK generator

## To Generate files for SDK(npm package) follow below steps.

1. npm install (install required packages)
2. ensure to update version in config file.
3. ./bs1.sh or try on git lab ci. (this will generate template files and publish a node package on npm)
4. `umd` bundle is generated in the folder: `/artifacts/javascript/dist/`


## To run the tests on the generated package, 
1. `cd` into `artifacts/javascript` folder, i.e. the package location.
2. Run `npm link` at the package location.
3. `cd` into the `test-code` folder in the project root.
4. Run `npm link <package-name-with-scope>` to link the locally generated package.
5. Run `npm i`.
6. Run `npm test` to run the tests. 
