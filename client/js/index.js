$.docsajax({
    url:'/get/user/orgs/docs',
    success:function(d){
      $('.org-doc').html(docHtml(d.docs));
    }
});

$.docsajax({
    url:'/get/user/docs',
    success:function(d){
      $('.private-doc').html(docHtml(d.docs));
    }
});

function docHtml(l){
    return $.map(l,function(doc){
        return ['<div class="doc-item">',
                '<div class="panel panel-default">',
                '<div class="panel-heading"><a href="',
                  '/'+doc.user+'/'+doc.title,
                '">',
                  doc.title,
                '</a></div>',
                '<div class="panel-body">',
                '<a href="/doc/'+doc.user+'/'+doc.title+'" class="user-span pull-right">',
                '<span class="icon-user"></span>'+doc.user,
                '</a></div></div></div>'].join("");
      }).join("");
}
