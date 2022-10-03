'use strict';
var base = module.superModule;

var NCRAccount = require('*/cartridge/scripts/ncr/ncrAccount');

/**
 *
 * @param {string} email - ncr customer email address
 * @param {string} password - ncr customer password
 * @returns {Object} customerLoginResult
 */
function NCRAuthorization(email, password) {
    return NCRAccount.authorization(email, password);
}

base.ncrAuthorization = NCRAuthorization;

module.exports = base;
