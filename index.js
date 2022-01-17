const fs = require("fs-extra");
const path = require("path");
const helpers = require("./utils/nunjucks.helper");

// plugin details
const pluginsDetails = require("./data/pluginAPIResponse");
const CONSTANTS = require("./constants/app.constants.js");
const HttpProxy = require("./proxy/http.proxy");
const { JAVASCRIPT } = CONSTANTS.filesPaths;
const utils = require("./utils/helper");
const { ASSETS } = require("./constants/api-suits.json");

const templatesDirName = "templates";
const templateExt = ".nunjucks";

async function renderTemplate(lang, data) {
    try {
        const templateDir = path.join(`./${templatesDirName}`, lang);

        const outputDir = path.join(__dirname, "output", lang, "plugins");
        fs.emptyDirSync(outputDir);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        let { operationSeparator, plugins } = data;

        if (["javascript"].includes(lang)) {
            const { TEMPLATES, OUTPUT } = JAVASCRIPT;
            TEMPLATES.forEach((template, index) => {
                let templateFile = path.join(__dirname, `templates/${lang}/${template}`);
                let outputFilePath = "";
                let renderData = null;
                if (templateFile.includes("plugin")) {
                    for (let pluginData of plugins) {
                        outputFilePath = path.join(
                            __dirname,
                            `output/${lang}${OUTPUT[index]}${pluginData.plugin.name}.js`,
                        );
                        renderData = helpers.nunjucksEnv.render(templateFile, {
                            data: pluginData,
                        });
                        fs.writeFileSync(outputFilePath, renderData);
                    }
                } else {
                    outputFilePath = path.join(__dirname, `output/${lang}/${OUTPUT[index]}`);
                    renderData = helpers.nunjucksEnv.render(templateFile, {
                        data: operationSeparator,
                    });
                    fs.writeFileSync(outputFilePath, renderData);
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

// get All plugins
let getAllPlugins = async() => {
    try {
        // let pluginRequest = new HttpProxy(ASSETS.PLUGIN_GET, null, null);
        // let requestData = await pluginRequest.make_request({ "x-ebg-signature": utils.signature() })
        return pluginsDetails.pluginApi;
    } catch (error) {
        throw error;
    }
};

// perform transformation
let processData = async(data) => {
    try {
        let { plugins } = data,
        pluginDetails = [];

        for (let pluginKey of Object.keys(plugins)) {
            let plugin = plugins[pluginKey];
            let operations = plugin.operations;
            let pluginFunctions = [];

            // adding plugin functions.
            for (let operation of operations) {
                let functionDetails = {
                    name: operation.method,
                    parameters: operation.params,
                    plugin: plugin.identifier,
                };
                pluginFunctions.push(functionDetails);
            }

            // add details of plugins and functions
            pluginDetails.push({
                plugin: {
                    name: plugin.name.replace(/ /g, ""),
                },
                methods: pluginFunctions,
            });
        }

        return {
            operationSeparator: data.delimiters.operationSeparator,
            plugins: pluginDetails,
        };
    } catch (error) {
        throw error;
    }
};

// main function
let main = async() => {
    try {
        let pluginsDetails = await getAllPlugins();
        let transformedData = await processData(pluginsDetails);

        let langs = ["javascript"];

        for (let index = 0; index < langs.length; index++) {
            const lang = langs[index];
            await renderTemplate(lang, transformedData);
        }
        await utils.runShellCommand("npx prettier --write ./output");
    } catch (error) {
        throw error;
    }
};

main();