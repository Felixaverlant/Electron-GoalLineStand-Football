(function () {
    'use strict';
    angular
    .module('routerApp')
    .controller('teamSelectCtrl', function teamSelectCtrl() {

    var vm = this;
    vm.onSubmit = onSubmit;
    vm.carousel = [];

    vm.fields = [

    {
        key: 'Teams',
        type: '3DCarousel',
        templateOptions: {
            label: 'Select your team',
            options: [
                {image: '../assets/Arizona_Cardinals2.jpg', title: 'Arizona Cardinals', listItems: ['Offense Rating: 85', 'Defense Rating: 88', 'Special Teams Rating: 79']},
                {image: 'New_Game_Wizard/assets/Atlanta_Falcons2.jpg', title: 'Atlanta Falcons', listItems: ['Offense Rating: 98', 'Defense Rating: 81', 'Special Teams Rating: 77']},
                {image: 'New_Game_Wizard/assets/Baltimore-Ravens-3.jpg', title: 'Baltimore Ravens', listItems: ['Offense Rating: 78', 'Defense Rating: 95', 'Special Teams Rating: 83']},
                {image: 'New_Game_Wizard/assets/Buffalo_Bills02.jpg', title: 'Buffalo Bills', listItems: ['Offense Rating: 88', 'Defense Rating: 82', 'Special Teams Rating: 85']},
                {image: 'New_Game_Wizard/assets/Carolina_Panthers2.jpg', title: 'Carolina Panthers', listItems: ['Offense Rating: 83', 'Defense Rating: 86', 'Special Teams Rating: 82']}

            ]
        }
    }
]
})
});