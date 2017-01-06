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
                $scope.model.panelTitle = 'Choose Career Settings';
                $scope.model.panelTitle1 = "General League Settings";
                $scope.model.panelTitle2 = "Gameday Settings";
                $scope.model.panelTitle3 = "Schedule Settings";
                $scope.model.panelTitle4 = "User Settings";
                $scope.model.panelTitle5 = "Expansion Settings";
                $scope.model.panelTitle6 = "Relocation Settings";
                $scope.model.panelTitle7 = "Draft Settings";
                $scope.model.panelTitle8 = "Financial Settings";
                $scope.model.panelTitle9 = "Owner Settings";
                $scope.model.panelTitle10 = "Player Contract Settings";
            };
        },
        }
];

              
});
})();
