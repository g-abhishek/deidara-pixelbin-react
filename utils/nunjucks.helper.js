const camelCase = require("camelcase");
const config = require("config");
const nunjucks = require("nunjucks");
const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader("templates"), {
    autoescape: false,
});

nunjucksEnv.addFilter("camelCase", function(value) {
    return camelCase(value);
});

nunjucksEnv.addFilter("validateParams", function() {});

nunjucksEnv.addFilter("getHostUrl", function() {
    return config.get('SERVICE.PIXELBIN.url');
});

nunjucksEnv.addFilter("isString", function(defaultValue) {
    return typeof defaultValue == "string";
});

nunjucksEnv.addFilter("getParams", function(method) {
    if (method) {
        const requiredParams = method.proccessedParams.required.map((params) => {
            const paramObj = {};
            paramObj.name = `${camelCase(params.name)}`;
            return paramObj;
        });
        const optionalParams = method.proccessedParams.optional.map((params) => {
            const paramObj = {};
            paramObj.name = `${camelCase(params.name)}`;
            return paramObj;
        });
        if (!method.requestBody) return requiredParams.concat(optionalParams);
        return requiredParams.concat([{ name: `body` }], optionalParams);
    }
});

nunjucksEnv.addFilter("getParamsRaw", function(method) {
    if (method) {
        const requiredParams = method.proccessedParams.required.map((params) => {
            const paramObj = {};
            paramObj.name = `${camelCase(params.name)}`;
            return paramObj;
        });
        const optionalParams = method.proccessedParams.optional.map((params) => {
            const paramObj = {};
            paramObj.name = `${camelCase(params.name)}`;
            return paramObj;
        });
        if (!method.requestBody) return requiredParams.concat(optionalParams);
        return requiredParams.concat([{ name: "body" }], optionalParams);
    }
});
nunjucksEnv.addFilter("parseURLForJS", (pathURL) => {
    return pathURL
        .split("/")
        .map((word) => {
            if (word[0] === "{" && word[word.length - 1] === "}") {
                word = "$" + camelCase(word);
            }
            return word;
        })
        .join("/");
});

nunjucksEnv.addFilter("withApplicationId", function(methods) {
    const applicationMethods = methods.filter((method) => {
        const param = method.parameters.find((params) => {
            return params.name === "application_id";
        });
        return param ? true : false;
    });
    return applicationMethods;
});

nunjucksEnv.addFilter("withoutApplicationId", function(methods) {
    const applicationMethods = methods.filter((method) => {
        const param = method.parameters.find((params) => {
            return params.name === "application_id";
        });
        return param ? false : true;
    });
    return applicationMethods;
});

nunjucksEnv.addFilter("lengthArray", function(p) {
    return p.length > 0 ? true : false;
});

nunjucksEnv.addFilter("propertyName", function(p) {
    const exceptions = {
        enum: "validList",
        external: "externalLink",
    };

    return exceptions[p] || camelCase(p);
});

nunjucksEnv.addFilter("requiredParameters", function(method) {
    const hasRequired = method.parameters.some((param) => {
        return param.required;
    });
    return hasRequired || method.requestBody;
});

nunjucksEnv.addFilter("camelCase", function(p) {
    return camelCase(p);
});

nunjucksEnv.addFilter("upperSnakeCase", function(p) {
    return p.toUpperCase().replace(/-/g, "_");
});

nunjucksEnv.addFilter("upperCase", function(p) {
    return p.charAt(0).toUpperCase() + p.slice(1);
});

nunjucksEnv.addFilter("parseURLForSwift", function(p, params) {
    let enums = [];
    params = params || [];
    params.forEach((param) => {
        if (isEnum(param.schema) && param.in == "path") {
            enums.push("{" + param.name + "}");
        }
    });
    return p
        .replace(/\{([^)]+)\}/g, (l) => {
            if (enums.includes(l)) {
                return camelCase(l).replace("}", ".rawValue}");
            }
            return camelCase(l);
        })
        .replace(/\{/g, "\\(")
        .replace(/\}/g, ")");
});

nunjucksEnv.addFilter("stringify", function(p) {
    return JSON.stringify(p);
});

nunjucksEnv.addFilter("preetyStringify", function(p) {
    return JSON.stringify(p, null, 2);
});

nunjucksEnv.addFilter(
    "postmanified",
    function(swagger, callback) {
        (Converter = require("openapi-to-postmanv2")),
        Converter.convert({ type: "json", data: JSON.parse(JSON.stringify(swagger)) }, { folderStrategy: "Tags" },
            (err, conversionResult) => {
                callback(null, conversionResult.output[0].data);
            },
        );
    },
    true,
);

nunjucksEnv.addFilter("includes", function(a, b) {
    return a.includes(b);
});
nunjucksEnv.addFilter("jsDataTypeForJoi", getJSDataTypeForJoi);

function getJSDataTypeForJoi(schema, prepend) {
    if (!schema) {
        return "Joi.string().allow('')";
    }

    if (schema.type) {
        if (schema.type == "array") {
            return `Joi.array().items(${getJSDataTypeForJoi(schema.items, prepend)})`;
        }
        if (schema.type == "object") {
            if (schema.additionalProperties) {
                return `Joi.object().pattern( /\w\d/,${getJSDataTypeForJoi(
                    schema.additionalProperties,
                )})`;
            }
        }
        return ({
            string: "Joi.string().allow('')",
            number: "Joi.number()",
            integer: "Joi.number()",
            object: "Joi.any()",
            boolean: "Joi.boolean()",
        }[schema.type] + (schema.nullable ? ".allow(null)" : ""));
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref)
            return `${prepend ? prepend : "this"}.${ref.substring(ref.lastIndexOf("/") + 1)}()`;
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getJSDataTypeForJoi(refs[0], prepend);
    }
    return "Joi.any()";
}

nunjucksEnv.addFilter("jsDataTypeFromSchema", getJSDataTypeFromSchema);

function getJSDataTypeFromSchema(schema) {
    if (!schema) {
        return "any";
    }

    if (schema.type) {
        if (schema.type == "array") {
            return "Array<" + getJSDataTypeFromSchema(schema.items) + ">";
        }
        return {
            string: "string",
            number: "number",
            integer: "number",
            object: "Object",
            boolean: "boolean",
        }[schema.type];
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref) return ref.substring(ref.lastIndexOf("/") + 1);
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getDataTypeFromSchema(refs[0]);
    }
    return "Object";
}

nunjucksEnv.addFilter("schemaLinkNotationForJS", getSchemaLinkNotationForJS);

function getSchemaLinkNotationForJS(schema) {
    if (!schema) {
        return "any";
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref)
            return (
                "[" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                "](#" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                ")"
            );
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getSchemaLinkNotationForJS(refs[0]);
    }

    if (schema.type) {
        if (schema.type == "array") {
            return "[" + getSchemaLinkNotationForJS(schema.items) + "]";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties && typeof schema.additionalProperties == "object") {
                if (
                    schema.additionalProperties.type &&
                    schema.additionalProperties.type == "object"
                ) {
                    return "string";
                }
                return "[String: " + getSchemaLinkNotationForJS(schema.additionalProperties) + "]";
            } else {
                return "string";
            }
        }
        return {
            string: "string",
            number: "number",
            integer: "number",
            object: "Object",
            boolean: "boolean",
        }[schema.type];
    }

    return "any";
}

nunjucksEnv.addFilter("getMethodMockName", function(method) {
    const mapper = {
        get: "onGet",
        post: "onPost",
        delete: "onDelete",
        patch: "onPatch",
        put: "onPut",
        head: "onHead",
    };
    if (!method) {
        console.log(method);
    }
    return mapper[method];
});

nunjucksEnv.addFilter("swiftDataTypeFromSchema", getDataTypeFromSchema);

function getDataTypeFromSchema(schema) {
    if (!schema) {
        return "[String: Any]";
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref) return ref.substring(ref.lastIndexOf("/") + 1);
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getDataTypeFromSchema(refs[0]);
    }

    if (schema.type) {
        if (schema.type == "array") {
            return "[" + getDataTypeFromSchema(schema.items) + "]";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties && typeof schema.additionalProperties == "object") {
                if (
                    schema.additionalProperties.type &&
                    schema.additionalProperties.type == "object"
                ) {
                    return "[String: Any]";
                }
                return "[String: " + getDataTypeFromSchema(schema.additionalProperties) + "]";
            } else {
                return "[String: Any]";
            }
        }
        return {
            string: "String",
            number: "Double",
            integer: "Int",
            boolean: "Bool",
        }[schema.type];
    }

    return "[String: Any]";
}

nunjucksEnv.addFilter("schemaLinkNotationForSwift", getSchemaLinkNotationForSwift);

function getSchemaLinkNotationForSwift(schema) {
    if (!schema) {
        return "[String: Any]";
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref)
            return (
                "[" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                "](#" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                ")"
            );
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getSchemaLinkNotationForSwift(refs[0]);
    }

    if (schema.type) {
        if (schema.type == "array") {
            return "[" + getSchemaLinkNotationForSwift(schema.items) + "]";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties && typeof schema.additionalProperties == "object") {
                if (
                    schema.additionalProperties.type &&
                    schema.additionalProperties.type == "object"
                ) {
                    return "[String: Any]";
                }
                return (
                    "[String: " + getSchemaLinkNotationForSwift(schema.additionalProperties) + "]"
                );
            } else {
                return "[String: Any]";
            }
        }
        return {
            string: "String",
            number: "Double",
            integer: "Int",
            boolean: "Bool",
        }[schema.type];
    }

    return "[String: Any]";
}

nunjucksEnv.addFilter("swiftTypeForResponseType", getSwiftDataTypeFromResponseType);

function getSwiftDataTypeFromResponseType(responseType) {
    if (responseType == "application/pdf") {
        return "Data";
    } else if (
        responseType == "application/csv" ||
        responseType == "text/csv" ||
        responseType == "application/octet-stream"
    ) {
        return "Data";
    } else {
        return "[String: Any]";
    }
}

nunjucksEnv.addFilter("kotlinTypeForResponseType", getKotlinDataTypeFromResponseType);

function getKotlinDataTypeFromResponseType(responseType) {
    if (responseType == "application/pdf") {
        return "ResponseBody";
    } else if (
        responseType == "application/csv" ||
        responseType == "text/csv" ||
        responseType == "application/octet-stream"
    ) {
        return "ResponseBody";
    } else {
        return "String";
    }
}

nunjucksEnv.addFilter("kotlinDataTypeFromSchema", getKotlinDataTypeFromSchema);

function getKotlinDataTypeFromSchema(schema) {
    if (!schema) {
        return "Any";
    }
    if (schema.type) {
        if (schema.type == "array") {
            return "ArrayList<" + getKotlinDataTypeFromSchema(schema.items) + ">";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties) {
                return (
                    "HashMap<String," +
                    getKotlinDataTypeFromSchema(schema.additionalProperties) +
                    ">"
                );
            } else {
                return "HashMap<String,Any>";
            }
        }
        return {
            string: "String",
            number: "Double",
            integer: "Int",
            object: "HashMap<String,Any>",
            boolean: "Boolean",
        }[schema.type];
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref) return ref.substring(ref.lastIndexOf("/") + 1);
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getKotlinDataTypeFromSchema(refs[0]);
    }
    return "Any";
}

nunjucksEnv.addFilter("schemaLinkNotationForKotlin", getSchemaLinkNotationForKotlin);

function getSchemaLinkNotationForKotlin(schema) {
    if (!schema) {
        return "Any";
    }
    if (schema.type) {
        if (schema.type == "array") {
            return "ArrayList<" + getSchemaLinkNotationForKotlin(schema.items) + ">";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties) {
                return (
                    "HashMap<String," +
                    getSchemaLinkNotationForKotlin(schema.additionalProperties) +
                    ">"
                );
            } else {
                return "HashMap<String,Any>";
            }
        }
        return {
            string: "String",
            number: "Double",
            integer: "Int",
            object: "HashMap<String,Any>",
            boolean: "Boolean",
        }[schema.type];
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref)
            return (
                "[" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                "](#" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                ")"
            );
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getSchemaLinkNotationForKotlin(refs[0]);
    }
    return "Any";
}

nunjucksEnv.addFilter("schemaLinkNotationForJava", getSchemaLinkNotationForJava);

function getSchemaLinkNotationForJava(schema) {
    if (!schema) {
        return "Object";
    }
    if (schema.type) {
        if (schema.type == "array") {
            return "ArrayList<" + getSchemaLinkNotationForJava(schema.items) + ">";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties) {
                return (
                    "HashMap<String," +
                    getSchemaLinkNotationForJava(schema.additionalProperties) +
                    ">"
                );
            } else {
                return "HashMap<String,Object>";
            }
        }
        return {
            string: "String",
            number: "Double",
            integer: "Integer",
            object: "HashMap<String,Object>",
            boolean: "Boolean",
        }[schema.type];
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref)
            return (
                "[" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                "](#" +
                ref.substring(ref.lastIndexOf("/") + 1) +
                ")"
            );
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getSchemaLinkNotationForJava(refs[0]);
    }
    return "Object";
}

function isBase64(schema) {
    if (schema.format == "base64") {
        if (schema.type == "string") {
            return true;
        }
    }
    return false;
}

function isNullable(schema) {
    return schema.nullable || false;
}

nunjucksEnv.addFilter("isNullable", isNullable);

function validateDataType(schema) {
    if (schema.includes("Any")) {
        return "@RawValue " + schema;
    } else {
        return schema;
    }
}

nunjucksEnv.addFilter("isBase64Format", isBase64);

nunjucksEnv.addFilter("kotlinDataTypeValidation", validateDataType);

nunjucksEnv.addFilter("javaDataTypeFromSchema", getJavaDataTypeFromSchema);

nunjucksEnv.addFilter("getApplicationModelClass", function(schema) {
    if (schema.includes("ApplicationClient")) return schema;
    var datatypesArray = [
        "String",
        "Object",
        "Integer",
        "Double",
        "Boolean",
        "List<String>",
        "List<Double>",
        "List<Integer>",
        "HashMap<String,Object>",
    ];
    if (datatypesArray.includes(schema)) {
        return schema;
    } else {
        return "ApplicationModels." + schema;
    }
});

nunjucksEnv.addFilter("getPlatformModelClass", function(schema) {
    if (schema.includes("PlatformClient")) return schema;
    var datatypesArray = ["String", "Object", "Integer", "Double", "Boolean", "List<", "HashMap<"];
    if (datatypesArray.some((word) => schema.startsWith(word))) {
        if (schema.startsWith("List")) {
            var dataType = schema.split("<")[1];
            if (datatypesArray.some((word) => dataType.startsWith(word))) {
                return schema;
            } else {
                return "List<PlatformModels." + dataType;
            }
        }
        return schema;
    } else {
        return "PlatformModels." + schema;
    }
});

function getJavaDataTypeFromSchema(schema, model) {
    if (!schema) {
        return "Object";
    }
    if (schema.type) {
        if (schema.type == "array") {
            return "List<" + getJavaDataTypeFromSchema(schema.items) + ">";
        }
        if (schema.type == "object") {
            if (schema.additionalProperties) {
                return (
                    "HashMap<String," + getJavaDataTypeFromSchema(schema.additionalProperties) + ">"
                );
            } else {
                return "Object";
            }
        }
        return {
            string: "String",
            number: "Double",
            integer: "Integer",
            object: "Object",
            boolean: "Boolean",
        }[schema.type];
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (isEnum(schema)) return model + "." + ref.substring(ref.lastIndexOf("/") + 1);
        if (ref) return ref.substring(ref.lastIndexOf("/") + 1);
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getJavaDataTypeFromSchema(refs[0], model);
    }
    return "Object";
}

function validateJavaDataType(schema) {
    return schema;
}

nunjucksEnv.addFilter("javaDataTypeValidation", validateJavaDataType);

nunjucksEnv.addFilter("typeFilter", (arr) => arr.filter((e, t) => e.type == t));

nunjucksEnv.addFilter(
    "filterParamsForPlatformApplicationPaginator",
    getFilterParamsForPlatformApplicationPaginator,
);

function getFilterParamsForPlatformApplicationPaginator(parameters) {
    return parameters.filter((p) => (p.name != "company_id") & (p.name != "application_id"));
}

nunjucksEnv.addFilter("filterParamsForPlatformPaginator", getFilterParamsForPlatformPaginator);

function getFilterParamsForPlatformPaginator(parameters) {
    return parameters.filter((p) => p.name != "company_id");
}

nunjucksEnv.addFilter("is_object", function(obj) {
    return typeof obj == "object";
});

nunjucksEnv.addFilter("shortForm", shortForm);

function shortForm(p) {
    return p.substring(0, 2).toLowerCase();
}

nunjucksEnv.addFilter("upperCaseForGolang", upperCaseForGolang);
nunjucksEnv.addFilter("fullUpperCaseForGolang", fullUpperCaseForGolang);

function fullUpperCaseForGolang(p) {
    return p.toUpperCase();
}

function upperCaseForGolang(p) {
    let keywords = ["id", "url", "uuid", "uid", "ui", "Url", "api"];
    let splitted = [];
    if (p.includes("_")) {
        splitted = p.split("_");
    } else if (p.includes("-")) {
        splitted = p.split("-");
    } else {
        if (keywords.indexOf(p) > -1) {
            return p.toUpperCase();
        }
        return capitalize(p);
    }
    splitted.forEach((s, index) => {
        if (keywords.indexOf(s) > -1) {
            splitted.splice(index, 1, keywords[keywords.indexOf(s)].toUpperCase());
        }
    });
    return splitted.map(capitalize).join("");
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getZeroValue(schema) {
    if (!schema) {
        return "interface{}";
    }
    let zeroValueMap = {
        string: `""`,
        int: 0,
        "*map[string]interface{}": "&map[string]interface{}{}",
        bool: false,
    };
    if (getGolangDataTypeFromSchema(schema) in zeroValueMap) {
        return zeroValueMap[getGolangDataTypeFromSchema(schema)];
    }
    return `${getGolangDataTypeFromSchema(schema).replace("*", "")}{}`;
}

nunjucksEnv.addFilter("golangZeroValue", getZeroValue);

nunjucksEnv.addFilter("golangDataTypeFromSchema", getGolangDataTypeFromSchema);

function getGolangDataTypeFromSchema(schema) {
    if (!schema) {
        return "interface{}";
    }
    if (schema.type) {
        if (schema.type == "array") {
            return `[]${getGolangDataTypeFromSchema(schema.items)}`;
        }
        if (schema.type == "object") {
            if (schema.additionalProperties) {
                return "map[string]" + getGolangDataTypeFromSchema(schema.additionalProperties);
            } else {
                return "map[string]interface{}";
            }
        }
        if (schema["$ref"]) {
            const ref = schema["$ref"];
            if (ref) return `${ref.substring(ref.lastIndexOf("/") + 1)}`;
        }
        return {
            string: "string",
            number: "float64",
            integer: "float64",
            // object: "*map[string]interface{}",
            boolean: "bool",
        }[schema.type];
    }

    if (schema["$ref"]) {
        const ref = schema["$ref"];
        if (ref) return `${ref.substring(ref.lastIndexOf("/") + 1)}`;
    }

    if (schema["allOf"]) {
        const refs = schema["allOf"];
        if (refs.length) return getGolangDataTypeFromSchema(refs[0]);
    }
    return "interface{}";
}

nunjucksEnv.addFilter("parseURLForGolang", function(p, enums) {
    let pathParams = [];
    let dataTypeFormatStringMap = {
        string: "%s",
        int: "%d",
        float: "%g",
        bool: "%t",
    };
    let path = p.path;
    p.proccessedParams.required.forEach((element) => {
        if (element.in === "path") {
            let type = "";
            if (isEnum(element.schema)) {
                type = enums[getGolangDataTypeFromSchema(element.schema)].type;
            } else {
                type = getGolangDataTypeFromSchema(element.schema);
            }
            pathParams.push(upperCaseForGolang(element.name));
            path = path.replace(`{${element.name}}`, dataTypeFormatStringMap[type]);
        }
    });
    return `"${path}",` + pathParams.join(",");
});

nunjucksEnv.addFilter("parseURLForPlatformGolang", function(p, className, enums) {
    let pathParams = [];
    let dataTypeFormatStringMap = {
        string: "%s",
        int: "%d",
        float: "%g",
        bool: "%t",
    };
    let path = p.path;
    p.proccessedParams.required.forEach((element) => {
        if (element.in === "path") {
            if (element.name === "company_id" || element.name === "application_id") {
                pathParams.push(`${shortForm(className)}.${upperCaseForGolang(element.name)}`);
                path = path.replace(`{${element.name}}`, "%s");
            } else {
                let type = "";
                if (isEnum(element.schema)) {
                    type = enums[getGolangDataTypeFromSchema(element.schema)].type;
                } else {
                    type = getGolangDataTypeFromSchema(element.schema);
                }
                pathParams.push(upperCaseForGolang(element.name));
                path = path.replace(`{${element.name}}`, dataTypeFormatStringMap[type]);
            }
        }
    });
    return `"${path}",` + pathParams.join(", ");
});

function isEnum(schema) {
    if (schema && schema.$ref) {
        let schemaName = schema.$ref.substring(schema.$ref.lastIndexOf("/") + 1);

        for (let index = 0; index < __swagger.application.length; index++) {
            const service = __swagger.application[index];
            if (service.enums[schemaName]) {
                return true;
            }
        }

        for (let index = 0; index < __swagger.platform.length; index++) {
            const service = __swagger.platform[index];
            if (service.enums[schemaName]) {
                return true;
            }
        }
    }

    return false;
}
nunjucksEnv.addFilter("isEnum", isEnum);

nunjucksEnv.addFilter("paramsHaveCompanyId", function(method) {
    var exists = false;
    if (method) {
        method.parameters.forEach((parameter) => {
            if (parameter.name === "company_id") {
                exists = true;
            }
        });
    }
    return exists;
});

nunjucksEnv.addFilter("paramsHaveAppId", function(method) {
    var exists = false;
    if (method) {
        method.parameters.forEach((parameter) => {
            if (parameter.name === "application_id") {
                exists = true;
            }
        });
    }
    return exists;
});

nunjucksEnv.addFilter("filterCompanyAndAppIdParams", function(params) {
    if (params) {
        return params.filter((param) => {
            return (
                param.name != "applicationId" &&
                param.name != "application_id" &&
                param.name != "company_id" &&
                param.name != "companyId"
            );
        });
    } else {
        return [];
    }
});

// exports.resolveSwagger = resolveSwagger;
exports.nunjucksEnv = nunjucksEnv;