"use strict";
exports.__esModule = true;
function test(config) {
    return function (target, methodName, descriptor) {
        var configInternal = {};
        if (typeof config === 'string') {
            configInternal = { description: config };
        }
        else {
            Object.assign(configInternal, config);
        }
        if (!configInternal || !configInternal.params || configInternal.params.length === 0) {
            executeTest(descriptor, configInternal);
            return descriptor;
        }
        configInternal.params.forEach(function (testConfig, i) {
            if (!testConfig.description && configInternal && configInternal.description) {
                testConfig.description = configInternal.description;
            }
            executeTest(descriptor, configInternal, testConfig, i);
        });
        return descriptor;
    };
}
exports.test = test;
function executeTest(descriptor, config, params, index) {
    describe(createDescription(descriptor, index, config, params), function () {
        it(createParameters(params), function () {
            descriptor.value(params);
        });
    });
}
function createDescription(descriptor, index, config, params) {
    var indexText = (index || index === 0 ? "\n\tCase Index: " + index : '');
    if ((!config && !params) ||
        (config && !params && !config.description) ||
        (!config && params && !params.description) ||
        (config && params && !params.description && !config.description)) {
        return "\tTest: " + descriptor.value.name.replace(/_/g, ' ') + indexText;
    }
    if (config && config.description && params && params.description) {
        return "\tTest: " + config.description + " - " + params.description + indexText;
    }
    if (config && config.description && (!params || !params.description)) {
        return "\tTest: " + config.description + indexText;
    }
    if ((!config || !config.description) && params && params.description) {
        return "\tTest: " + params.description + indexText;
    }
    return '';
}
function createParameters(config) {
    var clonedCase = Object.assign({}, config);
    delete clonedCase.description;
    return config ? "\n\tParameters: " + JSON.stringify(clonedCase).replace(/"/g, '') : '';
}
