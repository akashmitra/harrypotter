(function () {
    angular
        .module('hpApp', [])
        .controller('LandingCtrl', landingController);

    /**
     * Controller for Landing Page
     * @author Akash Mitra 
     * @desc Bootloader controller for angular module contains
     * the initial logic */

    function landingController($scope, $http, $window, LevelOne, SharedDataService) {
        var sc = $scope;
        sc.title = "Hello World";
        sc.score = 0;
        sc.healthscore = 100;
        sc.shieldscore = 5;

        LevelOne.startlevelone();

        // Listener for Service Broadcast
        sc.$on('handleBroadcast', function () {
            sc.score = SharedDataService.values.eggscore;
            sc.healthscore = SharedDataService.values.healthscore;
            sc.shieldscore = SharedDataService.values.shieldscore;
            sc.$apply();
        });


    }

} ());


