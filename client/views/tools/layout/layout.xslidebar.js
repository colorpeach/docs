define(['angular','init'],function(angular){
    
    angular.module('layout')
    
    .directive('xslidebar',
    [
        function(){
            return {
                restrict:'A',
                link:function(scope,element,attr){
                    var cons = element.children();
                    var tabs = cons.eq(0).children();
                    
                    cons.eq(0).bind('click',function(e){
                        var target = e.target;
                        var index = 0;
                        
                        if(target.tagName === 'LI' && target.className.indexOf('active') < 0){
                            while(tabs[index]){
                                if(tabs[index] === target){
                                    break;
                                }else{
                                    index++;
                                }
                            }
                            tabs.removeClass('active');
                            tabs.eq(index).addClass('active');
                            cons.addClass('hide');
                            cons.eq(0).removeClass('hide');
                            cons.eq(index+1).removeClass('hide');
                        }
                    });
                }
            }
        }
    ]);
    
});