(function(global){
    var commentMatch = /\/\*\*([\s\S]+?)\*\//g;
    var commentSplit = /\s*\*\s*/g;
    var spaceStr = /^\s*$/;
    var commentFrag = /(\w+)\s?(?:\{([\s\S]+?)\})?([\s\S]*)/;
    var preHTML = /<pre>([\s\S]+)<\/pre>/;
    var parser = function(str){
        var obj = {};
        if(str){
            str.replace(commentMatch,function(){
                var s = RegExp.$1;
                var l = s.split(/\s*\*\s*@/);
                var o = {};
                l.forEach(function(n,i,arr){
                    var key;
                    if(!spaceStr.test(n)){
                        keys = n.replace(commentSplit,'\n').match(commentFrag);
                        if(keys){
                            if(keys[1] === "name")
                                obj[$.trim(keys[3])] = o;
                                
                            if(keys[1] === "description"){
                                var preMatch = keys[3].match(preHTML)||"";
                                preMatch && (keys[3] =  "    "+preMatch[1].split(/\s*\n\s*/).join("\n    "));
                            }

                            o[keys[1]]={value:keys[3]};

                            if(keys[2])
                                o[keys[1]].type = keys[2];
                        }
                    }
                });   
            });
        }
        return obj;
    };

    global.parser = parser;
})(this);
