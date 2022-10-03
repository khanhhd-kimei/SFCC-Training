'use strict';

var NCRHelper = require('*/cartridge/scripts/helpers/ncrHelpers');

var constants = require('*/cartridge/scripts/ncr/ncrConstants');
// var NCRConfigs = require('*/cartridge/scripts/ncr/ncrConfigs');

/**
 * Call NCR API
 * @param {string} serviceType NCR service type
 * @param {Object} requestObject The request object
 * @returns {Object} The response from API
 */
function executeCallAPI(serviceType, requestObject) {
    var service = NCRHelper.getService(serviceType);

    if (!service) {
        throw new Error('Error creating terminal service '.concat(serviceType));
    }

    service.addHeader('Content-type', 'application/json');
    service.addHeader('charset', 'UTF-8');
    var callResult = service.call(JSON.stringify(requestObject));

    if (callResult.isOk() === false) {
        throw new Error('Call error code'.concat(callResult.getError().toString(), ' Error => ResponseStatus: ').concat(callResult.getStatus(), ' | ResponseErrorText: ').concat(callResult.getErrorMessage(), ' | ResponseText: ').concat(callResult.getMsg()));
    }

    var resultObject = callResult.object;

    if (!resultObject || !resultObject.getText()) {
        throw new Error('No correct response from '.concat(serviceType, ', result: ').concat(JSON.stringify(resultObject)));
    }

    return JSON.parse(resultObject.getText());
}

/**
 * Check correct login info in NCR
 * @param {string} username The login username
 * @param {string} password The login password
 * @returns {Object} The user info or error object
 */
function authorization(username, password) {
    var loginObj = {
        username: username,
        password: password
    };
    return executeCallAPI(constants.SERVICE.AUTHORIZATION, loginObj);
}

module.exports = {
    authorization: authorization
};
