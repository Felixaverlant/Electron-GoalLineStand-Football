(function () {
    'use strict';
angular
.module('routerApp')
.config(function(formlyConfigProvider) {
    formlyConfigProvider.setWrapper({
        name:'panel',
        template: `
        <div class="panel panel-primary">
               
          <div class="panel-heading px-nested-panel-heading clearfix">
            <strong class="control-label" ng-if="options.templateOptions.label">
              {{options.templateOptions.label}}
            </strong>
          </div>
        <div class="well well-lg>
          <div class="panel-body px-nested-panel-body">
            <formly-transclude></formly-transclude>
          </div>
        </div>
    </div>
        `
    })
    formlyConfigProvider.setType([
        {
        name: 'leagueType',
        template: ` <h4><b>Please select the type of league you'd like to create:</b></h4>
                    
                    <div class="row">
                        <div class="col-md-5"></div>
                        <a><button type="button" class="btn btn-lg btn-primary career pull-left" tooltip-placement="left" uib-tooltip="Career Mode allows unlimited seasons and is the most in-depth mode">
                        Career Simulation</button></a> 
                               
                    </div>
                    <hr/>
                    <div class="row">    
                        <div class="col-md-5"></div>
                        <a><button type="button" class="btn btn-lg btn-primary single pull-left">Single Season</button>
                        </a>          
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-md-5"></div>
                        <a><button class="btn btn-lg btn-primary quick pull-left">Quick Game</button></a>
                    </div>
                        <hr/>
                    <div class="row">
                        <div class="col-md-5"></div>
                        <a><button class="btn btn-lg btn-primary play pull-left">Play a Game</button></a>                       
                    </div>
                    </div>
                    `           
        }
    ])
})

.controller('newGameCtrl', function newGameCtrl() {
    console.log('new_game');
var vm = this;
vm.name = "Hey!";
vm.finishWizard = finishWizard;
vm.model1 = {};
vm.model2 = {};

vm.exitValidation = function(form) {
    return form && !form.$invalid;
};

vm.fields = {
    step1: [
        {
            key: 'selectLeagueType',
            wrapper: 'panel',
            type: 'leagueType',
            templateOptions: {
                label: 'League Creation',
                required: true
            }
        }
    ]
};

   // function definition
    function finishWizard() {
      alert(JSON.stringify(vm.model), null, 2);
    }
});
})();
