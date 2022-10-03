'use strict';

var dwsystem = require('dw/system');

var currentSite = dwsystem.Site.getCurrent();

/**
 * Get value of custom preference
 * @param {string} fieldName The field name which created in preference
 * @returns {Object} return the value of the field
 */
function getCustomPreference(fieldName) {
    var customPreference = null;

    if (currentSite && currentSite.getCustomPreferenceValue(fieldName)) {
        customPreference = currentSite.getCustomPreferenceValue(fieldName);
    }

    return customPreference;
}

var ncrConfigs = {
    getNCRPrivateKey: function getAdyenEnvironment() {
        return getCustomPreference('NCR_PrivateKey').value;
    }
};

// NCR Configs
module.exports = ncrConfigs;
