
//<!--GLOBAL ANGULAR-->

(function () {
    'use strict';
angular
.module('routerApp', ['ui.router', 'mgo-angular-wizard','formly', 'formlyBootstrap', 'ui.bootstrap', 'ngMessages', 
'ngAnimate', 'ngStorage', 'ui.grid', 'restangular'])
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
        
        .state('Start', {
            url: '/start',            
            templateUrl: 'New Game Wizard/new_game.html',
            controller: 'newGameCtrl',
            controllerAs: 'vm'       
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
        .state('about', {
            // we'll get to this in a bit       
        });       
}]);
})();


