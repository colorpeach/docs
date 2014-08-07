define(['angular','tree'],function(angular){
    angular.module('ui.tree')

    .factory('xtree.utils',
    [
        function(){
            var utils = {
                transformToNexted:function(data){
                    var map = [];
                    var r = [];

                    for(var i=0,len=data.length;i<len;i++){
                        map[data[i].id] = data[i];
                    }

                    for(i=0;i<len;i++){
                        if(map[data[i].parentId] && data[i].id != data[i].parentId){

                            if(!map[data[i].parentId].children){
                                map[data[i].parentId].children = [];
                            }

                            map[data[i].parentId].children.push(data[i]);

                        }else{
                            r.push(data[i]);
                        }
                    }

                    return r;
                }
            };

            return utils;
        }
    ]);
});