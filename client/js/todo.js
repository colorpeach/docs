angular
    .module("app",[])
    //将注释对象转化为markdown文档格式
    .factory("toMarkdown",function(){
        return function(obj){
            var str = "";
            
            for(var n in obj){
                str += "#" + n + "\n";
                if(obj[n].param){
                    if(obj[n].param.value)
                        str += "###" + obj[n].param.value + "\n";
                    if(obj[n].param.type)
                        str += "###" + obj[n].param.type + "\n";
                }
                if(obj[n].description && obj[n].description.value)
                    str += "    " + obj[n].description.value + "\n";
                    
                str += "***\n";
            }
            
            return str;
        };
    })
    .controller("todo",["$scope","$http","toMarkdown",function($scope,$http,toMarkdown){
        var converter = new Showdown.converter();
        
        $scope.get = function(){
            $http({
                url:"/get",
                method:"get"
            })
            .then(function(res){
                var str = res.data.str;
                document.getElementById("view").innerHTML = converter.makeHtml(toMarkdown(parser(str)));
                reset();
            });
        };
    }]);
    
angular.bootstrap(document,["app"]);

//滚动效果
var prev;
var headings = [];
var $menu = $("#menu");
function reset(){
    var html = "",
        typeMap = {},
        typeList = [];
    prev = null
    headings = $("h1").map(function(i,el){
        var name = el.textContent,
            split = name.split(".");
            
        if(split[0] in typeMap){
            typeList[typeMap[split[0]]].push({name:split.slice(1).join("."),id:el.id});
        }else{
            var list = [];
            typeMap[split[0]] = typeList.length;
            list.push({name:split[0],id:el.id});
            if(split[1]){
                list.push({name:split.slice(1).join("."),id:el.id});
            }
            typeList.push(list);
        }
            
        return {
            top:$(el).offset().top,
            id:el.id
        };
    });
    $menu[0].innerHTML = generateMenu(typeList);
}

function generateMenu(typeList){
    var html = "";
    for(var i=0,len=typeList.length;i<len;i++){
        for(var j=0,item=typeList[i],jlen=item.length;j<jlen;j++){
            if(j===0){
                html += "<li><a href='#"+item[j].id+"'>"+item[j].name+"</a><ul>";
            }else{
                html += "<li><a href='#"+item[j].id+"'>"+item[j].name+"</a></li>"
            }
        }
        html += "</ul></li>";
    }
    return html;
}
    
(function($){
    
    function closest() {
        var h;
        var top = $(window).scrollTop();
        var i = headings.length;
        while (i--) {
          h = headings[i];
          if (top >= h.top - 1) return h;
        }
      }
    
    $(document).scroll(function(){
        var h = closest();
        if (!h) return;

        if (prev) {
          prev.removeClass('active');
          prev.parent().parent().removeClass('active');
        }

        var a = $('a[href="#' + h.id + '"]');
        a.addClass('active');
        a.parent().parent().addClass('active');

        prev = a;
    });
})(jQuery);