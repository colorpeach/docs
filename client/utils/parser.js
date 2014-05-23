(function(global){
    var commentMatch = /\/\*\*([\s\S]+?)\*\//g;
    var commentSplit = /\s*\*\s*/g;
    var spaceStr = /^\s*$/;
    var commentFrag = /(\w+)\s?(?:\{(.+)\})?(.*)/;

    function parser(str){
        var obj = {};
        if(str){
            str.replace(commentMatch,function(){
                var s = RegExp.$1;
                var l = s.replace(commentSplit,"").split("@");
                var o = {};
                l.forEach(function(n,i,arr){
                    var key;
                    if(!spaceStr.test(n)){
                        keys = n.match(commentFrag);
                        if(keys[1] === "name")
                            obj[keys[3]] = o;

                        o[keys[1]]={value:keys[3]};

                        if(keys[2])
                            o[keys[1]].type = keys[2];
                    }
                });
            });
        }
        return obj;
    };

    global.parser = parser;
})(this);