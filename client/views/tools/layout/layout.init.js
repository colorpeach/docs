define(['angular','tools'],function(angular,tools){
    
    angular.module('layout',['tools'])
    
    .constant('components',{
        'button':{},
        'select':{},
        'input':{},
        'date':{},
        'choose':{},
        'grid':{},
        'tab':{},
        'row':{
            'button':true
        }
    })
    
    .constant('layouts',[
        {name:'两列布局',className:''},
        {name:'三列布局',className:''},
        {name:'四列布局',className:''}
    ])
    
    .factory('componentTpls',
    ['heredoc',
        function(heredoc){
            return {
                'button':heredoc(function(){/*!
                    <div class="component-item" xdrag=true data-component="button">
                        <button class="btn btn-primary" xcomponent='self-button'>默认</button>
                    </div>
                */}),
                'input':heredoc(function(){/*!
                    <div class="component-item" xdrag=true data-component="input">
                        <input type='text' xcomponent='self-input'/>
                    </div>
                */}),
                'row':heredoc(function(){/*!
                    <div class="component-item" xdrag=true data-component="row">
                        <div class="fm-row" xcontain="row" xcomponent='self-row'></div>
                    </div>
                */}),
                'select':heredoc(function(){/*!
                    <div class="component-item" xdrag=true data-component="select">
                        <select xcomponent='self-select'>
                            <option value=''>默认选项</option>
                        </select>
                    </div>
                */})
            }
        }
    ]);
});