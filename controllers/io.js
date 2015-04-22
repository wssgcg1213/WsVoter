/**
 * Created by Liuchenling on 4/7/15.
 */
var candidatesModel = require('../models/candidates');
var votersModel = require('../models/voters');
var util = require("util");
var events = require("events");

//生成cache器
//var candidatesObj = (function() {
//    function CachedVoteNotify(id, max) {
//        this.id = id;
//        this.n = 0;
//        this.max = max || 5; //default to 5
//        events.EventEmitter.call(this);
//    }
//    util.inherits(CachedVoteNotify, events.EventEmitter);//使这个类继承EventEmitter
//    CachedVoteNotify.prototype.vote = function (fn) {
//        if (++this.n >= this.max) {
//            fn && fn();
//            this.n = 0;
//        }
//    };
//    var candidatesObj = {};
//    candidates.find({}, function(err, res){
//        if(!err) {
//            res.forEach(function (c) {
//                candidatesObj['no' + c.id] = new CachedVoteNotify(c.id);
//            });
//        }
//        return candidatesObj;
//    });
//})();

module.exports = function (io){
    var screen = io.of('/screen'),
        user = io.of('/user');

    //todo 以下screen部分
    screen.on('connect', function(socket) {
        console.log('screen connected!');
        candidatesModel.find({}, function(err, docs){
            socket.emit('init', docs);
        });
        socket.on('query', function() {
            candidatesModel.find({}, function(err, docs){
                socket.emit('queryReturn', docs);
            });
        });
    });


    //todo 以下用户部分
    user.on('connection', function(socket) {
        candidatesModel.find({}, function(err, docs){
            socket.emit('init', docs);
        });
        socket.on('vote', function(obj) {
            var candidateName = obj.name,
                uniqueid = obj.uniqueid;
            if(!candidateName || !uniqueid) return console.log('没有candidateName或uniqueid');
            //todo if(candidates[candidateId]['votedUniqueIds'].indexOf(uniqueid) > -1) return console.log('这个人已经投过了');
            candidatesModel.where({name: candidateName}).update({$inc: {voteNumber: 1}}, function(err) {
                if(err) {
                    console.log('where', err);
                }

                votersModel.findOne({uniqueid: obj.uniqueid}, function(err, doc){
                    if(err){
                        console.log('findOne', err);
                    }
                    if(!doc){
                        var _voter = {
                            record: JSON.stringify([candidateName]),
                            uniqueid: uniqueid
                        };
                        var _vm = new votersModel(_voter);
                        _vm.save(function(err){
                            candidatesModel.find({}, function(err, docs){
                                if(err) {
                                    console.log('find', err)
                                }
                                screen.emit('queryReturn', docs);
                            });
                        });
                    }else{
                        var record = JSON.parse(doc.record);
                        record.push(obj.name);
                        votersModel.where({uniqueid: obj.uniqueid}).update({record: JSON.stringify(record)}, function(){
                            candidatesModel.find({}, function(err, docs){
                                if(err) {
                                    console.log('candidateFind', err);
                                }
                                screen.emit('queryReturn', docs);
                            });
                        });
                    }
                });
            });
        });
    });

};