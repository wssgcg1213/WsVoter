/**
 * Created by Liuchenling on 4/7/15.
 */
console.log('load screen.js');

var socket = io(location.origin + '/screen', { path : "/wsvoter/sio" });
var initBottom = 10,
    initHeight = 4;
var $vote = $('.vote');
//var initBottom = 10,
//    initHeight = 4,
//    maxInc = 138;
var initTimer = 0;
var connected = false;
socket.on('connect', function() {
    if(connected) return console.log('重新连上服务器了!');
    connected = true;

    console.log('连上服务器了');
    initTimer = setInterval(function() {
        socket.emit('query');
        console.log('emit query');
    }, 2000);
    socket.on('init', queryHandler);
    socket.on('queryReturn', queryHandler);
});
function queryHandler(voters) {
    clearInterval(initTimer);
    console.log('init/query:', voters);
    if(voters.forEach)
        voters.forEach(function(v) {
            var $v = $vote.filter('[data-vote="' + v.name + '"]'),
                inc = parseInt(0.345 * v.voteNumber) || 0;
            inc = inc >= 138 ? 138 : inc;
            $v.find('.vote-number').text(v.voteNumber + '票');
            $v.find('.vote-top').css('bottom', initBottom + inc +'px');
            $v.find('.vote-bottom').css('height', initHeight + inc +'px');
        });
}
//document.ready
//400票为100% -> 138px
//1票对应 0.25% -> 0.345px
$(function() {

    $vote.each(function(i, v) {
        var $v = $(v),
            initNumber = parseInt($v.find('.vote-number').text()) * 0.345 || 0;
        initNumber = initNumber >= 138 ? 138 : initNumber;
        $v.find('.vote-top').css('bottom', initBottom + initNumber +'px');
        $v.find('.vote-bottom').css('height', initHeight + initNumber +'px');
    });
});


$(function(){
   $('.vote').slice(8).find('.vote-name').css("color", "#FFFC00");
});