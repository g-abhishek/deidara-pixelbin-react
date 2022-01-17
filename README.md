# Deidara

SDK generator

# To Generate files for SDK(npm package) follow below steps.

1. npm install (install required packages)
2. node index.js (generate require js files using templates)

# To Test locally

# I - install npm package locally with name pixelbin

1. cd ~/deidara/output/javascript
2. npm init
3. enter name as 'pixelbin'
4. enter main as 'pixelbin.js'
5. npm link (this will return a path -- note that)

# II - prepare test code using added code sample

1. copy content of test-code folder to some other destination.
2. npm install
3. npm link 'path-you-noted' (this will link pixelbin npm package)
4. npm run-script build (to build webpack bundle)
5. node ./dist/bundle.js (this will run bundled code -- code present in app.js file)
