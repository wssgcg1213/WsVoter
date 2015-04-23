/**
 * Created by Liuchenling on 4/7/15.
 */
console.log('load user.js');

//var socket = io(location.origin + '/user', { path : "/wsvoter/sio" });

//var connected = false;
//socket.on('connect', function() {
//    if(connected) return console.log('再次连接上');
//    connected = true;
//    console.log('连上去了');

    var uniqueid = getCookie("voter") || (function(){
            var id = createUniqueId(20);
            setCookie("voter", id);
            return id;
        })();//创建用户识别码 存COOKIE

    //var voteCount = 0; //已经投过的计数
    $('.vote-btn').on('click', btnHandler);

    function btnHandler(e){
        var $this = $(this);
        $(this).off('click', btnHandler);
        $.post(location.href, {
            name: name,
            uniqueid: uniqueid
        }, function(res){
            if(res && res.info){
                alert(res.info == 'ok' ? "投票成功" : res.info);
                if(res.info == "ok"){
                    var name = $this.parents('li').data('name');
                    if($this.parents('li').data('voted')) return;
                    $this.parents('li').data('voted', 'yes');
                    $this.find('.love').html('&#xe62f;');
                    $this.find('span').text('已投!');
                    //var $num = $this.parent().find('.vote-number')
                    //var preCount = parseInt($num.text()) || 0;
                    //$num.text(++preCount + '票');
                    //voteCount++;
                }else{
                    $this.on('click', btnHandler); //投票失败了 重新加上
                }
            }
        });
    }
//});


/**
 * 创建唯一的识别码
 * @param n 位数 默认10
 * @returns {string}
 */
function createUniqueId(n){
    n = n || 10;
    var id = '';
    for(var i = 0; i < n; i++)
        id += Math.floor(Math.random() * 10);
    return id;
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');    //把cookie分割成组
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];                      //取得字符串
        while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格
            c = c.substring(1,c.length);      //有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name
            return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值
        }
    }
    return false;
}

//清除cookie
function clearCookie(name) {
    setCookie(name, "", -1);
}

//设置cookie
function setCookie(name, value, seconds) {
    seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    if (seconds != 0 ) {      //设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
}