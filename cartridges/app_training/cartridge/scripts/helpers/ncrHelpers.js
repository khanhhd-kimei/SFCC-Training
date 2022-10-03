'use strict';

var dwsvc = require('dw/svc');

var dwsystem = require('dw/system');

var ncrHelperObj = {
    getService: function getService(service, method) {
        var ncrService = null;

        try {
            ncrService = dwsvc.LocalServiceRegistry.createService(service, {
                createRequest: function createRequest(svc, args) {
                    svc.setRequestMethod(method || 'POST');
                    svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
                    svc.addHeader('charset', 'UTF-8');
                    if (args) {
                        return args;
                    }

                    return null;
                },
                parseResponse: function parseResponse(svc, client) {
                    return client;
                },
                filterLogMessage: function filterLogMessage(msg) {
                    return msg;
                }
            });
            dwsystem.Logger.getLogger('NCR', 'getService').debug('Successfully retrive service with name {0}', service);
        } catch (error) {
            dwsystem.Logger.getLogger('NCR', 'getService').error("Can't get service instance with name {0}", service);
        }
        return ncrService;
    }
};

module.exports = ncrHelperObj;
