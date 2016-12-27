
//<!--GLOBAL ANGULAR-->

(function () {
    'use strict';
angular
.module('routerApp', ['ui.router','formly', 'formlyBootstrap', 'ui.bootstrap', 'ngMessages', 
'ngAnimate', 'ngStorage', 'ui.grid', 'restangular', 'formly templates', 'nya.bootstrap.select', 
'rzModule', 'ui.mask'])
.constant('db', function() {
    //declare the main db and load it for use at anytime throughout the program
    var fs = require('fs');
    var sql = require('sql.js');
    var filebuffer = fs.readFileSync('app/assets/football.sqlite');
    var db = new sql.Database(filebuffer);
    return { //return each table---useage: db.Agents
        Agents: db.exec('SELECT * FROM Agents'),
        Coaches: db.exec('SELECT * FROM Coaches'),
        DraftPlayers: db.exec('SELECT * FROM DraftPlayers'),
        Owners: db.exec('SELECT * FROM Owners'),
        Personnel: db.exec('SELECT * FROM Personnel'),
        RosterPlayers: db.exec('SELECT * FROM RosterPlayers'),
        Teams: db.exec('SELECT * FROM Teams'),
        Trainers: db.exec('SELECT * FROM Trainers')
    };
})
.config(function(formlyConfigProvider) {
    formlyConfigProvider.setType([
                
    ])
})
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
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
            templateUrl: 'New Game Wizard/new_game.html',
            controller: 'newGameCtrl',
            controllerAs: 'vm'       
        })
        //nested Start states--url will be Start/profile
        .state('Start.career', {
            url: '/career',
            templateUrl: 'New Game Wizard/Start/Start-career.html',
            //controller: 'careerCtrl',
            //controllerAs: 'vm'
        })
        .state('Start.career2', {
            url: '/career2',
            templateUrl: 'New Game Wizard/Start/Start-career2.html'
        })

        .state('Start.single', {
            parent: 'Start',
            url: '/single',
            templateUrl: 'New Game Wizard/Start/Start-single.html'
        })

        .state('Start.quick', {
            parent: 'Start',
            url: '/quick',
            templateUrl: 'New Game Wizard/Start/Start-quick.html'
        })

        .state('Start.situation', {
            parent: 'Start',
            url: '/situation',
            templateUrl: 'New Game Wizard/Start/Start-situation.html'
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


