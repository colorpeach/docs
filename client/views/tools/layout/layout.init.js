define(['angular','tools'],function(angular,tools){
    
    angular.module('layout',['tools'])
    
    .constant('components',{
        'button':{},
        'select':{},
        'input':{},
        'date':{},
        'choose':{},
        'grid':{},
        'tab':{}
    })
    
    .constant('layoutComponents',[
        {
            title:'两列布局',
            name:'layout-col2',
            contain:'*'
        },
        {
            title:'三列布局',
            name:'layout-col3',
            contain:'*'
        },
        {
            title:'四列布局',
            name:'layout-col4',
            contain:'*'
        },
        {
            title:'行布局',
            name:'layout-row',
            contain:{
                'button':true
            }
        }
    ])
    
    .constant('groupComponents',
    [
        {
            title:'group-button',
            name:'group-button',
            contain:{
                button:true
            }
        }
    ])
    
    .constant('otherComponents',
    [
        {
            title:'group-button',
            name:'button',
            contain:{
                button:true
            }
        }
    ])
    
    .factory('componentTpls',
    ['heredoc',
        function(heredoc){
            return {
                'layout-col2':heredoc(function(){/*!
                    <div class="component-item large" xdrag=true data-component="layout-col2">
                        <div class="layout-col2-left" xcontain="layout-col2" xcomponent="self-layout-col2"></div>
                        <div class="layout-col2-right" xcontain="layout-col2" xcomponent="self-layout-col2"></div>
                    </div>
                */}),
                'layout-row':heredoc(function(){/*!
                    <div class="component-item" xdrag=true data-component="layout-row">
                        <div class="layout-row" xcontain="layout-row" xcomponent='self-layout-row'></div>
                    </div>
                */}),
                'group-button':heredoc(function(){/*!
                    <div class="component-item" xdrag=true data-component="group-button">
                        <div xcontain="group-button" xcomponent='self-group-button'>
                        <button class="btn btn-primary" xcomponent='self-button'>默认</button>
                        </div>
                    </div>
                */}),
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