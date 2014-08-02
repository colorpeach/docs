angular.module('utils',[])

.constant('config',{
    docprefix:/^[^\/]+\/\*!?/,
    docsuffix:/\*\/[^\/]+$/
})

/**
 * @name utils.heredoc 
 * @param f {function} 
 * @description multi-line template in a 'function(){}' wrap
 */
.factory('heredoc',
['config',
    function(c){
        return function(f){
            return f.toString()
                    .replace(c.docprefix, '')
                    .replace(c.docsuffix, '');
        }
    }
]);