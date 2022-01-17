const hash = require("hash");
const { exec } = require('child_process');


module.exports = {
    getDate() {
        return this.getDateTime().substr(0, 8);
    },

    signature() {
        let kCredentials = "1234567";
        let strTosign = this.stringToSign();
        return `v1:${hmac(kCredentials, strTosign, "hex")}`;
    },

    stringToSign() {
        return [this.getDateTime(), hash(this.canonicalString(), "hex")].join("\n");
    },

    getDateTime() {
        if (!this.datetime) {
            let date = new Date();
            this.datetime = date.toISOString().replace(/[:\-]|\.\d{3}/g, "");
        }
        return this.datetime;
    },

    async runShellCommand(cmd) {
        return new Promise(function(resolve, reject) {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });
    }
};