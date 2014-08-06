angular.module('ui.grid')

.directive('xgridInclude',
[ '$anchorScroll', '$compile', '$animator',
    function(   $anchorScroll,   $compile,   $animator){
        return {
            restrict:'A',
            compile: function(element, attr) {
                var srcExp = attr.xgridInclude || attr.src,
                    autoScrollExp = attr.autoscroll;

                return function(scope, element, attr) {
                    var animate = $animator(scope, attr);

                    var clearContent = function() {
                        animate.leave(element.contents(), element);
                    };
                    
                    //init node collapse status
                    scope._collapsed = true;

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
                };
            }
        };
    }
]);