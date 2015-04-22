/**
 * Created by Liuchenling on 4/7/15.
 */


var candidates = require('../models/candidates');
var candidatesModel = candidates;
var votersModel = require('../models/voters');
var cpool = require('../models/cpool');
var EventProxy = require('eventproxy');
var uuid = require('uuid');


function postHandler(req, res) {
    var candidateName = req.body.name,
        uniqueid = req.body.uniqueid;
    if(!candidateName || !uniqueid) return console.log('没有candidateName或uniqueid');
    candidatesModel.where({name: candidateName}).update({$inc: {voteNumber: 1}}, function(err) {
        if(err) {
            console.log('where', err);
        }
        votersModel.findOne({uniqueid: uniqueid}, function(err, doc){
            if(err){
                console.log('findOne', err);
            }
            if(!doc){
                var _voter = {
                    record: JSON.stringify([candidateName]),
                    uniqueid: uniqueid
                };
                var _vm = new votersModel(_voter);
                return _vm.save(function(err){
                    updateScreen();
                    return res.json({
                        info: "ok"
                    });
                });
            }else{
                var record = JSON.parse(doc.record);
                record.push(candidateName);
                return votersModel.where({uniqueid: uniqueid}).update({record: JSON.stringify(record)}, function(){
                    updateScreen();
                    return res.json({
                        info: "ok"
                    });
                });
            }
        });
    });
    setTimeout(function(){
        res.json({
            info: "timeout"
        });
    }, 3000);
}

module.exports = function(req, res) {
    if(req.method.toUpperCase() == 'POST'){
        return postHandler.apply(this, arguments);
    }
    var ep = EventProxy.create('cpool', 'candidates', 'voter', function(cpool, candidates, voter){
        //console.log(voter);
        return res.render('user', {
            title: "投票",
            voter: voter.record,
            cpool: cpool,
            candidates: candidates
        });
    });

    var uniqueid = req.cookies['voter'];
    if(!uniqueid){
        uniqueid = uuid.v4();
        res.cookie('voter', uniqueid);
    }


    candidates.find({}, function(err, candidates) {
        if(err) return console.log(err);
        //console.log('candidates', candidates);
        ep.emit('candidates', candidates || []);
    });

    cpool.find({}, function(err, cpool){
        if(err) return console.log(err);
        //console.log('cpool', cpool);
        ep.emit('cpool', cpool || []);
    });

    votersModel.findOne({uniqueid: uniqueid}, function(err, voter){
        if(!voter || voter.length == 0){ //如果没有找到就新建
            var _v = new votersModel({
                uniqueid: uniqueid,
                record: "[]"
            });
            _v.save(function(err, voter){
                ep.emit('voter', voter);
            });
        }else{
            ep.emit('voter', voter);
        }
    });
}