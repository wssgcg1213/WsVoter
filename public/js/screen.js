/**
 * Created by Liuchenling on 4/7/15.
 */
console.log('load screen.js');

//var socket = io(location.origin, { path : "/wsvoter/sio" });

var initBottom = 10,
    initHeight = 4,
    maxInc = 138;

var inc = 0;
$(document).click(function(){
    inc++;
    $('.vote').find('.vote-top').css('bottom', initBottom + inc +'px');
    $('.vote').find('.vote-bottom').css('height', initHeight + inc +'px');
});