$.docsajax({
    url:'/fetch/user/docs',
    wrap:$('#doc'),
    success:function(d){
      $('#doc').append(docHtml(d.docs,'doc'));
    }
});

$.docsajax({
    url:'/fetch/user/decks',
    wrap:$('#slide'),
    success:function(d){
      $('#slide').append(docHtml(d.decks,'deck'));
    }
});

// $.docsajax({
//     url:'/get/user/docs',
//     success:function(d){
//       $('#doc').html(docHtml(d.docs));
//     }
// });

function docHtml(l,t){
    return $.map(l,function(doc){
        return ['<div class="doc-item">',
                '<a href="',
                t === 'doc' ? 'doc' : 'slide',
                '/'+doc.user+'/'+doc.title,
                '">',
                  doc.title,
                '</a>',
                '<a href="/account/'+doc.user+'" class="user-span pull-right">',
                '<span class="icon-user"></span>'+doc.user,
                '</a></div>'].join("");
      }).join("");
}
