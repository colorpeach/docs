/*! doc 2014-07-09 */
!function(){var a=$("#edit-box"),b=$("#edit-con"),c=$("#cell-select"),d=$("#generate-btn"),e=$("#icon-btn"),f=$("#code"),g=$("#view"),h=$("#classipt"),i=$("#color"),j=$("#select-area"),k=0,l={cellSize:5,cell:.2,base:["%d {","display:inline-block;","font-size:40px;","width:1em;","height:1em;","position:relative;","overflow:hidden;","color:%c","}","%d:before {",'content:" ";',"display:block;","position:absolute;","top:-%sem;","left:-%sem;","width:%sem;","height:%sem;","box-shadow:"],generateCode:function(){var b=a.find("span.active"),c=[],d=this.base,e=i.val()||a.css("color"),f=h.val();return background="",cell=this.cell,b.each(function(a,b){var d=$(b).data(),e=+(d.x*cell).toFixed(2),f=+(d.y*cell).toFixed(2);c.push((e?e+"em ":e+" ")+(f?f+"em":f+"")+",")}),c.length?(c[c.length-1]=c[c.length-1].slice(0,-1)+";",c.push("\n}"),c=(d.join("\n	")+c.join("")).replace(/\t\}/g,"}").replace("	%d","%d").replace(/%s/g,cell).replace("%c",e).replace(/0\./g,"."),f?c.replace(/%d/g,f):c.replace(/%d/g,".icon"+ ++k)):""},generateCell:function(){for(var b,d,e=+c.val(),f=Math.pow(e,2),g="",h=0,i=f;i>h;h++)b=h%e+1,d=Math.floor(h/e)+1,g+='<span data-x="'+b+'" data-y="'+d+'"></span>';this.cell=1/e,this.cellSize=e,a.removeClass("cell5 cell10 cell20").addClass("cell"+e).html(g)},insertStyle:function(a){this.style.innerHTML+=a},dragSelect:function(){var a,c=this,d=!1,e=!1,f={};b.mousedown(function(b){var c=b.clientX,e=b.clientY;return a=setTimeout(function(){d=!0},100),f.x=c,f.y=e,!1}),b.add(j).mousemove(function(a){var b=a.clientX,c=a.clientY,g={};d&&!e&&(e=!0,j.show()),e&&(g.top=f.y,g.left=f.x,b-f.x<0&&(g.left=b),c-f.y<0&&(g.top=c),g.width=Math.abs(b-f.x),g.height=Math.abs(c-f.y),j.css(g))}),b.add(j).mouseup(function(b){var g={};a&&clearTimeout(a),g.x=b.clientX,g.y=b.clientY,e=!1,d=!1,c.doSelect(f.x>g.x),j.hide()})},doSelect:function(b){var c=a[0].getBoundingClientRect(),d=c.right-c.left,e=j[0].getBoundingClientRect(),f=this.cell,g=this.cellSize,h={x:0,y:0},i={x:g-1,y:g-1},k=b?"removeClass":"addClass";if(!(e.left>c.right||e.right<c.left||e.top>c.bottom||e.bottom<c.top)){e.left>c.left&&(h.x=Math.floor((e.left-c.left)/(d*f))),e.right<c.right&&(i.x=Math.floor((e.right-c.left)/(d*f))),e.top>c.top&&(h.y=Math.floor((e.top-c.top)/(d*f))),e.bottom<c.bottom&&(i.y=Math.floor((e.bottom-c.top)/(d*f)));var l=a.find("span");0===h.x&&i.x===g-1?l.slice(h.y*g,(i.y+1)*g)[k]("active"):$.each(new Array(i.y-h.y+1),function(a){var b=(h.y+a)*g,c=b+h.x,d=b+i.x+1;l.slice(c,d)[k]("active")})}},bindEvent:function(){var b=this;a.on("click","span",function(){var a=$(this);a.toggleClass("active")}),c.change(function(){b.generateCell()}),d.click(function(){f.val(b.generateCode())}),e.click(function(){var a=b.generateCode();b.insertStyle(a),g.append($('<span class="icon'+k+'"><i class="icon-close"></i></span>').data("style",a))}),g.on("click","span",function(){var a=$(this).data("style");f.val(a)}),g.on("click","i",function(){$(this).closest("span").remove()})},init:function(){var a=document.getElementsByTagName("head")[0];this.style=document.createElement("style"),a.appendChild(this.style),this.generateCell(),this.bindEvent(),this.dragSelect()}};l.init()}();