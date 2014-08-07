define(['angular','tree'],function(angular){
    angular.module('ui.tree')

    //borrow from ngInclude ,but don't create a new childscope
    .directive('xtreenode',
    ['xtree.config','$http', '$templateCache', '$anchorScroll', '$compile', '$animator',
        function(config,   $http,   $templateCache,   $anchorScroll,   $compile,   $animator){
            return {
                restrict:'A',
                compile: function(element, attr) {
                    var srcExp = attr.xtreenode || attr.src,
                        onloadExp = attr.onload || '',
                        autoScrollExp = attr.autoscroll;

                    return function(scope, element, attr) {
                        var animate = $animator(scope, attr);
                        var changeCounter = 0;

                        var clearContent = function() {
                            animate.leave(element.contents(), element);
                        };

                        //init node collapse status
                        scope._collapsed = true;

                        scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                            var thisChangeId = ++changeCounter;

                            if (src) {
                                $http.get(src, {cache: $templateCache}).success(function(response) {
                                    if (thisChangeId !== changeCounter) return;

                                    animate.leave(element.contents(), element);

                                    var contents = angular.element('<div/>').html(response).contents();

                                    animate.enter(contents, element);
                                    $compile(contents)(scope);

                                    if (typeof autoScrollExp != 'undefined' && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                        $anchorScroll();
                                    }

                                    scope.$eval(onloadExp);
                                }).error(function() {
                                    if (thisChangeId === changeCounter) clearContent();
                                });
                                scope.$emit('$includeContentRequested');
                            } else {
                                clearContent();
                            }
                        });
                    };
                }
            };
        }
    ]);
});