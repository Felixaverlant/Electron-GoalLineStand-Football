(function () {
    'use strict';
angular
.module('routerApp')
.controller('newGameCtrl', function newGameCtrl($scope, $state) {
var vm = this;
vm.model = {};

$scope.ViewTeams = function(model)  {
    $state.go('Start.teamSelect', {model: model});
};
vm.fields = [
        {
            className: 'newGame animated bounceInRight',
            key: 'selectLeagueType',
            wrapper: 'panel',
            type: 'leagueType',
            templateOptions: {
                label: 'League Creation'
            },
            controller: function($scope) { //update panel titles for the next menu here based on what button is clicked
                $scope.Update = function() {
                    //removes the enter animation and adds the exit animation
                    angular.element('.newGame').removeClass('bounceInRight').addClass('bounceOutLeft');

                $scope.model.panelTitle9 = "Owner Settings";
                $scope.model.panelTitle10 = "Player Contract Settings";
            };
        },
        }
];

              
});
})();
