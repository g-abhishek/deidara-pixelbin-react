const shell = require("shelljs");

(async function() {
    // With Promises:
    console.log('start!')
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./artifacts');
    SLACK_THREAD_ID = "acvv"
    SLACK_THREAD_ID = localStorage.getItem('slack_thread_id')
    const command = `echo "export SLACK_THREAD=${SLACK_THREAD_ID} BUILD_STATUS=TRUE" > ./variables.txt`
    shell.exec(command);
})();