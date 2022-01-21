const shell = require("shelljs");
const fs = require("fs-extra");
const capitalize = require("capitalize");
// const { postSlackMessage } = require('./slack_helper');
const config = require('config');


// Git Setup
(async function() {
    const TEMP_REPO_FOLDER = "repos";

    // Setup Repo Folder
    fs.removeSync(TEMP_REPO_FOLDER);
    fs.mkdirpSync(TEMP_REPO_FOLDER);
    shell.cd(TEMP_REPO_FOLDER);
    console.log(`[SDK Builder] Repo Directory Ready`);
    const GitSetupCommand = [
        `git config --global user.email "baranwal.adi@gmail.com"`,
        `git config --global user.name "Aditya-Baranwal"`,
        `git config pager.diff false`,
    ].join("\n");
    shell.exec(GitSetupCommand);

    console.log(`[SDK Builder] GitSetup Done`);


    const sdkList = ["javascript"];

    // await postSlackMessage(
    //     `:thinking_face: Will start uploading SDK for ${sdkList.map(x => capitalize(x)).join(', ')}`
    // );

    const { GITHUB_USERNAME, GITHUB_PERSONAL_TOKEN } = process.env;
    const { JS_SDK_USERNAME, JS_SDK_TOKEN } = process.env;
    let cloneCommand;
    for (let index = 0; index < sdkList.length; index++) {
        cloneCommand = `git clone https://Aditya-Baranwal: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@github.com/Aditya-Baranwal/test-push.git`;
        // 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
        const command = `
              # ${capitalize(sdkList[index])}
              echo "Deploying ${capitalize(sdkList[index])} SDK on Github"
              ${cloneCommand}
              git remote -v
              cd test-push
              git checkout ${config.env.gitBranch} || git checkout -b ${config.env.gitBranch}
              rm -rf ./*
              pwd
              ls -la
              cp -R ../../artifacts/${sdkList[index]}/ .
              git config --get remote.origin.url
              git add .
              git commit -m "[Auto Generated] ${config.version}"
              ls -la
              git push --set-upstream https://test-push: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@github.com/Aditya-Baranwal/test-push.git ${config.env.gitBranch}
              
            `;
        console.log(`[SDK Builder] ${sdkList[index]}`);
        shell.exec(command);
        // await postSlackMessage(
        //     `:parrot_beer: SDK Pushed to <https://github.com/gofynd/fdk-client-${sdkList[index]}/tree/${config.env.gitBranch}|*fdk-client-${sdkList[index]}* Github Repo>`
        // );
    }
})();