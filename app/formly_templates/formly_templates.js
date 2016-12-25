(function () {
angular
.module('formly templates', ['ui.mask'])

.run(function(formlyConfig) { //UI MASK code
    formlyConfig.setType({
      name: 'maskedInput',
      extends: 'input',
      template: '<input class="form-control" ng-model="model[options.key]" />',
      defaultOptions: {
        ngModelAttrs: {
          mask: {
            attribute: 'ui-mask'
          },
          maskPlaceholder: {
            attribute: 'ui-mask-placeholder'
          }
        },
        templateOptions: {
          maskPlaceholder: ''
        }
      }
    });
  })

.config(function(formlyConfigProvider) {
    formlyConfigProvider.setWrapper([{
        name:'panel', //creates a primary panel header
        template: `<div class="panel panel-primary">               
                        <div class="panel-heading px-nested-panel-heading clearfix">
                            <strong class="control-label" ng-if="options.templateOptions.label">
                                {{options.templateOptions.label}}
                            </strong>
                        </div>
                        
                            <div class="panel-body px-nested-panel-body">
                                <formly-transclude></formly-transclude>
                            </div>
                        
                    </div>`
    },
    {
        name: 'well',
        template: `<div class="well">
                        <formly-transclude></formly-transclude>
                   </div>`
    }]);

    formlyConfigProvider.setType([
        {   
            name: 'toggleSwitch',
            template: `<div style="{{to.align}}"><strong>{{to.label}}</strong></div><span>
                        <div class="onoffswitch {{to.pull}}" style="{{to.margin}}">
                        <input type="checkbox" name="toggle{{to.toggle}}" class="onoffswitch-checkbox" id="toggle{{to.toggle}}" 
                        ng-model="selected" ng-click="model[options.key || index] = selected" ng-init="selected = to.selected"
                        selected ng-class="{'col-md-6': !selected, 'pull-right': selected}">
                        <label class="onoffswitch-label" for="toggle{{to.toggle}}">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div></span>`,
            controller: function($scope) {
                $scope.model[$scope.options.key] = $scope.to.selected; //sets the initial value of the model
            }
        },
        {
            name:'basicLabel',
            template: '<strong style="font-size:{{to.size}};text-align:{{to.align}}; margin-left:{{to.leftMargin}}">{{to.label}}</strong>'
        },
        {
            name:'nya-bootstrapSelect',
            template: ` <div><strong>{{to.label}}</strong></div>
                        <ol class="nya-bs-select btn-primary" style="{{to.margin}};"
   						ng-model="model[options.key || index]">   
                            <li nya-bs-option="option in to.options" value="option.value"> 
                                <a> <span>{{option.value}}</span> <span class="glyphicon glyphicon-ok check-mark"></span></a>
                            </li> 
                        </ol>`
        },
        {
            name:'vertSlider',
            template: [`<rzslider rz-slider-model="to.sliderOptions.value" 
                         rz-slider-options="to.sliderOptions"></rzslider>`].join(''),
            wrapper: ['bootstrapLabel', 'bootstrapHasError']
        },
        {
            name: '3DCarousel',
            template: `<carousel ng-model="vm.carousel" sides="to.options"</carousel>`
        }

        ])

    });
})();