const fs = require("fs-extra");
const path = require("path");
const helpers = require("./utils/helper");

// plugin details
const pluginsDetails = require('./data/pluginAPIResponse.json');
const CONSTANTS = require('./constant/app.constant.json');
const { JAVASCRIPT } = CONSTANTS.filesPaths;

const templatesDirName = "templates";
const templateExt = ".nunjucks";

async function renderTemplate(lang, data) {
  try {
    const templateDir = path.join(`./${templatesDirName}`, lang);
    
    const outputDir = path.join(__dirname, "output", lang, "plugins");
    fs.emptyDirSync(outputDir);
    if(!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let {operationSeparator,plugins} = data

    if(['javascript'].includes(lang)) {
      const {TEMPLATES, OUTPUT} = JAVASCRIPT
      TEMPLATES.forEach((template, index) => {
        let templateFile = path.join(__dirname, `templates/${lang}/${template}`);
        let outputFilePath = "";
        let renderData = null;
        if(templateFile.includes("plugin")) {
          for(let pluginData of plugins) {
            outputFilePath = path.join(__dirname, `output/${lang}${OUTPUT[index]}${pluginData.plugin.name}.js`);
             renderData = helpers.nunjucksEnv.render(
              templateFile,
              {
                data : pluginData
              }
            );
            fs.writeFileSync(outputFilePath, renderData);
          }
        } else {
          outputFilePath = path.join(__dirname, `output/${lang}/${OUTPUT[index]}`);
          renderData = helpers.nunjucksEnv.render(
            templateFile,
            {
              data : operationSeparator
            }
          );
          fs.writeFileSync(outputFilePath, renderData);
        }
      });

    }
  } catch(error) {
    throw(error);
  }
}

// get All plugins
let getAllPlugins = async () => {
  try {
    return pluginsDetails.pluginApi;
  } catch(error) {
    throw(error);
  }
}

// perform transformation
let processData = async (data) => {
  try {
    let { plugins } = data, pluginDetails = [];
    
    for(let pluginKey of Object.keys(plugins)) {   
      
      let plugin = plugins[pluginKey];
      let operations = plugin.operations;
      let pluginFunctions = [];
      
      // adding plugin functions.
      for(let operation of operations) {
        let functionDetails = {
          name : operation.method,
          parameters : operation.params,
          plugin : plugin.identifier
        }
        pluginFunctions.push(functionDetails);
      }

      // add details of plugins and functions 
      pluginDetails.push({
        plugin : {
          name : plugin.name.replace(/ /g, ""), 
        },
        methods : pluginFunctions
      });

    }
    
    return {
      operationSeparator : data.delimiters.operationSeparator,
      plugins : pluginDetails
    };

  } catch(error) {
    throw(error);
  }
}

// main function
let main = async () => {
    try {
      let pluginsDetails = await getAllPlugins();
      let transformedData = await processData(pluginsDetails);
      
      let langs = ['javascript'];

      for (let index = 0; index < langs.length; index++) {
        const lang = langs[index];
        await renderTemplate(lang, transformedData);
      }
    } catch(error) {
      throw(error);
    }

};

main();
