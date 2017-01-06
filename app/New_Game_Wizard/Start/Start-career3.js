(function () {
    'use strict';
angular
.module('routerApp')
.controller('career3Ctrl', function newGameCtrl() {
var vm = this;
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
                    checked: false
                }
            },
            {
                key: 'ShareMerchRev',
                className: 'flex-1',
                type: 'toggleSwitch',
                templateOptions: {
                    label: 'Share Merchandise Revenue?',
                    toggle: 'MerchRev',
                    checked: true
                }
            }
        ]
    }
];

});
})();