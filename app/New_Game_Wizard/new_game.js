(function () {
    'use strict';
angular
.module('routerApp')
.config(function(formlyConfigProvider) {
    formlyConfigProvider.setType([
        {
        name: 'leagueType',
        template: ` <h4><b>Please select the type of league you'd like to create:</b></h4>                  
                    <div class="row">
                        <div class="col-md-5"></div>
                        <a><button type="submit" class="btn btn-lg btn-primary career pull-left" tooltip-placement="left" ng-click="model.Mode = 'career'; Update(model.Mode)" 
                         ui-sref=".career" uib-tooltip="Career Mode allows unlimited seasons and is the most in-depth mode. Drafts, retirements, hall of fame inductions, and much more happen.">
                        Career Simulation</button></a>                              
                    </div>
                    <hr/>
                    <div class="row">    
                        <div class="col-md-5"></div>
                        <a><button type="submit" class="btn btn-lg btn-primary single pull-left" tooltip-placement="left" ng-click="model.Mode ='single'" ui-sref-active="active"
                         ui-sref=".single" uib-tooltip="Single Season Mode allows you take control of your favorite team for a season. How good of a GM are you?  Can you win the Super Bowl?">Single Season</button></a>          
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-md-5"></div>
                        <a><button class="btn btn-lg btn-primary quick pull-left" tooltip-placement="left" ng-click="model.Mode = 'quick'" ui-sref-active="active" ui-sref=".quick"
                        uib-tooltip="Quick Game Mode allows you to choose two teams and begin playing a regular season game.">Quick Game</button></a>
                    </div>
                        <hr/>
                    <div class="row">
                        <div class="col-md-5"></div>
                        <a><button class="btn btn-lg btn-primary situation pull-left" tooltip-placement="left" ng-click="model.Mode='situation'" ui-sref-active="active" ui-sref=".situation"
                        uib-tooltip="Re-live some of the greatest situations in football history. The game hangs in the balance.  Can you change history or will you be doomed to repeat it?">Situational Drills</button></a>                       
                    </div>                    
                    </div>`           
        },
    ])
})
.controller('teamSelectCtrl', ['$scope', '$stateParams', '$uibModal', 'DB',
function teamSelectCtrl ($scope, $stateParams, $uibModal, DB) {

    //DB is the database service object holding all the tables
    var vm = this;
    //TODO: load this from SQL lite service
    $scope.teamSelected = 'Arizona Cardinals'; //starts out as default team
    $scope.teamId = 29; //default ID for Arizona
    vm.model = $stateParams.model; //retrieves the model passed in by the state

    vm.model.teamSelected = $scope.teamSelected;

//opens the roster of this team, loaded via sqlite;
    $scope.ViewRoster = function(teamSelected, teamId) {
        var roster = [];
        var modalInstance = $uibModal.open({

            template: `     
                            <div class="modal-header" >
                                <h3 class="modal-title" id="modal-title">{{teamSelected}} Roster</h3>
                            </div>
                            <div class="modal-body" id="modal-body">
                                <div id="grid1" ui-grid="gridOptions" class="grid"></div>
                            </div>
                       `,
            controller: function($rootScope, $scope, $interval) {
                //var grid;
                //$scope.hideGrid = true;
                $scope.gridOptions = {
                    onRegisterApi: function(gridApi) {
                        $scope.gridApi = gridApi;
                        
                        $interval(function () {
                            $scope.gridApi.core.handleWindowResize();
                        }, 500, 10);
                    },
                    enableSorting: true,
                    columnDefs: [
                        {name: 'FName', displayName: 'First Name', width: '15%'},
                        {name: 'LName', displayame: 'Last Name', width: '15%'},
                        {name: 'College', width: '15%'},
                        {name: 'Age', width: '6%'},
                        {name: 'Height', width: '6%'},
                        {name: 'Weight', width: '7%'},
                        {name: 'ArmLength', displayName: 'Arm Length', width: '7%'},
                        {name: 'HandSize', displayName: 'Hand Size', width: '7%'},
                        {name: 'Pos', width: '6%'},
                        {name: 'PosType', displayName: 'Position Type', width: '15%'}
                    ]
                };
                              
                $scope.gridOptions.data = roster;
            },
            resolve: {
               roster: function() {
                   return angular.forEach(DB.load.data.RosterPlayers, function(value, key) {
                    if(value.TeamID === teamId) {
                        roster.push({FName: value.FName, LName: value.LName, College: value.College, Age: value.Age,
                        Height: value.Height, Weight: value.Weight, ArmLength: value. ArmLength, HandSize: value.HandLength,
                        Pos: value.Pos, PosType: value.PosType});
                    };
                });
               } 
            },
            size: 'lg'  
        })
    }

vm.sides = [];
  
  //load the teams from the DB.Teams object
    angular.forEach(DB.load.data.Teams, function(value, key) {
        vm.sides.push({image: value.TeamLogoPath, teamID: value.TeamID, title: value.TeamName + ' ' + value.TeamNickname, 
        listItems: ['Offense Rating: 85', 'Defense Rating: 88', 'Special Teams Rating: 79']});
    });

  /*vm.sides = [      
        {image: 'New_Game_Wizard/assets/Arizona_Cardinals3.jpg', teamID: 29, title: 'Arizona Cardinals', listItems: ['Offense Rating: 85', 'Defense Rating: 88', 'Special Teams Rating: 79']},
        {image: 'New_Game_Wizard/assets/Atlanta_Falcons2.jpg', teamID: 26, title: 'Atlanta Falcons', listItems: ['Offense Rating: 98', 'Defense Rating: 81', 'Special Teams Rating: 77']},
        {image: 'New_Game_Wizard/assets/Baltimore-Ravens-3.jpg', teamID: 7, title: 'Baltimore Ravens', listItems: ['Offense Rating: 78', 'Defense Rating: 95', 'Special Teams Rating: 83']},
        {image: 'New_Game_Wizard/assets/Buffalo_Bills02.jpg', teamID: 1, title: 'Buffalo Bills', listItems: ['Offense Rating: 88', 'Defense Rating: 82', 'Special Teams Rating: 83']},
        {image: 'New_Game_Wizard/assets/Carolina_Panthers2.jpg', teamID: 25, title: 'Carolina Panthers', listItems: ['Offense Rating: 83', 'Defense Rating: 86', 'Special Teams Rating: 82']},
        {image: 'New_Game_Wizard/assets/Chicago-Bears-3.jpg', teamID: 24, title: 'Chicago Bears', listItems: ['Offense Rating: 72', 'Defense Rating: 75', 'Special Teams Rating: 76']},
        {image: 'New_Game_Wizard/assets/Cincinnati_Bengals3.jpg', teamID: 5, title: 'Cincinnati Bengals', listItems: ['Offense Rating: 80', 'Defense Rating: 85', 'Special Teams Rating: 80']},
        {image: 'New_Game_Wizard/assets/Cleveland_Browns2.jpg', teamID: 8, title: 'Cleveland Browns', listItems: ['Offense Rating: 72', 'Defense Rating: 70', 'Special Teams Rating: 71']},
        {image: 'New_Game_Wizard/assets/Dallas_Cowboys3.jpg', teamID: 20, title: 'Dallas Cowboys', listItems: ['Offense Rating: 95', 'Defense Rating: 88', 'Special Teams Rating: 86']},
        {image: 'New_Game_Wizard/assets/Denver_Broncos2.jpg', teamID: 13, title: 'Denver Broncos', listItems: ['Offense Rating: 78', 'Defense Rating: 97', 'Special Teams Rating: 85']},
        {image: 'New_Game_Wizard/assets/detroit-lions-3.jpg', teamID: 23, title: 'Detroit Lions', listItems: ['Offense Rating: 86', 'Defense Rating: 84', 'Special Teams Rating: 82']},
        {image: 'New_Game_Wizard/assets/Green_Bay_Packers5.jpg', teamID: 22, title: 'Green Bay Packers', listItems: ['Offense Rating: 91', 'Defense Rating: 84', 'Special Teams Rating: 82']},
        {image: 'New_Game_Wizard/assets/Houston_Texans2.jpg', teamID: 9, title: 'Houston Texans', listItems: ['Offense Rating: 79', 'Defense Rating: 98', 'Special Teams Rating: 92']},
        {image: 'New_Game_Wizard/assets/Indianapolis_Colts2.jpg', teamID: 10, title: 'Indianapolis Colts', listItems: ['Offense Rating: 86', 'Defense Rating: 74', 'Special Teams Rating: 78']},
        {image: 'New_Game_Wizard/assets/Jacksonville_Jaguars2.jpg', teamID: 11, title: 'Jacksonville Jaguars', listItems: ['Offense Rating: 79', 'Defense Rating: 89', 'Special Teams Rating: 80']},
        {image: 'New_Game_Wizard/assets/Kansas_City_Chiefs3.jpg', teamID: 14, title: 'Kansas City Chiefs', listItems: ['Offense Rating: 84', 'Defense Rating: 92', 'Special Teams Rating: 90']},
        {image: 'New_Game_Wizard/assets/LARams2.png', teamID: 31, title: 'Los Angeles Rams', listItems: ['Offense Rating: 70', 'Defense Rating: 83', 'Special Teams Rating: 75']},
        {image: 'New_Game_Wizard/assets/Miami_Dolphins2.jpg', teamID: 4, title: 'Miami Dolphins', listItems: ['Offense Rating: 86', 'Defense Rating: 85', 'Special Teams Rating: 85']},
        {image: 'New_Game_Wizard/assets/Minnesota_Vikings_2013_06.jpg', teamID: 21, title: 'Minnesota Vikings', listItems: ['Offense Rating: 79', 'Defense Rating: 88', 'Special Teams Rating: 82']},
        {image: 'New_Game_Wizard/assets/New_England_Patriots2.jpg', teamID: 2, title: 'New England Patriots', listItems: ['Offense Rating: 98', 'Defense Rating: 89', 'Special Teams Rating: 92']},
        {image: 'New_Game_Wizard/assets/New_Orleans_Saints2.jpg', teamID: 27, title: 'New Orleans Saints', listItems: ['Offense Rating: 98', 'Defense Rating: 70', 'Special Teams Rating: 72']},
        {image: 'New_Game_Wizard/assets/New_York_Giants5.jpg', teamID: 19, title: 'New York Giants', listItems: ['Offense Rating: 86', 'Defense Rating: 85', 'Special Teams Rating: 83']},
        {image: 'New_Game_Wizard/assets/New_York_Jets2.jpg', teamID: 3, title: 'New York Jets', listItems: ['Offense Rating: 73', 'Defense Rating: 75', 'Special Teams Rating: 75']},
        {image: 'New_Game_Wizard/assets/Oakland_Raiders2.jpg', teamID: 15, title: 'Oakland Raiders', listItems: ['Offense Rating: 94', 'Defense Rating: 74', 'Special Teams Rating: 86']},
        {image: 'New_Game_Wizard/assets/Philadelphia_Eagles2.jpg', teamID: 18, title: 'Philadelphia Eagles', listItems: ['Offense Rating: 80', 'Defense Rating: 89', 'Special Teams Rating: 84']},
        {image: 'New_Game_Wizard/assets/Pittsburgh_Steelers2.jpg', teamID: 6, title: 'Pittsburgh Steelers', listItems: ['Offense Rating: 88', 'Defense Rating: 84', 'Special Teams Rating: 84']},
        {image: 'New_Game_Wizard/assets/San_Diego_Chargers5.jpg', teamID: 16, title: 'San Diego Chargers', listItems: ['Offense Rating: 89', 'Defense Rating: 82', 'Special Teams Rating: 82']},
        {image: 'New_Game_Wizard/assets/San_Francisco_49ers04.jpg', teamID: 32, title: 'San Francisco 49ers', listItems: ['Offense Rating: 73', 'Defense Rating: 70', 'Special Teams Rating: 71']},
        {image: 'New_Game_Wizard/assets/Seattle_Seahawks2_2012.jpg', teamID: 30, title: 'Seattle Seahawks', listItems: ['Offense Rating: 84', 'Defense Rating: 93', 'Special Teams Rating: 86']},
        {image: 'New_Game_Wizard/assets/Tampa_Bay_Buccaneers2.jpg', teamID: 28, title: 'Tampa Bay Buccaneers', listItems: ['Offense Rating: 84', 'Defense Rating: 88', 'Special Teams Rating: 83']},
        {image: 'New_Game_Wizard/assets/Tennessee_Titans2.jpg', teamID: 12, title: 'Tennessee Titans', listItems: ['Offense Rating: 89', 'Defense Rating: 84', 'Special Teams Rating: 81']},
        {image: 'New_Game_Wizard/assets/Washington_Redskins2.jpg', teamID: 17, title: 'Washington Redskins', listItems: ['Offense Rating: 91', 'Defense Rating: 83', 'Special Teams Rating: 85']},
       
    ] */      

    console.log($scope);    

}])
.controller('newGameCtrl', function newGameCtrl($scope, $state) {
var vm = this;
vm.model = {};

$scope.ViewTeams = function(model)  {
    $state.go('Start.teamSelect', {model: model});
};
vm.fields = [
        {
            className: 'newGame',
            key: 'selectLeagueType',
            wrapper: 'panel',
            type: 'leagueType',
            templateOptions: {
                label: 'League Creation'
            },
            controller: function($scope) { //update panel titles for the next menu here based on what button is clicked
                $scope.Update = function(gameMode) {
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
                $scope.model.panelTitle10 = "Player Contract Settings"
            }
        },
        }
];

vm.careerLeague = [
    {
        className: 'display-flex settings',
        fieldGroup: [
        {
            className: 'flex-1 leagueSettings',
            key: 'StartYear',
            type: 'input',
            defaultValue: 2016,
            templateOptions: {
            label: 'Start Year',
            type: 'numeric'
        }
        },
        {
            className: 'flex-1 animate-show',
            key: 'LeagueRules',
            type: 'nya-bootstrapSelect',
            defaultValue: 'NFL',
            templateOptions: {
                label: 'League Rules',
                labelProp: 'value',
                valueProp: 'value',
                options: [
                    {value: 'NFL', id: 'NFL'},
                    {value: 'CFL', id: 'CFL'},
                    {value: 'College', id: 'College'},
                    {value: 'Arena', id: 'Arena'}
                ]
            }
        },
        {
            className: 'flex-1 leagueSettings animate-show',
            key: 'FieldType',
            type: 'nya-bootstrapSelect',
            defaultValue: 'Modern NFL',
            templateOptions: {
                label: 'Field Type',
                labelProp: 'value',
                valueProp: 'value',
                options: [
                    {value: 'Modern NFL', id: 'FTMN'},
                    {value: 'Old NFL', id: 'FTON'},
                    {value: 'CFL', id: 'FTCFL'},
                    {value: 'College', id: 'FTCol'},
                    {value: 'Arena', id: 'FTAr'}
                ]
            }             
        },
               
        {
           //wrapper: 'panel',
            className: 'flex-1',
            key: 'NumTeams',
            type: 'input',
            defaultValue: 32,
            templateOptions: {
                label: 'Number of Teams',
                type: 'numeric',
                placeholder: 'Between 8-48 teams',
                min: 8,
                max: 48
            }
        },
        {
            className: 'flex-1',
            key: 'NumConf',
            type: 'nya-bootstrapSelect',
            defaultValue: '2',
            templateOptions: {
                label: 'Number of Conferences',
                labelProp: 'value',
                valueProp: 'value',
                options: [
                    {value: '2', id: 'conf2'},
                    {value: '0', id: 'conf0'},
                    {value: '1', id: 'conf1'},
                    {value: '3', id: 'conf3'},
                    {value: '4', id: 'conf4'},
                    {value: '5', id: 'conf5'},
                    {value: '6', id: 'conf6'}
                ]
            }
        },
        {
            className: 'flex-1',
            key: 'NumDiv',
            type: 'nya-bootstrapSelect',
            defaultValue: '8',
            templateOptions: {
                label: 'Number of Divisions',
                labelProp: 'value',
                valueProp: 'value',
                options: [
                    {value: '8', id: 'div8'},
                    {value: '0', id: 'div0'},
                    {value: '1', id: 'div1'},
                    {value: '2', id: 'div2'},
                    {value: '3', id: 'div3'},
                    {value: '4', id: 'div4'},
                    {value: '5', id: 'div5'},
                    {value: '6', id: 'div6'},
                    {value: '7', id: 'div7'},
                    {value: '9', id: 'div9'},
                    {value: '10', id: 'div10'},
                    {value: '11', id: 'div11'},
                    {value: '12', id: 'div12'},
                ]
            }
        }]
    },

        {
            className: 'display-flex settings',
            fieldGroup: [
                {
                    template: '<div class="row" style="padding-bottom: 40px;"/>'
                },
                {
                    key: 'StartFantDraft',
                    type: 'toggleSwitch',
                    className: 'col-md-6',
                    templateOptions: {
                        label: 'Start with Fantasy Draft?',
                        toggle: 'Fant',
                        selected: false,
                        align: '', //aligns the text label
                        pull: ''  //aligns the toggle switch
                    },
                    expressionProperties: {
                        'templateOptions.pull': function($viewValue, $modelValue, $scope) {
                            if($scope.model.FantDraftType) return 'pull-right' 
                            else return 'center-block';
                        },
                        'templateOptions.align': function($viewValue, $modelValue, $scope) {
                            if($scope.model.FantDraftType) return 'text-align: right'
                            else return 'text-align: center';
                        }
                    },
                    controller: function($scope) {
                        $scope.Update = function(isSelected) {

                        vm.model.FantDraftType = isSelected ? vm.model.FantDraftType : undefined; //removes type of fantasy draft if its unselected
                        }
                    }
                },
                {
                    key: 'FantDraftType',
                    className: 'flex-2 pull-left',
                    type: 'nya-bootstrapSelect',
                    defaultValue: 'Normal',
                    hideExpression: '!model.StartFantDraft || model.StartFantDraft === "No"',                    
                    templateOptions: {
                        label: 'Choose Draft Type',
                        labelProp: 'value',
                        valueProp: 'value',
                        options: [
                            {value: 'Normal', id: 'FDNorm'},
                            {value: 'Snake', id: 'FDSnake'},
                            {value: 'Random', id: 'FDRand'}
                        ]
                    }
                }]
        
        }
];
vm.careerGameday = [
    {
        className: 'display-flex settings',
        fieldGroup: [
            {
                key: 'RosterSize',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: '53',
                templateOptions: {
                    label: 'Regular Season Roster Size',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: '53', id: 'RS53'},
                        {value: '43', id: 'RS43'},
                        {value: '44', id: 'RS44'},
                        {value: '45', id: 'RS45'},
                        {value: '46', id: 'RS46'},
                        {value: '47', id: 'RS47'},
                        {value: '48', id: 'RS48'},
                        {value: '49', id: 'RS49'},
                        {value: '50', id: 'RS50'},
                        {value: '51', id: 'RS51'},
                        {value: '52', id: 'RS52'},
                        {value: '54', id: 'RS54'},
                        {value: '55', id: 'RS55'},
                        {value: '56', id: 'RS56'},
                        {value: '57', id: 'RS57'},
                        {value: '58', id: 'RS58'},
                        {value: '59', id: 'RS59'},
                        {value: '60', id: 'RS60'},
                        {value: '61', id: 'RS61'},
                        {value: '62', id: 'RS62'},
                        {value: '63', id: 'RS63'}
                    ]
                }
            },
            {
                key: 'Inactives',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: '7',
                templateOptions: {
                    label: 'Gameday Inactives',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: '7', id: 'GI7'},
                        {value: '0', id: 'GI0'},
                        {value: '1', id: 'GI1'},
                        {value: '2', id: 'GI2'},
                        {value: '3', id: 'GI3'},
                        {value: '4', id: 'GI4'},
                        {value: '5', id: 'GI5'},
                        {value: '6', id: 'GI6'},
                        {value: '8', id: 'GI8'},
                        {value: '9', id: 'GI9'},
                        {value: '10', id: 'GI10'},
                        {value: '11', id: 'GI11'},
                        {value: '12', id: 'GI12'},
                        {value: '13', id: 'GI13'},
                        {value: '14', id: 'GI14'},
                        {value: '15', id: 'GI15'}                       
                    ]
                }
            },
            {
                key: 'PracticeSquad',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: '8',
                templateOptions: {
                    label: 'Practice Squad Size',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                    {value: '8', id: 'PS8'},                     
                    {value: '0', id: 'PS0'},
                    {value: '1', id: 'PS1'},
                    {value: '2', id: 'PS2'},
                    {value: '3', id: 'PS3'},
                    {value: '4', id: 'PS4'},
                    {value: '5', id: 'PS5'},
                    {value: '6', id: 'PS6'},
                    {value: '7', id: 'PS7'},
                    {value: '9', id: 'PS9'},
                    {value: '10', id: 'PS10'},
                    {value: '11', id: 'PS11'},
                    {value: '12', id: 'PS12'},
                    ]          
                }
            },
            {
                key: 'Penalties',
                className: 'flex-1',
                type: 'vertSlider',
                defaultValue: 100,
                templateOptions: {
                    label: 'Penalty level',
                    sliderOptions: {
                        value: 100,
                        floor: 0,
                        ceil: 100,
                        vertical: false,
                        showTicks: false
                    }
                }
            },
            {
                key: 'QuarterLen',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: '15',
                templateOptions: {
                    label: 'Quarter Length',
                    options: [
                        {value: '15', id: 'QL15'},
                        {value: '5', id: 'QL5'},
                        {value: '6', id: 'QL6'},
                        {value: '7', id: 'QL7'},
                        {value: '8', id: 'QL8'},
                        {value: '9', id: 'QL9'},
                        {value: '10', id: 'QL10'},
                        {value: '11', id: 'QL11'},
                        {value: '12', id: 'QL12'},
                        {value: '13', id: 'QL13'}, 
                        {value: '14', id: 'QL14'},
                        {value: '16', id: 'QL16'},
                        {value: '17', id: 'QL17'},
                        {value: '18', id: 'QL18'},
                        {value: '19', id: 'QL19'},
                        {value: '20', id: 'QL20'}
                    ]
                }
            },
            {
                key: 'OTFormat',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: 'NFL',
                templateOptions: {
                    label: 'OT Format',
                    options: [
                        {value: 'NFL', id: 'OTNFL'},
                        {value: 'CFL', id: 'OTCFL'},
                        {value: 'College', id: 'OTCol'},
                        {value: 'Sudden Death', id: 'OTSud'},
                        {value: 'None', id: 'OTNone'}
                    ]
                }
            },
            {
                key: 'OTLength',
                className: 'flex-1',
                hideExpression: 'model.OTFormat.value === "None"',
                type: 'nya-bootstrapSelect',
                defaultValue: 'Quarter Length',
                templateOptions: {
                    label: 'OT Length',
                    options: [
                        {value: 'Quarter Length', id: 'OTLQL'},
                        {value: 'Possessions', id: 'OTLPos'},
                        {value: '5', id: 'OTL5'},
                        {value: '6', id: 'OTL6'},
                        {value: '7', id: 'OTL7'},
                        {value: '8', id: 'OTL8'},
                        {value: '9', id: 'OTL9'},
                        {value: '10', id: 'OTL10'},
                        {value: '11', id: 'OTL11'},
                        {value: '12', id: 'OTL12'},
                        {value: '13', id: 'OTL13'},
                        {value: '14', id: 'OTL14'}
                    ]
                }
            }
        ]
    }
]
vm.careerSchedule = [
    {
        className: 'display-flex settings',
        fieldGroup: [
            {
                className: 'flex-1',
                key: 'regSeasonGames',
                type: 'input',
                defaultValue: 16,
                templateOptions: {
                    label: 'Regular Season Games',
                    type: 'numeric',
                    placeholder: 'Between 8-20 Games',
                    min: 8,
                    max: 20
                }
            },
            {
                className: 'flex-1',
                key: 'preSeasonGames',
                type: 'nya-bootstrapSelect',
                defaultValue: '4',
                templateOptions: {
                    label: 'Pre-Season Games',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: '4', id: 'preSeas4'},
                        {value: '0', id: 'preSeas0'},
                        {value: '1', id: 'preSeas1'},
                        {value: '2', id: 'preSeas2'},
                        {value: '3', id: 'preSeas3'},
                        {value: '5', id: 'preSeas5'},
                        {value: '6', id: 'preSeas6'}
                    ]
                }
            },
            {
                className: 'flex-1',
                key: 'numByesPerTeam',
                type: 'nya-bootstrapSelect',
                defaultValue: '1',
                templateOptions: {
                    label: 'Byes Per Team',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: '1', id: 'byes1'},
                        {value: '0', id: 'byes0'},
                        {value: '2', id: 'byes2'},
                        {value: '3', id: 'byes3'}
                    ]

                }
            },
            {
                className: 'flex-1',
                key: 'playoffTeamsConf',
                type: 'nya-bootstrapSelect',
                defaultValue: '6',
                templateOptions: {
                    label: 'Playoff Teams per Conf',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: '6', id: 'play6'},
                        {value: '4', id: 'play4'},
                        {value: '5', id: 'play5'},
                        {value: '7', id: 'play7'},
                        {value: '8', id: 'play8'},
                        {value: '9', id: 'play9'},
                        {value: '10', id: 'play10'},
                        {value: '11', id: 'play11'},
                        {value: '12', id: 'play12'}
                    ]
                }
            },
            {
                className: 'flex-1',
                key: 'SchedType',
                type: 'nya-bootstrapSelect',
                defaultValue: 'NFL',
                templateOptions: {
                    label: 'Schedule Type',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: 'NFL', id: 'schedNFL'},
                        {value: 'Heavy Divisional', id: 'schedHD'},
                        {value: 'In Conference Only', id: 'schedICO'},
                        {value: 'Split', id: 'schedSplit'},
                        {value: 'Random', id: 'schedRand'}
                    ]
                }
            },
            {
                className: 'flex-1',
                key: 'seasonStart',
                type: 'nya-bootstrapSelect',
                defaultValue: 'September',
                templateOptions: {
                    label: 'Season Start Month',
                    labelProp: 'value',
                    valueProp: 'value',
                    options: [
                        {value: 'September', id: 'Sep'},
                        {value: 'January', id: 'Jan'},
                        {value: 'February', id: 'Feb'},
                        {value: 'March', id: 'Mar'},
                        {value: 'April', id: 'Apr'},
                        {value: 'May', id: 'May'},
                        {value: 'June', id: 'Jun'},
                        {value: 'July', id: 'Jul'},
                        {value: 'August', id: 'Aug'},
                        {value: 'October', id: 'Oct'},
                        {value: 'November', id: 'Nov'},
                        {value: 'December', id: 'Dec'}
                    ]
                }
            }
        ]
    },
    {
        template: '<div class="row">'
    },
    {
        className: 'display-flex settings',
        fieldGroup: [
            {        
                className: 'flex-2',
                key: 'schedIntGames',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Schedule International Games?',
                    selected: true,
                    pull: '',
                    align:'',              
                },
                expressionProperties: {
                        'templateOptions.pull': function($viewValue, $modelValue, $scope) {
                            if($scope.model.IntGamesSeason) return 'pull-right' 
                            else return 'center-block';
                        },
                        'templateOptions.align': function($viewValue, $modelValue, $scope) {
                            if($scope.model.IntGamesSeason) return 'text-align: right'
                            else return 'text-align: center';
                        }
                },
                controller: function($scope) {
                    $scope.Update = function(isSelected) {
                    $scope.model.IntGamesSeason = isSelected ? $scope.model.IntGamesSeason : undefined; //removes Internation Games if its unselected
                    }
                }
            },
            {
            className: 'flex-2 pull-left',
            key: 'IntGamesSeason',
            hideExpression: '!model.schedIntGames || model.schedIntGames === "No"',
            type: 'nya-bootstrapSelect',
            defaultValue: '6',
            templateOptions: {
                label: 'International Games per Year',
                labelProp: 'value',
                valueProp: 'value',
                options: [
                    {value: '6', id: 'int6'},
                    {value: '0', id: 'int0'},
                    {value: '1', id: 'int1'},
                    {value: '2', id: 'int2'},
                    {value: '3', id: 'int3'},
                    {value: '4', id: 'int4'},
                    {value: '5', id: 'int5'},
                    {value: '7', id: 'int7'},
                    {value: '8', id: 'int8'},
                    {value: '9', id: 'int9'},
                    {value: '10', id: 'int10'},
                    {value: '11', id: 'int11'},
                    {value: '12', id: 'int12'},
                ]    
            }
        }
        ]
    },

];

vm.careerUser = [
{
    className: 'display-flex settings',
    fieldGroup: [
  
        {
            key: 'UserFired',
            className: 'flex-1',
            type: 'toggleSwitch',
            templateOptions: {
                label: 'Can user be fired?',
                toggle: 'Fired',
                selected: true
            },
        },
        {
            key: 'ReqRooney',
            className: 'flex-1',
            type: 'toggleSwitch',
            hideExpression: '!model.UserFired',
            templateOptions: {
               label: 'Require Rooney Rule?',
               toggle: 'Rooney',
               selected: true
            }
        },
        {
            key: 'CoachContractGuar',
            className: 'flex-2',
            type: 'toggleSwitch',
            hideExpression: '!model.UserFired',
            templateOptions: {
                label: 'Coaches Contracts Guaranteed?',
                toggle:'CoachGuar',
                selected: true
            },
        },
        {
            key: 'AllowExpansion',
            className: 'flex-1',
            type: 'toggleSwitch',
            templateOptions: {
                label: 'Allow Expansion?',
                toggle: 'Exp',
                selected: true
            }
        },
        {
            key: 'AllowRelocation',
            className: 'flex-1',
            type: 'toggleSwitch',
            templateOptions: {
                label: 'Allow Relocation?',
                toggle: 'Rel',
                selected: true
            },
        },
        {
            key: 'UseFinancials',
            className: 'flex-1',
            type: 'toggleSwitch',
            templateOptions: {
                label: 'Use Financials?',
                toggle: 'Fin',
                selected: true
            },
        },
        {
            key: 'AllowFA',
            className: 'flex-1',
            type: 'toggleSwitch',
            templateOptions: {
                label: 'Allow Free Agency?',
                toggle: 'FA',
                selected: true
            },
        },
        {
            key: 'AllowCollegeDraft',
            className:'flex-1',
            type: 'toggleSwitch',
            templateOptions: {
                label: 'Allow College Draft?',
                toggle: 'ColDraft',
                selected: true
            }
        }
    ]
}
];

vm.careerExpansion = [
    {
        className: 'display-flex settings expansion',
        //hideExpression: '!model.AllowExpansion || model.AllowExpansion === "No"',
        fieldGroup: [
            {
                key: 'Expansion Fee',
                className: 'flex-1',
                type: 'input',
                defaultValue: '200,000,000',
                templateOptions: {
                    label: 'Expansion Fee',
                    type: 'text',         
                }
            },
            {
                key: 'MinMetroPop',
                className: 'flex-1',
                type: 'input',
                defaultValue: '1,000,000',
                templateOptions: {
                    label: 'Minimum Metro Population',
                    type: 'text',
                }
            },
            {
                key: 'MultTeamsLgMkt',
                className: 'flex-1',
                defaultValue: 'No',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Allow Multiple Teams in Large Markets?',
                    toggle: 'MultTeams',
                    selected: true
                }, 
            },
            {
                key: 'AllowIntTeams',
                className: 'flex-1',
                defaultValue: 'Yes',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Allow International Teams?',
                    toggle: 'AllowInt',
                    selected: false
                },
            },
            {
                key: 'OwnerAppExp',
                className: 'flex-1',
                type: 'vertSlider',
                defaultValue: 75,
                templateOptions: {
                    label: 'Owner Approval % Required',
                    sliderOptions: {
                        value: 100,
                        floor: 0,
                        ceil: 100,
                        vertical: false,
                        showTicks: false,
                        translate: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        ]
    }
];

vm.careerRelocation = [
    {
        className: 'display-flex settings relocation',
        //hideExpression: '!model.AllowRelocation || model.AllowRelocation === "No"',
        fieldGroup: [
            {
                key: 'RelocationFee',
                className: 'flex-1',
                type: 'input',
                defaultValue: '200,000,000',
                templateOptions: {
                    label: 'Relocation Fee',
                    type: 'text'
                }
            },
            {
                key: 'RelMinMetroPop',
                className: 'flex-1',
                type: 'input',
                defaultValue: '1,000,000',
                templateOptions: {
                    label: 'Minimum Metro Population',
                    type: 'text'
                }
            },
            {
                key: 'AllowIntRel',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Allow International Relocation?',
                    toggle: 'intRel',
                    selected: false
                }
            },
            {
                key: 'RequireOwnerApp',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Require Owner Approval?',
                    toggle: 'reqOwnApp',
                    selected: true
                }
            },
            {
                key: 'PercentToRel',
                className: 'flex-1',
                type: 'vertSlider',
                hideExpression: '!model.RequireOwnerApp',
                defaultValue: 75,
                templateOptions: {
                    label: 'Owner Approval % Required',
                    sliderOptions: {
                        floor: 0,
                        value: 75,
                        ceil: 100,
                        vertical: false,
                        showTicks: false,
                        translate: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        ]
    }
];

vm.careerColDraft = [
    {
        className: 'display-flex settings',
        hideExpression: '!model.AllowCollegeDraft',
        fieldGroup: [
            {
                key: 'DraftRounds',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: '7',
                templateOptions: {
                    label: 'Draft Rounds',
                    options: [
                        {value: '7', id: 'DR7'},
                        {value: '3', id: 'DR3'},
                        {value: '4', id: 'DR4'},
                        {value: '5', id: 'DR5'},
                        {value: '6', id: 'DR6'},
                        {value: '8', id: 'DR8'},
                        {value: '9', id: 'DR9'},
                        {value: '10', id: 'DR10'},
                        {value: '11', id: 'DR11'},
                        {value: '12', id: 'DR12'},
                        {value: '13', id: 'DR13'},
                        {value: '14', id: 'DR14'}
                    ]
                }
            },
            {
                key: 'DraftLottery',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Draft Lottery for 1st pick',
                    toggle: 'DraftLot',
                    selected: false
                }
            },
            {
                key: 'NumTeamsLottery',
                className: 'flex-1',
                hideExpression: '!model.DraftLottery',
                type: 'nya-bootstrapSelect',
                defaultValue: '16',
                templateOptions: {
                    label: '# of Teams in Draft Lottery',
                    options: [
                        {value: '16', id: 'DLot16'},
                        {value: '2', id: 'DLot2'},
                        {value: '3', id: 'DLot3'},
                        {value: '4', id: 'DLot4'},
                        {value: '5', id: 'DLot5'},
                        {value: '6', id: 'DLot6'},
                        {value: '7', id: 'DLot7'},
                        {value: '8', id: 'DLot8'},
                        {value: '9', id: 'DLot9'},
                        {value: '10', id: 'DLot10'},
                        {value: '11', id: 'DLot11'},
                        {value: '12', id: 'DLot12'},
                        {value: '13', id: 'DLot13'},
                        {value: '14', id: 'DLot14'},
                        {value: '15', id: 'Dlot15'}
                    ]
                }
            },
            {
                key: 'ColDraftType',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: 'Normal',
                templateOptions: {
                    label: 'Draft Type',
                    options: [
                        {value: 'Normal', id: 'ColDRN'},
                        {value: 'Snake', id: 'ColDRS'},
                        {value: 'Random', id: 'ColDRR'}
                    ]
                }
            },
            {
                key: 'SupplementalDraft',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Have Supplemental Draft?',
                    toggle: 'SupDraft',
                    selected: true
                }
            },
            {
                key: 'CompensDraftPicks',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Give Compensatory Draft Picks?',
                    toggle: 'CompDraft',
                    selected: true
                }
            },
            {
                key: 'DraftPickTrades',
                className: 'flex-1',
                type: 'toggleSwitch', 
                templateOptions: {
                    label: 'Allow Draft Picks to be traded',
                    toggle: 'PickTrade',
                    selected: true
                }
            }
        ]
    }
];

vm.careerFinancials = [
    {
        className: 'display-flex settings finance',
        hideExpression: '!model.UseFinancials',
        fieldGroup: [
            {
                key: 'SalaryCapType',
                className: 'flex-1',
                type: 'nya-bootstrapSelect',
                defaultValue: 'Hard Cap',
                templateOptions: {
                    label: 'Salary Cap Type',
                    options: [
                        {value: 'Hard Cap', id: 'SCTHC'},
                        {value: 'Soft Cap', id: 'SCTSC'},
                        {value: 'Luxury Tax', id: 'SCTLT'},
                        {value: 'Soft Cap and Luxury Tax', id: 'SCTSL'}
                    ]
                }
            },
            {
                key: 'VarCap',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Cap based on revenues?',
                    toggle: 'capRev',
                    selected: true
                }
            },
            {
                key: 'FixedCap',
                className: 'flex-1',
                type: 'input',
                defaultValue: '155,000,000',
                hideExpression: '!model.VapCap',
                templateOptions: {
                    label: 'Salary Cap Amount',
                    type: 'text'
                }
            },
            {
                key: 'CapCarryOver',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Cap CarryOver?',
                    toggle: 'CapCO',
                    selected: true
                }
            },
            {
                key: 'UseRookiePool',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Rookie Cap Pool?',
                    toggle: 'RookieCP',
                    selected: true
                }
            },
            { //float values are not working for soem reason even though they do in examples
                key: 'RookiePoolAmount',
                className: 'flex-1',
                type: 'vertSlider',
                hideExpression: '!model.UseRookiePool',
                templateOptions: {
                    label: 'Rookie Pool % of Cap',
                    sliderOptions: {
                    value: 6.00,
                    floor: 0.00,
                    ceil: 10.00,
                    step: 0.25,
                    precision: 2,
                    vertical: false,
                    showTicks: false,
                    translate: function(value) {
                            return value + '%';
                        }
                    }
         
                    
                }
            },
            {
                key: 'SalaryFloor',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Use Salary Floor?',
                    toggle: 'salFloor',
                    selected: true
                }
            },
            {
                key: 'SalFloorPer',
                className: 'flex-1',
                hideExpression: '!model.SalaryFloor',
                type: 'vertSlider',
                templateOptions: {
                    label: 'Floor as Percent of Cap',
                    sliderOptions: {
                        value: 89,
                        floor: 50,
                        ceil: 98,
                        vertical: false,
                        showTicks: false
                    }
                }
            },
            {
                key: 'LuxuryTaxPer',
                hideExpression: function($viewValue, $modelValue, $scope) {
                    if($scope.model.SalaryCapType === 'Luxury Tax' || $scope.model.SalaryCapType === 'Soft Cap and Luxury Tax') {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                className: 'flex-1',
                type: 'vertSlider',
                templateOptions: {
                    label: '% of cap when tax starts',
                    sliderOptions: {
                        value: 100,
                        floor: 101,
                        ceil: 200,
                        vertical: false,
                        showTicks: false
                    }
                }
            },
            {
                key: 'LuxuryTaxAmt',
                className: 'flex-1',
                hideExpression: '!model.LuxuryTaxPer',
                type: 'input',
                templateOptions: {
                    type: 'numeric',
                    label: 'Amount per dollar over',
                    placeholder: '1.50',

                }
            },
        ]
    },

    {
        template: '<div class="row" style="padding-bottom: 10px;"/>'
    },
    {
        className: 'display-flex settings',
        fieldGroup: [
            {
                key: 'FranchiseTag',
                type: 'toggleSwitch',
                className: 'flex-1',
                templateOptions: {
                    label: 'Use Franchise Tag?',
                    toggle: 'FranTag',
                    selected: true
                }
            },
            {
                key: 'NonExclFranTag',
                type: 'toggleSwitch',
                hideExpression: '!model.FranchiseTag',
                className: 'flex-1',
                templateOptions: {
                    label: 'Have Non-Excl. Franchise Tag?',
                    toggle: 'NonExcFranTag',
                    selected: true
                }
            },
            {
                key: 'FranTagBasedWhatPer',
                className: 'flex-1',
                hideExpression: '!model.FranchiseTag',
                type: 'vertSlider',
                templateOptions: {
                    label: 'Based on Top % at position',
                    sliderOptions: {
                        value: 5,
                        floor: 1,
                        ceil: 15,
                        step: 0.25,
                        precision: 2
                    }
                }
            },
            {
                key: 'FranMinRaise',
                className: 'flex-1',
                hideExpression: '!model.FranchiseTag',
                type: 'vertSlider',
                templateOptions: {
                    label: 'Min. Over Last Year Salary',
                    sliderOptions: {
                        value: 120,
                        floor: 100,
                        ceil: 150,
                        translate: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            {
                key: 'FranYearsPlayer',
                hideExpression: '!model.FranchiseTag',
                className: 'flex-1',
                type: 'vertSlider',
                templateOptions: {
                    label: '# Years Can Tag Same Player',
                    sliderOptions: {
                        value: 2,
                        floor: 1,
                        ceil: 6
                    }
                }
            },
            {
                key: 'TransitionTag',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Use Transition Tag?',
                    toggle: 'TransTag',
                    selected: true
                }
            },
            {
                key: 'TransTagPerc',
                className: 'flex-1',
                hideExpression: '!model.TransitionTag',
                type: 'vertSlider',
                templateOptions: {
                    label: 'Based on Top % at position',
                    sliderOptions: {
                        value: 10,
                        floor: 1,
                        ceil: 20,
                        step: 0.25,
                        precision: 2
                    }
                }
            },
            {
                key: 'TeamFirstRef',
                className: 'flex-1',
                hideExpression: '!model.TransitionTag',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Team has right of 1st refusal?',
                    toggle: 'TransFR',
                    selected: true
                }
            }
        ]
    }
];

vm.careerOwner = [
    {
        className: 'display-flex settings owner',
        fieldGroup: [
            {
                key: 'AvgTicketPrice',
                className: 'flex-1',
                defaultValue: '85.00',
                type: 'input',
                templateOptions: {
                    label: 'Average Ticket Price',
                    type: 'text',
                }
            },
            {
                key: 'AvgLuxuryBoxPrice',
                className: 'flex-1',
                defaultValue: '35,000',
                type: 'input',
                templateOptions: {
                    label: 'Ave Luxury Box Price',
                    type: 'text'
                }
            },
            {
                key: 'HomeTeamGateRev',
                className: 'flex-1',
                type: 'vertSlider',
                templateOptions: {
                    label: 'Home Team Gate Revenue %',
                    sliderOptions: {
                        value: 60,
                        floor: 0,
                        ceil: 100
                    }
                }
            },
            {
                key: 'ShareLuxBoxRev',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Share Luxury Box Rev?',
                    toggle: 'LuxBox',
                    selected: false
                }
            },
            {
                key: 'ShareMerchRev',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Share Merchandise Revenue?',
                    toggle: 'MerchRev',
                    selected: true
                }
            }
        ]
    }
];

              
});
})();


         