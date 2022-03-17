rm -rf artifacts
rm -rf output
rm -rf test-code/node_modules
mkdir artifacts
npm install
set NODE_ENV=default
node index.js # Build Source Code in Output Directory
cp -R ./output/** artifacts
ls ./artifacts/javascript
npm i --prefix ./artifacts/javascript
npm run build --prefix ./artifacts/javascript
# node ./scripts/github_deploy.js