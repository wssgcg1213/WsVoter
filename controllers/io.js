/**
 * Created by Liuchenling on 4/7/15.
 */
var candidates = require('../models/candidates');
var util = require("util");
var events = require("events");

//生成cache器
var candidatesObj = (function() {
    function CachedVoteNotify(id, max) {
        this.id = id;
        this.n = 0;
        this.max = max || 5; //default to 5
        events.EventEmitter.call(this);
    }
    util.inherits(CachedVoteNotify, events.EventEmitter);//使这个类继承EventEmitter
    CachedVoteNotify.prototype.vote = function (fn) {
        if (++this.n >= this.max) {
            fn && fn();
            this.n = 0;
        }
    };
    var candidatesObj = {};
    candidates.forEach(function (c) {
        candidatesObj['no' + c.id] = new CachedVoteNotify(c.id);
    });
    return candidatesObj;
})();

module.exports = function (io){
    var screen = io.of('/screen'),
        user = io.of('/user');

    //todo 以下screen部分
    screen.on('connect', function(socket) {
        console.log('screen connected!');
        socket.emit('init', candidates);
        socket.on('query', function() {
            socket.emit('queryReturn', candidates);
        });
    });


    //todo 以下用户部分
    user.on('connection', function(socket) {
        socket.emit('init', candidates);
        socket.on('vote', function(obj) {
            var candidateId = obj.voteId,
                uniqueid = obj.uniqueid;
            if(!candidateId || !uniqueid) return console.log('没有candidateId或uniqueid');
            //todo if(candidates[candidateId]['votedUniqueIds'].indexOf(uniqueid) > -1) return console.log('这个人已经投过了');
            candidatesObj['no' + candidateId].vote(function() {
                screen.emit('queryReturn', candidates); //五次投票之后刷新大屏幕
            });
        });
    });

};