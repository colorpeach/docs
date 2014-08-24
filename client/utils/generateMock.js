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
    
    //将扁平数据转为有层级的mock模板
    exports.do = function(Mock,list,isTpl){
        return !isTpl ? Mock.mock(nestedData(list)) : nestedData(list);
    };
    
    //将mock模板或者真实数据转化为扁平数据
    exports.convert = function(d){
        var data = {};
        try{
            if(isObject(d)){
                data = d;
            }else{
                data = JSON.parse(d);
            }
            return flatData(data);
        }catch(e){
            throw e;
        }
    };
    
    function flatData(data,l,pKey){
        var list = l || [];
        var item = {};
        
        for(var i in data){
            
            item = {
                name : i.split('|')[0],
                rule : i.split('|')[1],
                unique : guid()
            };
            pKey && (item.pKey = pKey);
            list.push(item);
            
            if(isArray(data[i])){
                item.type = 'array';
                flatData(data[i][0], list, item.unique);
            }else if(isObject(data[i])){
                item.type = 'object';
                flatData(data[i], list, item.unique);
            }else{
                var mark = data[i][0] === '@';
                item.type = mark ? data[i].slice(1) : null;
                item.value = mark ? null : data[i];
            }
        }
        
        return list;
    }

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
    
    function guid(){
        return new Date().getTime() + '' + Math.random();
    }

    function isArray(value) {
      return Object.prototype.toString.apply(value) == '[object Array]';
    }
    
    function isObject(value){
        return value != null && typeof value == 'object';
    }
});