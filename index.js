const fs = require("fs-extra");
const path = require("path");
// const capitalize = require("capitalize");
// const _ = require("lodash");
const helpers = require("./utils/helper");
// const pythonHelper = require("./lang_helpers/python_helper");
// const validator = require("./validate_helper");
// const getAllFiles = require('get-all-files').default;
// const config = require('./config');
// const { logMessage, sendFirstMessage, postSlackMessage } = require('./slack_helper');
// const SchemaOwner = require('./schema_owner');
// const navigators = require('./navigators.json');
// const urljoin = require('url-join');
// const navPage = require("./page_type.js")
// const camelCase = require("camelcase");

// const ROOT_DOMAIN = config.ROOT_DOMAIN

// plugin details
const pluginsDetails = require('./data/pluginAPIResponse.json');
const { JAVASCRIPT } = require('./constant/app.constant.json').filesPaths;



// const allSwagger = {
//   application: {
//     info: {
//       title: "Fynd Platform's Application Side APIs",
//       version: '1.0.0',
//       description: "Go online"
//     },
//     openapi: "3.0.2",
//     paths: {},
//     components: {},
//   },
//   platform: {
//     info: {
//       title: "Fynd Platform's Platform Side APIs",
//       version: '1.0.0',
//       description: "Go online"
//     },
//     openapi: "3.0.2",
//     paths: {},
//     components: {}
//   }
// }

// const getDirectories = source =>
//   fs.readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)

const templatesDirName = "templates";
const templateExt = ".nunjucks";

// function proccesParams(parameters) {
//   const requiredParams = parameters.filter(p => p.required);
//   const optionalParams = parameters.filter(p => !p.required);
//   const query = parameters.filter(p => p.in == 'query');
//   const headers = parameters.filter(p => p.in == 'header');
//   return {
//     required: requiredParams,
//     optional: optionalParams,
//     query: query,
//     headers: headers
//   };
// }

// function processResponses(responses) {
//   const out = {
//     success: [],
//     error: [],
//     response_type: 'application/json'
//   };

//   _.forEach(responses, (res, k) => {
//     res = JSON.parse(JSON.stringify(res));
//     res.httpCode = k;
//     if (res.$ref) {
//       res.content = {
//         'application/json': {
//           schema: {
//             $ref: `${res.$ref}`
//           }
//         }
//       }
//       delete res.$ref
//     }
    
//     statusCode = parseInt(k, 10);
    
//     if (Number.isNaN(statusCode) == false && 200 <= statusCode && statusCode < 400) {
//       out.success.push(res);
//     } else {
//       out.error.push(res);
//     }
//   });

//   const firstRes = out.success[0];
//   if (firstRes) {
//     if (firstRes.content && firstRes.content['application/octet-stream']) {
//       out.response_type = 'application/octet-stream';
//     } else if (firstRes.content && firstRes.content['application/csv']) {
//       out.response_type = 'application/csv';
//     } else if (firstRes.content && firstRes.content['text/csv']) {
//       out.response_type = 'text/csv';
//     } else if (firstRes.content && firstRes.content['application/pdf']) {
//       out.response_type = 'application/pdf';
//     } else {
//       out.response_type = 'application/json';
//     }
//   } else {
//     out.response_type = 'application/json';
//   }
//   return out;
// }

// function __deriveClasses(data) {
//   return data.map(d => {
//     d.swaggerJson = d.swaggerJson || {}
//     d.swaggerJson.components = d.swaggerJson.components || {}
//       const methods = _.flatten(_.map(d.swaggerJson.paths, (__v, _path)  => {
//         return _.map(__v, (v, _method) => {
//           const parameters = v.parameters || [];
//           return {
//             operationName: v.operationId,
//             requestBody: v.requestBody,
//             path: _path,
//             method: _method,
//             parameters: parameters,
//             proccessedParams: proccesParams(parameters),
//             description: v.description || "",
//             summary: v.summary || "",
//             responses: processResponses(v.responses || {}),
//             originalResponses: v.responses,
//             tags: v.tags || [],
//           };
//         });
//       }));

//       const enums = {};
//       const schemas = {};
//       _.map(d.swaggerJson.components.schemas, (v, k) => {
//         if (v.enum) {
//           enums[k] = v;
//         } else {
//           schemas[k] = v;
//         }
//       });

//       const allSchemas = {};
//       _.map(d.swaggerJson.components.schemas, (v, k) => {
//         if (!v.enum) {
//           allSchemas[k] = v;
//         }
//       });

//       const out = {
//         className: d.className,
//         info: d.swaggerJson.info || "",
//         methods: methods || [],
//         originalSwagger: d.swaggerJson,
//         maintainers: d.maintainers,
//         enums: enums,
//         schemas: schemas,
//         allSchemas: allSchemas
//       };

//       return out;
//   });
// }

// async function resolveReferences(service) {
//   const resolvedSwagger = await helpers.resolveSwagger(service.originalSwagger);
//   service.applicationLevelAPIs = 0;
//   service.onlyCompanyLevelAPIs = 0;
//   for (let index = 0; index < service.methods.length; index++) {
//     const method = service.methods[index];
//     method.isApplicationLevelPlatfromAPI = method.path.includes('application/{application_id}')
//     if (method.isApplicationLevelPlatfromAPI) {
//       service.applicationLevelAPIs = service.applicationLevelAPIs + 1
//     } else {
//       service.onlyCompanyLevelAPIs = service.onlyCompanyLevelAPIs + 1
//     }
//     for (let index = 0; index < method.parameters.length; index++) {
//       if (!method.parameters[index].name && method.parameters[index].$ref) {
//         method.parameters[index] = resolvedSwagger.get(method.parameters[index].$ref)
//       }
//       if (method.tags.includes('Pagination')) {
//         const response = resolvedSwagger.get(method.responses.success[0].content['application/json'].schema.$ref);
//         response.required = response.required || [];
//         method.isPageOptional = !(response.required.includes('page'))
//       }
//     }
//     method.proccessedParams = proccesParams(method.parameters);
//   }
// }

// function areObjectsEqual(a, b) {
//   a = JSON.parse(JSON.stringify(a))
//   b = JSON.parse(JSON.stringify(b))

//   a.type = a.type || 'object'
//   b.type = b.type || 'object'

//   if (a.type != b.type) {
//     return false
//   }

//   a.required = a.required || [];
//   a.required = a.required.sort();

//   b.required = b.required || [];
//   b.required = b.required.sort();

//   if (!_.isEqual(a.required, b.required)) {
//     return false
//   }

//   if (!_.isEqual(Object.keys(a.properties).sort(), Object.keys(b.properties).sort())) {
//     return false
//   }

//   Object.keys(a.properties).forEach(key=> {
//     if (a.properties[key].type != b.properties[key].type || a.properties[key].$ref != b.properties[key].$ref) {
//       return false
//     }
//   })
//   return true
// }

// async function deriveClasses(swaggers) {
//   const out = {};
//   const swaggersKeys = Object.keys(swaggers)
//   for (let index = 0; index < swaggersKeys.length; index++) {
//     const k = swaggersKeys[index];
//     const x = swaggers[k];
//     const processed = __deriveClasses(x);
//     for (let index = 0; index < processed.length; index++) {
//       const element = processed[index];
//       await resolveReferences(element)
//     }
//     let uniqueModels = {}
//     for (let index = 0; index < processed.length; index++) {
//       let service = processed[index];
//       const keys = Object.keys(service.schemas)
//       for (let i = 0; i < keys.length; i++) {
//         const schemaName = keys[i];
//         if (SchemaOwner[k][schemaName]) {
//           if (SchemaOwner[k][schemaName].schema) {
//             if (!areObjectsEqual(service.schemas[schemaName], SchemaOwner[k][schemaName].schema)) {
//               // await logMessage(`:mask: *${capitalize(k)}.${service.className}.${schemaName}* is ignored, please go through https://gofynd.quip.com/JxCCAHF29HTd`, service)
//             }
//             if (service.className != SchemaOwner[k][schemaName].owner) {
//               delete service.schemas[schemaName] 
//             } else {
//               service.schemas[schemaName] = SchemaOwner[k][schemaName].schema;
//               uniqueModels[schemaName] = {
//                 serviceClassName: service.className,
//                 schema: service.schemas[schemaName]
//               }
//             }
//           } else if (service.className != SchemaOwner[k][schemaName].owner) {
//             if (uniqueModels[schemaName] && !areObjectsEqual(service.schemas[schemaName], uniqueModels[schemaName].schema)) {
//               await logMessage(`:mask: *${capitalize(k)}.${service.className}.${schemaName}* is ignored due to it's owner *${capitalize(k)}.${SchemaOwner[k][schemaName].owner}.${schemaName}*`, [...service.maintainers])
//             }
//             delete service.schemas[schemaName]  
//           } else {
//             uniqueModels[schemaName] = {
//               serviceClassName: service.className,
//               maintainers: service.maintainers,
//               schema: service.schemas[schemaName]
//             }  
//           }
//         } else if (uniqueModels[schemaName]) {
//           if (!areObjectsEqual(service.schemas[schemaName], uniqueModels[schemaName].schema)) {
//             await logMessage(`:mask: *${capitalize(k)}.${service.className}.${schemaName}* and *${capitalize(k)}.${uniqueModels[schemaName].serviceClassName}.${schemaName}* are clashing.`, [...service.maintainers, ...uniqueModels[schemaName].maintainers])
//           }
//           delete service.schemas[schemaName]
//         } else {
//           uniqueModels[schemaName] = {
//             serviceClassName: service.className,
//             maintainers: service.maintainers,
//             schema: service.schemas[schemaName]
//           }
//         }
//       }
//     }

//     out[k] = processed
//   }
  
//   return out;
// }

// async function renderDocumentation(data) {

//   "/deidara/documentation"
//   const docDir = path.join(`./${templatesDirName}`, 'documentation');
//   "deidara/output/documentation"
//   const outputDir = path.join(__dirname, "output", 'documentation');
//   // fs.emptyDirSync(outputDir);

//   data.application.forEach(swaggerClass => {
    
//     var serviceDocDir = path.join(__dirname, `output/documentation/code/application/${camelCase(swaggerClass.className)}`)
//     if (!fs.existsSync(serviceDocDir)){
//       fs.mkdirSync(serviceDocDir, { recursive: true });
//     }

//     swaggerClass.methods.forEach(thisMethod => {
    
//     let docPath = path.join(__dirname, `output/documentation/code/application/${camelCase(swaggerClass.className)}/${thisMethod.operationName}.md`)
//     let readmeTemplateFile = path.join(__dirname, docDir, `code/readme_template.nunjucks`)
//     try {
//       const d = helpers.nunjucksEnv.render(
//         readmeTemplateFile,
//         { allClasses: data,
//           docType: 'application', 
//           classData: swaggerClass, 
//           version: config.version, 
//           allSwagger: allSwagger,
//           method : thisMethod,
//           env: config.env 
//         },
//       );

//       fs.writeFileSync(docPath, d);
//     } catch(err) {
//       console.error(err);
//     }

//     });

//   });
    
//   data.platform.forEach(swaggerClass => {

//     var serviceDocDir = path.join(__dirname, `output/documentation/code/platform/${camelCase(swaggerClass.className)}`)
//     if (!fs.existsSync(serviceDocDir)){
//       fs.mkdirSync(serviceDocDir, { recursive: true });
//     }

//     swaggerClass.methods.forEach(thisMethod => {
//       let docPath = path.join(__dirname, `output/documentation/code/platform/${camelCase(swaggerClass.className)}/${thisMethod.operationName}.md`)
//       let readmeTemplateFile = path.join(__dirname, docDir, `code/readme_template.nunjucks`)
//       try {
//         const d = helpers.nunjucksEnv.render(
//           readmeTemplateFile,
//           { allClasses: data,
//             docType: 'platform',
//             classData: swaggerClass, 
//             version: config.version, 
//             allSwagger: allSwagger, 
//             method : thisMethod,
//             env: config.env 
//           },
//         );
//         fs.writeFileSync(docPath, d);
//       } catch(err) {
//         console.error(err);
//       } 
//     });

//   });

//   await fs.unlink(path.join(__dirname, 'output/documentation/code/', `readme_template.nunjucks`))
// }

// async function renderModels(langDir, data){
//   if(langDir === 'python'){
//      var appDocDir = path.join(__dirname, `output/${langDir}`, 'code/fdk_client/application')
//      var platformDocDir = path.join(__dirname, `output/${langDir}`, 'code/fdk_client/platform')
//      if (!fs.existsSync(appDocDir)){
//        fs.mkdirSync(appDocDir, { recursive: true });
//      }
//      if (!fs.existsSync(platformDocDir)){
//        fs.mkdirSync(platformDocDir, { recursive: true });
//      }

//     const bLangPath = path.join(`./${templatesDirName}`, langDir);
//     data.application.forEach(swaggerClass => {
//       for(var modelName in swaggerClass.schemas){
//         let docPath = path.join(__dirname, `output/${langDir}`, `code/fdk_client/application/models/${modelName}.py`)
//         let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/model_template.nunjucks`)
//         try {
//           const d = helpers.nunjucksEnv.render(
//             readmeTemplateFile,
//             { allClasses: data,
//               modelName: modelName,
//               modelData: swaggerClass.schemas[modelName],
//               enums: swaggerClass.enums,
//               docType: 'application', 
//               classData: swaggerClass, 
//               version: config.version, 
//               allSwagger: allSwagger, 
//               env: config.env
//             },
//           );
//           fs.writeFileSync(docPath, d);
//         } catch(err) {
//           console.error(err);
//         }
//       }
//     });

//     data.platform.forEach(swaggerClass => {
//       for(var modelName in swaggerClass.schemas){
//         let docPath = path.join(__dirname, `output/${langDir}`, `code/fdk_client/platform/models/${modelName}.py`)
//         let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/model_template.nunjucks`)
//         try {
//           const d = helpers.nunjucksEnv.render(
//             readmeTemplateFile,
//             { allClasses: data,
//               modelName: modelName,
//               modelData: swaggerClass.schemas[modelName],
//               enums: swaggerClass.enums,
//               docType: 'platform',
//               classData: swaggerClass,
//               version: config.version,
//               allSwagger: allSwagger,
//               env: config.env
//             },
//           );
//           fs.writeFileSync(docPath, d);
//         } catch(err) {
//           console.error(err);
//         }
//       }
//     });
//   }
// }

// async function renderClasses(langDir, data){
//   if(langDir === 'python'){
//      var appDocDir = path.join(__dirname, `output/${langDir}`, 'code/fdk_client/application')
//      var platformDocDir = path.join(__dirname, `output/${langDir}`, 'code/fdk_client/platform')
//      if (!fs.existsSync(appDocDir)){
//        fs.mkdirSync(appDocDir, { recursive: true });
//      }
//      if (!fs.existsSync(platformDocDir)){
//        fs.mkdirSync(platformDocDir, { recursive: true });
//      }

//     const bLangPath = path.join(`./${templatesDirName}`, langDir);
//     data.application.forEach(classData => {
//         let docPath = path.join(__dirname, `output/${langDir}`, `code/fdk_client/application/models/${classData.className}Validator.py`)
//         let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/class_template.nunjucks`)
//         try {
//           const d = helpers.nunjucksEnv.render(
//             readmeTemplateFile,
//             { allClasses: data,
//               docType: 'application',
//               classData: classData,
//               version: config.version,
//               allSwagger: allSwagger,
//               enums: classData.enums,
//               env: config.env
//             },
//           );
//           fs.writeFileSync(docPath, d);
//         } catch(err) {
//           console.error(err);
//         }
//     });

//     data.platform.forEach(classData => {
//         let docPath = path.join(__dirname, `output/${langDir}`, `code/fdk_client/platform/models/${classData.className}Validator.py`)
//         let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/class_template.nunjucks`)
//         try {
//           const d = helpers.nunjucksEnv.render(
//             readmeTemplateFile,
//             { allClasses: data,
//               docType: 'platform',
//               classData: classData,
//               version: config.version,
//               allSwagger: allSwagger,
//               enums: classData.enums,
//               env: config.env
//             },
//           );
//           fs.writeFileSync(docPath, d);
//         } catch(err) {
//           console.error(err);
//         }
//     });
//   }
// }

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
        if(templateFile.includes("plugin")) {
          for(let pluginData of plugins) {
            outputFilePath = path.join(__dirname, `output/${lang}${OUTPUT[index]}${pluginData.plugin.name}.js`);
            const renderData = helpers.nunjucksEnv.render(
              templateFile,
              {
                data : pluginData
              }
            );
            console.log(outputFilePath);
            fs.writeFileSync(outputFilePath, renderData);
          }
        } else {
          outputFilePath = path.join(__dirname, `output/${lang}/${OUTPUT[index]}`);
          const renderData = helpers.nunjucksEnv.render(
            templateFile,
            {
              data : operationSeparator
            }
          );
          console.log(outputFilePath);
          fs.writeFileSync(outputFilePath, renderData);
        }
      });

    }
  } catch(error) {
    throw(error);
  }
}

// async function renderTemplate(langDir, data) {
  
//   // global.__swagger = data;
//   const bLangPath = path.join(`./${templatesDirName}`, langDir);

//   const outputDir = path.join(__dirname, "output", langDir);
//   fs.emptyDirSync(outputDir);

//   if(langDir == 'kotlin' || langDir == 'javascript' || langDir == 'java'|| langDir == 'swift' || langDir == 'python') {
//     var appDocDir = path.join(__dirname, `output/${langDir}`, 'code/documentation/application')
//     if (!fs.existsSync(appDocDir)){
//       fs.mkdirSync(appDocDir, { recursive: true });
//     }

//     var platformDocDir = path.join(__dirname, `output/${langDir}`, 'code/documentation/platform')
//     if (!fs.existsSync(platformDocDir)){
//       fs.mkdirSync(platformDocDir, { recursive: true });
//     }

//     data.application.forEach(swaggerClass => {
//       let docPath = path.join(__dirname, `output/${langDir}`, `code/documentation/application/${swaggerClass.className.toUpperCase()}.md`)
//       let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/readme_template.nunjucks`)
//       try {
//         const d = helpers.nunjucksEnv.render(
//           readmeTemplateFile,
//           { allClasses: data,
//             docType: 'application', 
//             classData: swaggerClass, 
//             version: config.version, 
//             allSwagger: allSwagger, 
//             env: config.env 
//           },
//         );
//         fs.writeFileSync(docPath, d);
//       } catch(err) {
//         console.error(err);
//       }
//     });
    
//     data.platform.forEach(swaggerClass => {
//       let docPath = path.join(__dirname, `output/${langDir}`, `code/documentation/platform/${swaggerClass.className.toUpperCase()}.md`)
//       let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/readme_template.nunjucks`)
//       try {
//         const d = helpers.nunjucksEnv.render(
//           readmeTemplateFile,
//           { allClasses: data,
//             docType: 'platform',
//             classData: swaggerClass, 
//             version: config.version, 
//             allSwagger: allSwagger, 
//             env: config.env 
//           },
//         );
//         fs.writeFileSync(docPath, d);
//       } catch(err) {
//         console.error(err);
//       } 
//     });

//   }

//   const bLangFiles = getAllFiles.sync
//     .array(bLangPath)
//     .filter((k) => !k.includes("_macros"));

//   console.log(`\n[Generate] ${capitalize(langDir)} SDK\n`);

//   for (let index = 0; index < bLangFiles.length; index++) {
//     // await new Promise(resolve => setTimeout(resolve, 50));
//     const b = bLangFiles[index];
//     let outFilePath = "";

//     if (path.extname(b) === templateExt && !b.includes('readme_template.nunjucks')) {
//       outFilePath = path.join(
//         __dirname,
//         "output",
//         b.replace(templateExt, "").replace(`${templatesDirName}`, "")
//       );

//       fs.ensureDirSync(path.dirname(outFilePath));
//       const d = helpers.nunjucksEnv.render(
//         path.join(__dirname, b),
//         { classes: data, version: config.version, allSwagger, env: config.env, navigators },
//       );
//       fs.writeFileSync(outFilePath, d);
//     } else {
//       outFilePath = path.join(
//         __dirname,
//         "output",
//         b.replace(`${templatesDirName}`, "")
//       );
//       fs.ensureDirSync(path.dirname(outFilePath));
//       fs.copyFileSync(path.join(__dirname, b), outFilePath);
//     }
//     // console.log(`[Generate] ${b}  =>  ${outFilePath}`);
//   }

//   // if(langDir == 'kotlin'){
//   //  await renderAdditionalKotlinClasses(data)
//   // }

// }

// async function renderAdditionalKotlinClasses(data) {
//   const bLangPath = path.join(`./${templatesDirName}`, 'kotlin');
//   const mainJavaPath = 'src/main/java/com/sdk';

//   var appDocDir = path.join(__dirname, `output/kotlin/code/${mainJavaPath}/application/datamanager`)
//   if (!fs.existsSync(appDocDir)){
//     fs.mkdirSync(appDocDir, { recursive: true });
//   }

//   var platformDocDir = path.join(__dirname, `output/kotlin/code/${mainJavaPath}/platform/datamanager`)
//   if (!fs.existsSync(platformDocDir)){
//     fs.mkdirSync(platformDocDir, { recursive: true });
//   }

//   data.application.forEach(swaggerClass => {
//     let docPath = `${appDocDir}/${swaggerClass.className}DataManagerClass.kt`;
//     let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/application_data_manager_template.nunjucks`)
//     try {
//       const d = helpers.nunjucksEnv.render(
//         readmeTemplateFile,
//         { allClasses: data,
//           docType: 'application', 
//           classData: swaggerClass, 
//           version: config.version, 
//           allSwagger: allSwagger, 
//           env: config.env 
//         },
//       );
//       fs.writeFileSync(docPath, d);
//     } catch(err) {
//       console.error(err);
//     }
//   });
    
//   data.platform.forEach(swaggerClass => {
//     let docPath = `${platformDocDir}/${swaggerClass.className}DataManagerClass.kt`;
//     let readmeTemplateFile = path.join(__dirname, bLangPath, `code/_macros/platform_data_manager_template.nunjucks`)
//     try {
//       const d = helpers.nunjucksEnv.render(
//         readmeTemplateFile,
//         { allClasses: data,
//           docType: 'platform',
//           classData: swaggerClass, 
//           version: config.version, 
//           allSwagger: allSwagger, 
//           env: config.env 
//         },
//       );
//       fs.writeFileSync(docPath, d);
//     } catch(err) {
//       console.error(err);
//     } 
//   });

// }

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
        // await renderModels(lang, classes);
        // await renderClasses(lang, classes);
      }
      // await renderDocumentation(classes);
    } catch(error) {
      throw(error);
    }

};
main();



// config.fetchConfig().then(async (SwaggerConfigs) => {
//   await sendFirstMessage()
  
//   if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./artifacts');
//     SLACK_THREAD_ID =  localStorage.getItem('slack_thread_id')
//   }

//   const swaggersKeys = Object.keys(SwaggerConfigs)
//   let invalidIndices = {
//     application: [],
//     platform:[]
//   }

//   for (let index = 0; index < swaggersKeys.length; index++) {
//     const kind = swaggersKeys[index];
//     const serivces = SwaggerConfigs[kind];
//     for (let index = 0; index < serivces.length; index++) {
//       const service = serivces[index];
//       if (!service.swaggerJson) {
//         const urlStr =  urljoin(ROOT_DOMAIN, service.url, "swagger.json", service.url_suffix || '')
//         await logMessage(":scream: No Swagger found so skipping *<" + urlStr + "|" + capitalize(kind) + "." + service.className + ">* while generating SDKs", [...service.maintainers])
//         invalidIndices[kind].push(index)
//       } else {
//         if (service.className == 'Content') {
//           service.swaggerJson.components.schemas["PageType"] = navPage.PageType;
//         }
//         const errors = await validator.validateService(service, kind == 'application');
//         if (errors.length) {
//           await logMessage(":scream: Skipping *" + capitalize(kind) + "." + service.className + "* while generating SDKs due to *" + errors.length + " error" + (errors.length == 1? '*': 's*'), [...service.maintainers])
//           console.log(capitalize(kind) + "." + service.className + ".Errors: [\n  " + errors.join(",\n  ") + "\n]");
//           invalidIndices[kind].push(index)
//         } else {
//           const swaggerJson = JSON.parse(JSON.stringify(service.swaggerJson));
//           Object.keys(swaggerJson.paths || {}).forEach(path => {
//             const methods = JSON.parse(JSON.stringify(swaggerJson.paths[path]))
//             Object.values(methods).forEach(method => {  
//               method.tags = [service.className];
//               method.summary = method.operationId + " | " + method.summary
//               delete method.operationId
//             })
//             allSwagger[kind].paths[path] = methods;
//           });
//           ["schemas", "responses", "examples"].forEach(componentType => {
//             allSwagger[kind].components[componentType] = { ...allSwagger[kind].components[componentType], ...swaggerJson.components[componentType] }
//           })
//         }
//       }
//     }

//     SwaggerConfigs[kind] = serivces.filter(function(_value, index) {
//       return invalidIndices[kind].indexOf(index) == -1;
//     })  
//   }

//   if (invalidIndices.application.length > 0 || invalidIndices.platform.length > 0 ) {
//     await postSlackMessage(
//       `:octagonal_sign: Aborting SDK build due to above Errors. @regrowth-strikers-team`
//     );
//     throw new Error("Build Phase failed");
//   }

//   const classes = await deriveClasses(SwaggerConfigs);
//   makeCSVs(classes.platform, false);
//   makeCSVs(classes.application, true);
//   const langs = getDirectories(path.join(__dirname, "templates"));

//   // console.log(JSON.stringify(SwaggerConfigs, null, 4));
//   for (let index = 0; index < langs.length; index++) {
//     const lang = langs[index];
//     await renderTemplate(lang, classes);
//     await renderModels(lang, classes);
//     await renderClasses(lang, classes);
//   }
//   await renderDocumentation(classes);
// }).catch(console.log);


// function makeCSVs(classes, isApplication) {
//   classes.forEach(service => {
//     let csvInput = [];
//     service.methods.forEach(method => {
//       for (let index = 0; index < method.parameters.length || index < Object.values(method.originalResponses).length; index++) {
//         const element = method.parameters[index];
  
//         var input = []
  
//         if (index == 0) {
//           input.push(method.method || '')
//           input.push(method.path || '')
//           input.push(method.operationName || '')
//           input.push(method.summary || '')
//           input.push(method.description || '')  
//         } else {
//           input.push('')
//           input.push('')
//           input.push('')
//           input.push('')
//           input.push('')  
//         }
  
//         if (index < method.parameters.length) {
//           const parameter = method.parameters[index];
//           input.push(parameter.name || '')
//           input.push(parameter.in || '')
//           input.push(parameter.description || (parameter.schema ? parameter.schema.description: ''))  
//         } else {
//           input.push('')
//           input.push('')
//           input.push('')  
//         }

//         if (index == 0 && method.requestBody) {
//           input.push(method.requestBody.description || '')
//         } else {
//           input.push('')
//         }
  
//         const responses = Object.values(method.originalResponses);
//         if (index < responses.length) {
//           const response = responses[index];
//           input.push(response.httpCode || '')
//           input.push(response.description || '')  
//         } else {
//           input.push('')
//           input.push('')  
//         }
  
//         csvInput.push(input)  
//       }
//     });
    
//     var stringify = require('csv-stringify');
//     var fs = require('fs');

//     var input = [ [ 'API Type', 'API Path', 'Method Name', 'Summary', 'Description', 'Parameter Name', 'Parameter In', 'Parameter Description', 'Request Body Description', 'Response Code', 'Response Description'], ...csvInput];
//     const csvLocation = (isApplication ? 'application' : 'platform');
//     stringify(input, function(err, output) {
//       fs.mkdir(path.resolve('artifacts', 'csv', csvLocation), { recursive: true }, (err) => {
//         fs.writeFile(path.resolve('artifacts', 'csv', csvLocation, service.className + '.csv'), output, function (err) {
//           if (err) return console.log(err);
//         });
//       });
//     });
//   });
// }