const Config = require("config");
const { APPLICATION_JSON } = require("../constants/app.constants");

class Proxy {
    constructor(API) {
        this.action_name = API.name;
        this.service_name = API.service;
        this.config = Config.get(`${this.service_name}`);
        this.url = this.config.url;
        this.endpoint = this.url + API.endpoint;
        this.method = API.method;
        this.encoding = this.config.encoding || null;
        this.content_json = this.config.content_type == APPLICATION_JSON ? true : false;
        this.content_type = this.config.content_type;
        this.headers = Object.assign({}, this.config.headers);
        this.headers["content-Type"] = this.config.content_type;
    }
    async log(options) {
        return new Promise(async (resolve, reject) => {
            try {
                let err = this.error && {
                    code: this.error.code,
                    message: this.error.message,
                    error: this.error.error,
                };
                const data = {
                    query_param: this.query_param || null,
                    request: this.data || null,
                    response: this.response_body || err,
                    action: this.action_name,
                    API: this.endpoint,
                    service: this.service_name,
                    raw_request: options,
                };
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Proxy;
