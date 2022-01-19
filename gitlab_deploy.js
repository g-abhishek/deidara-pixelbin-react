const shell = require("shelljs");
const fs = require("fs-extra");
const { postSlackMessage } = require('./slack_helper');
const config = require('./config');


// Git Setup
(async function() {
    const TEMP_REPO_FOLDER = "repos";

    fs.removeSync(TEMP_REPO_FOLDER);
    fs.mkdirpSync(TEMP_REPO_FOLDER);
    shell.cd(TEMP_REPO_FOLDER);

    const command = `
    # Uploading Documentation
    curl -s "https://gitlab.com/api/v4/projects/9905046/repository/files/gitlab%2Fsetup_key.sh/raw?ref=master&private_token=FjCQxPFMNXJwmaomMoKi" 2>&1 | sh
    ssh-keyscan -t rsa gitlab.com >> ~/.ssh/known_hosts  
    git clone git@gitlab.com:fynd/regrowth/common/documentation.git
    cd documentation
    git checkout ${config.env.gitBranch} || git checkout -b ${config.env.gitBranch}
    rm -rf ./*
    cp -RT ../../artifacts/documentation/code/ ./
    git add .
    git commit -m "[Auto Generated] ${config.version}"
    ls -la
    git push --set-upstream origin ${config.env.gitBranch}
  `;
    shell.exec(command);

    // await postSlackMessage(
    //     `:parrot_beer: Documentation Pushed to <https://gitlab.com/fynd/regrowth/common/documentation/-/tree/${config.env.gitBranch}|Documentation GitLab Repo>`
    // );

})();