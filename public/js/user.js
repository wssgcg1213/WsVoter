/**
 * Created by Liuchenling on 4/7/15.
 */
console.log('load user.js');

var socket = io(location.origin, { path : "/wsvoter/sio" });
//var socket = io("http://localhost:3000/wsvoter/sio/my");
socket.on('connect', init);

function init(){
    socket.emit('reg', {
        type: 'voter'
    });
    socket.emit('query');
}

/**
 * 接收到die指令的时候 断开连接
 */
socket.on('die', function(){
    socket.disconnect();
});

/**
 * Log
 */
socket.on('disconnect', function(){
    console.log('died');
})

function ling(i){return document.querySelector(i);}
ling('#btn').addEventListener('click', function(){
    socket.emit('vote', {id: 1});
}, false);

socket.on('voteReturn', function(obj) {
   if(obj && typeof obj.num == 'number'){
       ling('#nowVoteNum').innerHTML = obj.num;
   }
});
socket.on('queryReturn', function(obj) {
    ling('#nowVoteNum').innerHTML = obj.vote;
    console.log('voterCount:', obj.voterCount);
});