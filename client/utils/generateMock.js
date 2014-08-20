(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.generateMock = {}));
    }
})(this,function(exports){
    var num = /^\d+$/;

    exports.do = function(Mock,list,isTpl){
        return !isTpl ? Mock.mock(nestedData(list)) : nestedData(list);
    };

    function nestedData(data){
        var map = {};
        var r = {};

        if(!data){
            return r;
        }

        for(var i=0,len=data.length;i<len;i++){
            map[data[i].unique] = data[i].type === 'array' ? [{}] : data[i].type === 'object' ? {} : data[i];
        }

        for(i=0;i<len;i++){
            var n = data[i];
            var key = n.name + (n.rule ? ('|'+n.rule) : '');
            var value = n.type ? ('@'+n.type) : n.value;
            var temp;

            try{
                value = JSON.parse(value);
            }catch(e){}

            if(map[n.pKey] && n.unique != n.pKey){
                if(isArray(map[n.pKey])){
                    temp = map[n.pKey][0];
                }else{
                    temp = map[n.pKey];
                }
            }else{
                temp = r;
            }

            if(map[n.unique].unique){
                temp[key] = num.test(value) ? +value : value;
            }else{
                temp[key] = map[n.unique];
            }
        }

        return r;
    }

    function isArray(value) {
      return Object.prototype.toString.apply(value) == '[object Array]';
    }
});