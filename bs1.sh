mkdir artifacts
npm install
set NODE_ENV=default
node index.js # Build Source Code in Output Directory
cp -R ./output/** artifacts
ls ./artifacts/javascript
node github_deploy.js