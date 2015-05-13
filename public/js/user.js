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

    var idSearch = location.search.match(/uniqueid=(\d+)/);
    var uniqueid = idSearch[1];

    //var voteCount = 0; //已经投过的计数
    $('.vote-btn').on('click', btnHandler);

    function btnHandler(e){
        var $this = $(this);
        $(this).off('click', btnHandler);

        var name = $this.parents('li').data('name');
        if($this.parents('li').data('voted')) return;
        $.post(location.href, {
            name: name,
            uniqueid: uniqueid
        }, function(res){
            if(res && res.info){
                alert(res.info == 'ok' ? "投票成功" : res.info);
                if(res.info == "ok"){
                    $this.parents('li').data('voted', 'yes');
                    $this.find('.love').html('&#xe62f;');
                    $this.find('span').text('已投!');
                }else{
                    $this.on('click', btnHandler); //投票失败了 重新加上
                }
            }
        });
    }


//});