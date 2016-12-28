
//<!--GLOBAL ANGULAR-->

(function () {
    'use strict';
angular
.module('routerApp', ['ui.router','formly', 'formlyBootstrap', 'ngAnimate', 'ui.bootstrap', 'ngMessages', 
 'ngStorage', 'ui.grid', 'restangular', 'formly templates', 'nya.bootstrap.select', 
'rzModule', 'ui.mask', 'angular-3d-carousel', 'ui.grid.autoResize'])

.service('DB', function() {
    this.load = {
        isLoading: false,
        data: []
    };

    this.setIsLoading = function(value) {
        this.load.isLoading = value;
    };

    this.setData = function(data) {
        this.load.data = data;
    };
})

.service('dataService', ['$timeout', '$q', function($timeout, $q) {
    this.getData = function() {
        var defer = $q.defer();
        $timeout(function() {
                var fs = require('fs');
                var sql = require('sql.js');
                var filebuffer = fs.readFileSync('app/assets/football.sqlite');
                var db = new sql.Database(filebuffer);
                var agentTemp = db.prepare('SELECT * FROM Agents');
                for(var agents = []; agentTemp.step();) agents.push(agentTemp.getAsObject());
                var coachTemp = db.prepare('SELECT * FROM Coaches');
                for(var coaches = []; coachTemp.step();) coaches.push(coachTemp.getAsObject()); 
                var draftTemp = db.prepare('SELECT * FROM DraftPlayers');
                for(var draftPlayers = []; draftTemp.step();) draftPlayers.push(draftTemp.getAsObject());
                var ownerTemp = db.prepare('SELECT * FROM Owners');
                for(var owners = []; ownerTemp.step();) owners.push(ownerTemp.getAsObject());   
                var personnelTemp = db.prepare('SELECT * FROM Personnel');
                for(var personnel = []; personnelTemp.step();) personnel.push(personnelTemp.getAsObject()); 
                var rosterTemp = db.prepare('SELECT * FROM RosterPlayers');
                for(var rosterPlayers = []; rosterTemp.step();) rosterPlayers.push(rosterTemp.getAsObject());
                var teamTemp = db.prepare('SELECT * FROM Teams ORDER BY TeamName');
                for(var teams = []; teamTemp.step();) teams.push(teamTemp.getAsObject());
                var trainerTemp = db.prepare('SELECT * FROM TRAINERS');
                for(var trainers = []; trainerTemp.step();) trainers.push(trainerTemp.getAsObject());
                var DB = {};
                DB.Agents = agents;
                DB.Coaches = coaches;
                DB.DraftPlayers = draftPlayers;
                DB.Owners = owners;
                DB.Personnel = personnel;
                DB.RosterPlayers = rosterPlayers,
                DB.Teams = teams;
                DB.Trainers = trainers;
                defer.resolve(DB);
        }, 0);
        return defer.promise;
    };
}])

.run(function(DB, dataService) {
    DB.setIsLoading(true),
    dataService.getData().then(function(data) {
        DB.setData(data);
        DB.setIsLoading(false);
    });
})

.controller('loadCtrl', [ "$scope", "$interval", "DB", function loadCtrl($scope, $interval, DB) {
        
       $scope.appState =  DB.load;    
        $scope.interval = 50;

            $interval(function() {
            $scope.interval = ($scope.interval + 1);
            },1000);

}])

.config(function(formlyConfigProvider) {
    formlyConfigProvider.setType([
                
    ])
})
.config(['$stateProvider', '$urlRouterProvider', 
function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home'); 

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        //START GAME--MAIN
        .state('Start', {
            url: '/start',            
            templateUrl: 'New_Game_Wizard/new_game.html',
            controller: 'newGameCtrl',
            controllerAs: 'vm'       
        })
        //nested Start states--url will be Start/profile
        .state('Start.career', {
            url: '/career',
            templateUrl: 'New_Game_Wizard/Start/Start-career.html',
            //controller: 'careerCtrl',
            //controllerAs: 'vm'
        })
        .state('Start.career2', {
            url: '/career2',
            templateUrl: 'New_Game_Wizard/Start/Start-career2.html'
        })

        .state('Start.career3', {
            url: '/career3',
            templateUrl: 'New_Game_Wizard/Start/Start-career3.html'
        })
        //Team Selection screen
        .state('Start.teamSelect', {
            url: '/teamSelect',
            params: {model: null},
            templateUrl: 'New_Game_Wizard/Start/Start-teamSelect.html',
            controller: 'teamSelectCtrl',
            controllerAs: 'vm'
        })

        .state('Start.single', {
            parent: 'Start',
            url: '/single',
            templateUrl: 'New_Game_Wizard/Start/Start-single.html'
        })

        .state('Start.quick', {
            parent: 'Start',
            url: '/quick',
            templateUrl: 'New_Game_Wizard/Start/Start-quick.html'
        })

        .state('Start.situation', {
            parent: 'Start',
            url: '/situation',
            templateUrl: 'New_Game_Wizard/Start/Start-situation.html'
        })

        .state('Load', {
            url: '/load',
            templateUrl: 'test.html',
            controller: 'testCtrl'
        })

        .state('Exit', {
            url: '/exit',
            templateUrl: 'exit_game.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('settings', {
            // we'll get to this in a bit       
        })

        .state('menu', {

        });      
}])

.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);
})();


