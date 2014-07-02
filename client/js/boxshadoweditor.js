(function(){
    var $box = $('#edit-box');
    var $con = $('#edit-con');
    var $select = $('#cell-select');
    var $generate = $('#generate-btn');
    var $iconbtn = $('#icon-btn');
    var $code = $('#code');
    var $view = $('#view');
    var $classipt = $('#classipt');
    var $color = $('#color');
    var $selectArea = $('#select-area');
    var index = 0;
    
    var Boxshadoweditor = {
        cellSize:5,
        cell:0.2,
        base:[
            '%d {',
            'display:inline-block;',
            'font-size:40px;',
            'width:1em;',
            'height:1em;',
            'position:relative;',
            'overflow:hidden;',
            'color:%c',
            '}',
            '%d:before {',
            'content:" ";',
            'display:block;',
            'position:absolute;',
            'top:0;',
            'left:0;',
            'width:%sem;',
            'height:%sem;',
            'box-shadow:'
        ],
        //生成css字符串
        generateCode:function(isRule){
            var $span = $box.find('span.active'),
                code = [],
                base = this.base,
                color = $color.val() || $box.css('color'),
                selector = $classipt.val();
                background = '',
                cell = this.cell;
            
            $span.each(function(i,n){
                var coord = $(n).data(),
                    x = +(coord.x*cell).toFixed(2),
                    y = +(coord.y*cell).toFixed(2);
                
                if(!(i === 0 && !x && !y)){
                    code.push((x ? (x +'em ') : (x + ' ')) + (y ? (y +'em ') : (y + ' ')) + ',');
                }else{
                    background = color;
                }
            });
            
            if(!code.length)
                return '';
                
            code[code.length-1] = code[code.length-1].slice(0,-1)+';';
            background && code.push('background-color:'+background+';');
            code.push('}');
            
            code = (base.join('\n\t')+code.join('\n\t'))
                    .replace(/\t\}/g,'}')
                    .replace('\t%d','%d')
                    .replace(/%s/g,cell)
                    .replace('%c',color);
                    
            if(selector)
                return code.replace(/%d/g,'.' + selector);
            else
                return code.replace(/%d/g,'.icon' + ++index);
        },
        generateCell:function(){
            var cell = +$select.val(),
                cellSize = Math.pow(cell,2),
                html = '',
                x,y;
                
            for(var i=0,len=cellSize;i<len;i++){
                x = i%cell;
                y = Math.floor(i/cell);
                html += '<span data-x="'+x+'" data-y="'+y+'"></span>';
            }
            
            this.cell = 1/cell;
            this.cellSize = cell;
            $box.removeClass('cell5 cell10 cell20').addClass('cell'+cell).html(html);
        },
        insertStyle:function(styles){
            this.style.innerHTML += styles;
        },
        //拖拽绘图
        dragSelect:function(){
            var timer,
                self = this,
                startDrag = false,
                draging = false,
                startP = {};
            
            $con.mousedown(function(e){
                var x = e.clientX,
                    y = e.clientY;
                    
                timer = setTimeout(function(){
                    startDrag = true;
                },300);
                
                startP.x = x;
                startP.y = y;
            });
            
            $con.add($selectArea).mousemove(function(e){
                var x = e.clientX,
                    y = e.clientY,
                    css = {};
                    
                if(startDrag && !draging){
                    draging = true;
                    $selectArea.show();
                }
                
                if(draging){
                    css.top = startP.y;
                    css.left = startP.x;
                    
                    if((x-startP.x) < 0 )
                        css.left = x;
                        
                    if(y-startP.y < 0)
                        css.top = y;
                        
                    css.width = Math.abs(x-startP.x);
                    css.height = Math.abs(y-startP.y);
                    
                    $selectArea.css(css);
                }
            });
            
            $con.add($selectArea).mouseup(function(e){
                var endP = {};
                
                endP.x = e.clientX;
                endP.y = e.clientY;
                
                if(timer)
                    clearTimeout(timer);
                    
                draging = false;
                startDrag = false;
                
                self.doSelect(startP.x > endP.x);
                
                $selectArea.hide();
            })
        },
        doSelect:function(remove){
            var box = $box[0].getBoundingClientRect(),
                width = box.right-box.left,
                area = $selectArea[0].getBoundingClientRect(),
                cell = this.cell,
                cellSize = this.cellSize,
                start = {x:0,y:0},
                end = {x:cellSize-1,y:cellSize-1},
                selector = 'span',
                opera = remove ? 'removeClass' : 'addClass';
                
            if(area.left > box.right
            || area.right < box.left
            || area.top > box.bottom
            || area.bottom < box.top){
                return;
            }
            
            if(area.left > box.left)
                start.x = Math.floor((area.left-box.left)/(width*cell));
                
            if(area.right < box.right)
                end.x = Math.floor((area.right-box.left)/(width*cell));
            
            if(area.top > box.top)
                start.y = Math.floor((area.top-box.top)/(width*cell));
                
            if(area.bottom < box.bottom)
                end.y = Math.floor((area.bottom-box.top)/(width*cell));
            
            var $span = $box.find('span');
            
            if(start.x === 0 && end.x === cellSize - 1){
                //跨所有列
                $span.slice(start.y*cellSize,(end.y+1)*cellSize)[opera]('active');
            }else{
                $.each(new Array(end.y-start.y+1),function(i,n){
                    var before = (start.y+i)*cellSize,
                        s = before+start.x,
                        e = before+end.x+1;
                        
                    $span.slice(s,e)[opera]('active');
                });
            }
        },
        bindEvent:function(){
            var self = this;
            
            //绘图
            $box.on('click','span',function(){
                var $this = $(this);
                
                $this.toggleClass('active');
            });
            
            //改变精度
            $select.change(function(){
                self.generateCell();
            });
            
            //生成css
            $generate.click(function(){
                $code.val(self.generateCode());
            });
            
            //生成图标
            $iconbtn.click(function(){
                var rules = self.generateCode();
                self.insertStyle(rules);
                $view.append($('<span class="icon'+index+'"><i class="icon-close"></i></span>').data('style',rules));
            });
            
            //查看图标css
            $view.on('click','span',function(){
                var rules = $(this).data('style');
                $code.val(rules);
            });
            
            //删除图标
            $view.on('click','i',function(){
                $(this).closest('span').remove();
            });
        },
        init:function(){
            var head = document.getElementsByTagName('head')[0];
            
            this.style = document.createElement('style');
            head.appendChild(this.style);
            
            this.generateCell();
            this.bindEvent();
            this.dragSelect();
        }
    };
    
    Boxshadoweditor.init();
})();