define(['angular','init'],function(angular){
    
    angular.module('layout')
    
    .directive('xcomponent',
    ['heredoc','$compile',
        function(heredoc,$compile){
            var tpl = {
                'xbutton':heredoc(function(){/*!
                    <div class="component-item" xdrag=true>
                        <button class="btn btn-primary">默认</button>
                    </div>
                */})
            };
            
            return {
                restrict:'A',
                link:function(scope,element,attr){
                    var component = attr.xcomponent;
                    var body = angular.element(document.body);
                    
                    element.bind('mousedown',function(e){
                        var cpt = angular.element(tpl[component]);
                        var newScope = scope.$new();
                        
                        $compile(cpt)(newScope);
                        newScope.draging = true;
                        
                        cpt.css({
                            display:'block',
                            top:e.clientY+'px',
                            left:e.clientX+'px'
                        });
                        
                        body.append(cpt);
                        
                    });
                }
            }
        }
    ]);
});