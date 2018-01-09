﻿var JGForm = function (box,obj,cols) {
     /*
        depend:jquery-1.11.3.js  
        arguments&typeof:
             0.box parent >parent selector string
             1.obj >json
             

       
        updateDate:17-12-21
        Author:JG Yu
        */
    if (this instanceof JGForm) {
        this.id = 'JGForm_' + Math.random().toString(36).substr(2);
        this.config = {
            INPUT: {
                'desc': 'Comments',
                'name':'FDJ_EJ',
                'type': 'text',/*text,number*/
                'value': '',
                'minlength': 0,
                'maxlength': 300,
                'min': -Infinity,
                'max': Infinity,
              
                'click':
                    function () { },
                'focusin':
                    function () { },
                'change':
                    function () { }

            },
            SELECT: {
                'desc': 'Department',
                'name': 'FDJ_EJ',
                'type':'select',
                'selectType':'radio',/*date,month,radio,checkbox*/
                'value': "",
                'minlength': 1,
                'maxlength': 10000,
                'data-Source': ['dchuw kioed','as','qw']
               
            },
            ATTACHMENT: {
                'desc': 'upload',
                'name': 'FDJ_EJ',
                'type': 'attachment',
                'value':'',
                'minlength': 0,
                'maxlength': 3,
                'maxSize': 4,/*unit Mb,4096Kb=4Mb*/
               'fizeType': "xlsx,docx,pptx,jpg,png,gif,msg,pdf"
              
            },
            EDITOR: {
                'desc': 'remark',
                'name': 'remark',
              
                'value': "",
                'html':"",
                'minlength': 1,
                'maxlength': 10000
              

            },
            BUTTON: {
                'type': 'button',
                'value':'Submit',
                'skin': 'btn',
                'click':
                function () { }
            }

           
        };
        this.asynLoadConfig = [
            {
                type: 'style',
                name: 'monthStyle',
                load: true,
                url: 'http://yujiangong.com/jm_month/jg_month.css?=' + this.id
            }, {
                type: 'style',
               name:'commonStyle',
                load: true,
                url: 'style/JGForm.css?_=' + this.id
            },
            {
                type: 'script',
               name: 'dateScript',
                load: true,
                url: 'laydate/laydate.js?_=' + this.id
            },
            {
                type: 'script',
                name: 'monthScript',
                load: true,
                url: 'http://yujiangong.com/jm_month/jg_month.js?=' + this.id

                
            }
            //,
            //{
            //    type: 'script',
            //    name: 'wangEditor',
            //    load: true,
            //    url: 'https://unpkg.com/wangeditor/release/wangEditor.min.js'
            //    //unpkg.com/wangeditor/release/wangEditor.min.js
            //}
            //,
            //{
            //    type: 'script',
            //    name: 'xss',
            //    load: true,
            //    url: 'https://raw.github.com/leizongmin/js-xss/master/dist/xss.js'
            //    //unpkg.com/wangeditor/release/wangEditor.min.js
            //}

        ]
        this.addFile = '<a href="javascript:;"  class="fileBox" addFile><span>ChooseFile</span><input type= "file" name= "file" /><i></i> </a >';
        this.addLink = '<a  title="Input a link." class="fileBox" addLink><input type= "text" name= "addLink" /><i></i></a >';
        this.cacheObj = {};
        this.cols = cols;
        this.init(box,obj);
    } else {
        return new JGForm(box,obj,cols)
    }


   // return $(this.config.selector)
}
JGForm.prototype = {
    constructor: JGForm,
    getPath: function () {  
            
        c = $('[src*="JGForm.js"]')[0].src;
        return c.substring(0, c.lastIndexOf("/script/JGForm.js") + 1);          
           
    },
    asynLoad: function () {
        var arg = arguments;//[0] asynLoadConfig [1] path [2]callback
       
        var that = this;
        if (Object.prototype.toString.call(arg[0]).slice(8, -1) === "Array") {
            var loadConfig = arg[0]; var path = arg[1];
            if (loadConfig.length > 0) {
                var currentObj = loadConfig.shift();
                console.log(currentObj);
                switch (currentObj['type']) {
                    case 'style':
                        $('[name=' + currentObj['name'] + ']').length === 0
                            &&
                        $("<link>").attr({
                            rel: "stylesheet",
                            type: "text/css",
                            href: /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/.test(currentObj['url']) ? currentObj['url']:path + currentObj['url'],
                            name: currentObj['name']
                        }).appendTo("head").load(function () {
                            //callback
                            return arg.callee(loadConfig, path, arg[2]);

                            });

                        break;
                    case 'script':
                        $('[src*="' + currentObj['url'] + '"]').length === 0
                            &&                            
                            $.getScript(/(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/.test(currentObj['url']) ? currentObj['url'] : path + currentObj['url'],
                            function () {
                                  //callback
                                return arg.callee(loadConfig, path, arg[2]);
                            });
                        break;
                    default:
                        var x = 1;
                        break;
                }



            } else {
                arg[2];

            }

        } else {
            return null;
        }

    },
    init: function (box,obj) {
        var that = this, box = box, obj = obj;
        if (typeof obj === "object") {
            for (var i = 0; len = obj.length, i < len;i++) {
             //   obj[i] = $.extend(that.config[obj[i]['category']], obj[i]);
                var cate = that.config[obj[i]['category']];
                for (cates in cate) {
                    !obj[i].hasOwnProperty(cates) && (obj[i][cates]=cate[cates])
                }
            }
            that.cacheObj = obj;
            
            that.asynLoad(that.asynLoadConfig, that.getPath(), that.renderForm(box, obj))
        };
        
      
    },

    renderForm: function (box, obj) {
        var that = this, box = box, obj = obj, cols =that.cols, inpList = '', btnList = '', retVal = " ";
       
        for (var i = 0; len = obj.length, i < len; i++) {

            if (obj[i]['category'] === 'BUTTON') {
                var a = obj[i];
                retVal = " ";
                for (alist in a) {
                    Object.prototype.toString.call(a[alist]).slice(8, -1) !== 'Function' &&
                        (retVal += alist + "='" + a[alist] + "'");                   
                }
                btnList += "<input class='JGFormBtn_" + a['category'] + "' id=" + that.id + "_" + i + "' " + retVal + " />"
            } else {
                inpList += that.format("<div class='JGFormRow' ><label>{0}</label><div type='{2}' maxlength='{3}'>{1}</div></div>",
                  
                   [ obj[i]['desc'],
                    (function (a, b, ind) {
                        retVal = " ";
                        for (alist in a) {
                            Object.prototype.toString.call(a[alist]).slice(8, -1) !== 'Function' &&
                                (retVal += alist + "='" + a[alist] + "' ");
                        }
                        switch (a['category']) {
                            case 'INPUT':
                              
                                return "<input class='JGFormRow_" + a['category'] + "' id=" + b.id + "_" + ind + "  " + retVal + " />"

                                break;
                            case 'SELECT':
                                
                                    return "<input  class='JGFormRow_" + a['category'] +"'  id=" + b.id + "_" + ind + " name='" + a['desc'] + "' " + retVal + " />"
                               
                                break;
                            case 'ATTACHMENT':
                                return "<span class='addBox'  " + retVal + " ><span class='addLeft'>+</span><span class='addRight'><span class='addFile'>File</span><span class='addLink'>Link</span></span></span>";
                                break;
                            case 'EDITOR':
                                return "<div class='JGFormEditor_" + a['category'] +" editorBox' id=" + b.id + "_" + ind + " ></div>";
                                break;
                            default:
                               
                                break;
                        }
                    })(obj[i], that, i),
                    obj[i]['type'],
                        obj[i]['maxlength']
                    ]
                );
            }
            //元素渲染后触发的事件
            !!obj[i]['completed'] &&
                (function (a,b) {
                setTimeout(function () {
                    console.log(b);
                    !!a['completed'](b)
                }, 0);

            })(obj[i], that.id+"_"+ i)
              

        }
        $(box).append("<div class='JGFormBox'><form enctype='multipart/form-data' method='post' name='JGForm'>" + inpList + "</form><div class='JGFormBtn'>" + btnList + "</div></div>");
        $(box + ' .JGFormBox .JGFormRow').css('width', (0 | (99 / (0 | cols))) + '%');
        that.eventBind(box, obj);
    },
    returnIndex: function ($elem) {
        return +(('' + $elem.attr('id')).split('_').slice(-1)[0]);
    }
    , eventBind: function (box, obj) {
        var that = this;
        var obj = obj, box = box;
        $(box).delegate('.JGFormBox [class*=JGFormRow_]', 'click focus input propertychange change resize', function (e) {
            
            var ind = that.returnIndex($(this));
            if (!!obj[ind][e.type]) {
                console.log(e.type);
                obj[ind][e.type]($(this));
                e.stopPropagation();//若用户指定了事件，则阻止冒泡 <<关键代码>>
            }
            else {
                console.log(JSON.stringify(obj[ind]) + '\r\n' + e.type);
            }
        });
        $(box).delegate('.JGFormRow div', 'click', function (e) {
            //监听从select传入父级的点击事件,若用户未指定事件，则执行下面的默认事件。
           
            var $elem = $(e.target);
            switch ($elem.attr('selectType')) {
                case 'date':
                    laydate();
                    break;
                case 'month':
                    jmonth();
                    break;
                case 'radio':
                    that.builderDrop($elem, obj);
                    
                    break;
                case 'checkbox':
                    that.builderDrop($elem, obj);
                    break;
                default:
                    break;
            }
            e.stopPropagation();
        })
        //attach uoload
        $('.JGFormRow div[type=attachment] .addBox .addRight [class*=add]').click(function () {
            var $elem = $(this), $parent = $elem.parents('.addBox');
            var maxlength = +$(this).parents('div[type=attachment]').find('.addBox').attr('maxlength');
            if ($parent.parents('div[type=attachment]').find('.fileBox').length >= maxlength) {
                alert('Max attachment number:' + maxlength); return;
            }
            if ($elem.attr('class') === 'addFile') {
                $parent.before(that.addFile);
                $parent.parents('div[type=attachment]').find('a[addFile] input').last().trigger('click');
            }
            else if ($elem.attr('class') === 'addLink') {
                $parent.before(that.addLink);
                $parent.parents('div[type=attachment]').find('a[addLink] input').last()[0].focus();
            }

        })
        //inspect file 
        $(box).delegate('a[addFile] input', 'propertychange change', function () {
            if (event.type != "propertychange" || event.originalEvent.propertyName == "value") {
                var $addBox = $(this).parents('div[type=attachment]').find('.addBox');
            
                var fn = $(this).val();
                if (fn === "") { return; }
                var fileSize = $(this)[0].files[0].size / 1024 / 1024;
                if (fileSize > +$addBox.attr('maxSize')                ) {
                    alert('Attachment size<' + $addBox.attr('maxSize')+'M'); return;
                }
                if ($addBox.attr('fizeType').indexOf(fn.split('.').slice(-1)[0].toLowerCase()) > -1) {
                    $(this).parent().find('span').text(fn.split('\\').slice(-1)[0])
                    $(this).parent().addClass('filechoose');
                } else {
                    alert('Only ' + $addBox.attr('fizeType'));
                    $(this).val('');
                    $(this).parent().find('span').text('Reselect');
                }
            }
        })
        $(box).delegate('a[addLink] input', 'blur', function (e) {
            var $elem = $(this);
            $elem.parent().attr('title', $elem.val());
            /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/.test($elem.val())
            ?
            $.ajax({
                url: $elem.val(),
                type: "get",
                complete: function (response) {
                    if (response.status == 404) {
                        $elem.parent().addClass('fileerror').removeClass('filechoose');
                    } else {
                        $elem.parent().addClass('filechoose').removeClass('fileerror');
                    }
                }
            
                }) : $elem.parent().addClass('fileerror').removeClass('filechoose');


            e.stopPropagation();
        })
        $(box).delegate('.fileBox i', 'click', function () {
            $(this).parents('.fileBox').remove();
        })

        //$(box).delegate('.JGFormBox [class*=JGFormBtn input]', 'click', function (e) {
        //    var ind = that.returnIndex($(this));
        //    if (!!obj[ind][e.type]) {
        //        obj[ind][e.type]($(this));
        //        e.stopPropagation();//若用户指定了事件，则阻止冒泡 <<关键代码>>
        //    }
        //    else {
        //        console.log(JSON.stringify(obj[ind]) + '\r\n' + e.type);
        //    }
        //});

        //点击空白处隐藏。
        $(document).mouseup(function (event) {
            var $con = $('.JGFormSelectBox');   // 设置目标区域
            if (!$con.is(event.target) && $con.has(event.target).length === 0) { 

                $('.JGFormSelectBox').remove();  
            }
        });
   

        
       

    },
    builderDrop: function ($elem, obj) {
        $(".JGFormSelectBox").remove();
        var that = this, $elem = $elem, obj = obj, ind = that.returnIndex($elem);
      

        $('body').append('<div  class=\'JGFormSelectBox\' ><ul from="' + $elem.attr('id') + '" selectType="' + obj[ind]['selectType'] + '"></ul><div  class=\'JGFormSelectBtn\'><a  class=\'JGFormSelectBtnClr\' >Clear</a><a  class=\'JGFormSelectBtnCls\' >Close</a></div></div>')
       
        $('.JGFormSelectBox').css({
            "left": $elem.offset().left-1,
            "top": $elem.offset().top + $elem.outerHeight(),
            "width" :$elem.outerWidth()
        });
      
        var dataSource = obj[ind]['data-Source'],
            len = 0;
        switch (that.typeOf(dataSource)) {
            case "String":
                $.getJSON(dataSource, function (data) {
                    $('.JGFormSelectBox ul').append(that.builderLI(data));
                   
                })
                break;
            case "Array":
                $('.JGFormSelectBox ul').append(that.builderLI(dataSource));
               
                break;

            default:
              
                break;
        }
    }
    ,
    builderLI: function (data) {
        var that = this, data = data, liList = "";
        for (var i = 0; len = data.length, i < len; i++) {
            if (that.typeOf(data[i]) === "Object") {
                liList += "<li value='" + data[i][Object.keys(data[i])[0]] + "'>" + data[i][Object.keys(data[i]).slice(-1)[0]] + "</li>"

            } else {
                liList += "<li value='" + data[i] + "'>" + data[i] + "</li>"
            }
        }
        //队列末尾加入selectBox 子元素的事件监听
        setTimeout(function () {
            $('.JGFormSelectBox ul li').click(function () {
                var $that = $(this), $parent = $that.parents('ul[selectType]'),
                    $drop = $('#' + $parent.attr('from'));
                switch ($parent.attr('selectType')) {
                    case "radio":
                        $drop.val($that.attr('value'));
                        $('.JGFormSelectBox .JGFormSelectBtnCls').trigger('click');//
                        break;
                    case 'checkbox':
                        $drop.val($drop.val()+$that.attr('value')+",");
                        break;
                    default:
                        break;
                }
               

            })
            $('.JGFormSelectBox .JGFormSelectBtnCls').click(function () {
                $(".JGFormSelectBox").remove();
            })
            $('.JGFormSelectBox .JGFormSelectBtnClr').click(function () {
                var $that = $(this), $parent = $that.parents('.JGFormSelectBox').find('ul[selectType]');
               
                    $('#' + $parent.attr('from')).val("");
            })
        }, 0);        
        return liList;
    }
    , format: function () {
        var arg = arguments[0] || "";
        var arr = arguments[1] || []
        return arg.replace(/\{(\d+)\}/ig,
            function (a, b) {

                return arr[b] || "";
            });

    },
    typeOf: function () {
        return Object.prototype.toString.call(arguments[0]||'').slice(8, -1)
    }
    ,
    contain: function () {
        switch (this.typeOf(arguments[0])) {
            case String:
                return (arguments[0].indexOf(arguments[1]) > -1);
                break;
            case Array:
                return ((''+arguments[0]).indexOf(','+arguments[1]+',') > -1)
                break;
            default:
                return !1;
                break;
        }
    }

}





