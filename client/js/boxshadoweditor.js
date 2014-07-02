(function(){
    var $box = $('#edit-box');
    var $select = $('#cell-select');
    var $generate = $('#generate-btn');
    var $iconbtn = $('#icon-btn');
    var $code = $('#code');
    var $view = $('#view');
    var $color = $('#color');
    var index = 0;
    
    var Boxshadoweditor = {
        cell:0.2,
        base:[
            '.icon%d {',
            'display:inline-block;',
            'width:40px;',
            'height:40px;',
            'font-size:40px;',
            'position:relative;',
            'overflow:hidden;',
            '}',
            '.icon%d:before {',
            'content:" ";',
            'display:block;',
            'position:absolute;',
            'top:0;',
            'left:0;',
            'width:%sem;',
            'height:%sem;',
            'box-shadow:'
        ],
        generateCode:function(isRule){
            var $span = $box.find('span.active'),
                code = [],
                base = this.base,
                color = $color.val(),
                background = '',
                cell = this.cell;
            
            $span.each(function(i,n){
                var coord = $(n).data('coord').split(','),
                    x = +(coord[0]*cell).toFixed(2),
                    y = +(coord[1]*cell).toFixed(2);
                
                if(!(i === 0 && !x && !y)){
                    code.push((x ? (x +'em ') : (x + ' ')) + (y ? (y +'em ') : (y + ' ')) + color + ',');
                }else{
                    background = color;
                }
            });
            
            code[code.length-1] = code[code.length-1].slice(0,-1)+';';
            background && code.push('background-color:'+color+';');
            code.push('}');
            
            return (base.join('\n\t')+code.join('\n\t'))
                    .replace(/\t\}/g,'}')
                    .replace('\t.icon','.icon')
                    .replace(/%d/g,++index)
                    .replace(/%s/g,cell);
        },
        generateCell:function(){
            var cell = +$select.val(),
                cellSize = Math.pow(cell,2),
                html = '',
                coord = '';
                
            for(var i=0,len=cellSize;i<len;i++){
                coord = i%cell+','+Math.floor(i/cell);
                html += '<span data-coord="'+coord+'"></span>';
            }
            
            this.cell = 1/cell;
            $box.removeClass('cell5 cell10 cell20').addClass('cell'+cell).html(html);
        },
        insertStyle:function(styles){
            var head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);
            style.innerHTML = styles;
        },
        bindEvent:function(){
            var self = this;
            
            $box.on('click','span',function(){
                var $this = $(this);
                
                $this.toggleClass('active');
            });
            
            $select.change(function(){
                self.generateCell();
            });
            
            $generate.click(function(){
                $code.val(self.generateCode());
            });
            
            $iconbtn.click(function(){
                var rules = self.generateCode();
                self.insertStyle(rules);
                $view.append($('<span class="icon'+index+'"></span>').data('style',rules));
            });
            
            $view.on('click','span',function(){
                var rules = $(this).data('style');
                $code.val(rules);
            });
        },
        init:function(){
            this.generateCell();
            this.bindEvent();
        }
    };
    
    Boxshadoweditor.init();
})();