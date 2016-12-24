(function () {
angular
.module('routerApp')
.controller('careerCtrl', function careerCtrl (){

var vm = this;
vm.fields = [
    {
            //wrapper: "panel",
            className: 'display-flex league',
            fieldGroup: [
            {
               className: 'flex-1',
               key: 'StartYear',
               type: 'input',
               templateOptions: {
                  label: 'Start Year',
                  type: 'numeric'
               }
             },
             {
               className: 'flex-1',
               key: 'LeagueRules',
               type: 'select',
               //defaultValue: 'NFL',
               templateOptions: {
                  label: 'League Rules',
                  labelProp: 'value',
                  valueProp: 'id',
                  options: [
                     {value: 'NFL', id: 'NFL'},
                     {value: 'CFL', id: 'CFL'},
                     {value: 'College', id: 'College'},
                     {value: 'Arena', id: 'Arena'}
                  ]
                }
              },
              {
                className: 'flex-1',
                key: 'FieldType',
                type: 'select',
                templateOptions: {
                    label: 'Field Type',
                    labelProp: 'value',
                    valueProp: 'id',
                    options: [
                        {value: 'Modern NFL', id: 'FTMN'},
                        {value: 'Old NFL', id: 'FTON'},
                        {value: 'CFL', id: 'FTCFL'},
                        {value: 'College', id: 'FTCol'},
                        {value: 'Arena', id: 'FTAr'}
                    ]
                }             
                }
            ]
        }, 
               {
                   template: '<hr/>'
               },
               {
                   className: 'display-flex',
                   fieldGroup: [                  
                {
                    //wrapper: 'panel',
                  className: 'flex-1',
                  key: 'NumTeams',
                  type: 'input',
                  templateOptions: {
                       label: 'Number of Teams',
                       type: 'numeric',
                       min: 8,
                       max: 48
                   }
                 },
                 {
                        className: 'flex-1',
                        key: 'NumConf',
                        type: 'input',
                        templateOptions: {
                            label: 'Number of Conferences',
                            type: 'numeric',
                            min: 0,
                            max: 6
                  }
                    },
                    {
                        className: 'flex-1',
                        key: 'NumDiv',
                        type: 'input',
                        templateOptions: {
                            label: 'Number of Divisions',
                            type: 'numeric',
                            min: 0,
                            max: 12
                        }
                    }
                           
]

});
})();