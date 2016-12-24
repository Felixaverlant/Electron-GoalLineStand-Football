
//<!--GLOBAL ANGULAR-->

(function () {
    'use strict';
angular
.module('routerApp', ['ui.router','formly', 'formlyBootstrap', 'ui.bootstrap', 'ngMessages', 
'ngAnimate', 'ngStorage', 'ui.grid', 'restangular', 'formly templates', 'nya.bootstrap.select', 'rzModule', 'ui.mask'])
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

        .state('Start.career3', {
            url: '/career3',
            templateUrl: 'New Game Wizard/Start/Start-career3.html'
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


