(function () {
    'use strict';
    
    angular
        .module('hpApp')
        .factory('SharedDataService', sharedDataServices);

    function sharedDataServices($rootScope) {
        var factory = {};
        factory.values = '';

        factory.prepForBroadcast = function (msg) {
            this.values = msg;
            this.broadcastItem();
        };

        factory.broadcastItem = function () {
            $rootScope.$broadcast('handleBroadcast');
        };

        return factory;
    }

} ());