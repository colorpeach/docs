define(['angular','utils'],function(angular,utils){
    
    angular.module('layout',['utils'])
    
    .constant('components',[
        'button',
        'select',
        'input',
        'date',
        'choose',
        'grid',
        'tab'
    ])
    
    .constant('layouts',[
        {name:'两列布局',className:''},
        {name:'三列布局',className:''},
        {name:'四列布局',className:''}
    ])
});