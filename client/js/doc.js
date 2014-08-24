(function(){
    var converter = new Showdown.converter();
    var content = $("#content").val();
    var $view = $("#view");
    
    //从ObjectId中提取时间
    var objectId = $("#doc-date").data("id");
    $('#doc-date').text('创建时间：'+new Date(parseInt(objectId.slice(0,8),16)*1000));

    $view.append(converter.makeHtml(content).escapeHTML());

    //滚动效果
    var prev;
    var headings = [];
    var $menu = $("#menu");
    function reset(){
        var html = "",
            endHtml = "",
            lastId = "";
        prev = null
        headings = $("h1,h2,h3,h4,h5,h6").map(function(i,el){
            var name = $(el).text(),
                id = el.nodeName;
            $(el).addClass("anchor");

            $(this).attr("id",name);

            switch(id){
                case "H1":
                    html += endHtml;
                    endHtml = "";
                    html += "<li title='"+name+"'><a href='#"+name+"'>"+name+"</a>";
                    endHtml = "</li>";
                    break;
                case "H2":case "H3":case "H4":case "H5":case "H6":
                    if(lastId == id){
                        html += "<li title='"+name+"'><a href='#"+name+"'>"+name+"</a>";
                        endHtml = "</li>"+endHtml;
                    }else{
                        html += "<ul><li title='"+name+"'><a href='#"+name+"'>"+name+"</a>";
                        endHtml = "</li></ul>"+endHtml;
                    }
                    break;
            }
            lastId = id;
            return {
                top:$(el).offset().top,
                id:id,
                name:name
            };
        });
        $menu[0].innerHTML = html+endHtml;
    }

    function closest() {
        var h;
        var top = $(window).scrollTop();
        var i = headings.length;
        while (i--) {
          h = headings[i];
          if (top >= h.top - 10) return h;
        }
      }
      
    reset();
    
    $(document).scroll(function(){
        var h = closest();
        if (!h) return;
    
        if (prev) {
          prev.removeClass('active');
          prev.parent().removeClass('active');
        }
    
        var a = $('a[href="#' + h.name + '"]');
        a.addClass('active');
        a.parent().parent().addClass('active');
    
        prev = a;
    });
})();
