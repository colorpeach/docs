define(['angular','grid'],function(angular){
    angular.module('ui.grid')

    .directive('xgridInclude',
    [ '$anchorScroll', '$compile', '$animator',
        function(   $anchorScroll,   $compile,   $animator){
            return {
                restrict:'A',
                compile: function(element, attr) {
                    var srcExp = attr.xgridInclude || attr.src,
                        autoScrollExp = attr.autoscroll,
                        oldExp = srcExp;

                    return function(scope, element, attr) {
                        var animate = $animator(scope, attr);

                        var clearContent = function() {
                            animate.leave(element.contents(), element);
                        };

                        //下拉列表
                        if(scope.col.type === 'select'){
                            srcExp = 'template.select';
                        }

                        scope.$watch(srcExp, function ngIncludeWatchAction(src) {

                            if (src) {
                                animate.leave(element.contents(), element);

                                var contents = angular.element('<div/>').html(src).contents();

                                animate.enter(contents, element);
                                $compile(contents)(scope);

                                if (typeof autoScrollExp != 'undefined' && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                    $anchorScroll();
                                }
                            }
                        });

                        srcExp = oldExp;
                    };
                }
            };
        }
    ]);
});