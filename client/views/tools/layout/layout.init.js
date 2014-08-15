define(['angular','tools'],function(angular,tools){
    
    angular.module('layout',['tools'])
    
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