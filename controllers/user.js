/**
 * Created by Liuchenling on 4/7/15.
 */


var candidates = require('../models/candidates');
var candidatesModel = candidates;
var votersModel = require('../models/voters');
var cpool = require('../models/cpool');
var EventProxy = require('eventproxy');
var uuid = require('uuid');
var voteLimit = require('../config').voteLimit;


function postHandler(req, res) {
    var candidateName = req.body.name,
        uniqueid = req.body.uniqueid;
    if(!candidateName || !uniqueid) {
        return res.json({
            info: "invalid vote!"
        });
    }

    votersModel.findOne({uniqueid: uniqueid}, function(err, doc){
        if(err){
            console.log('findOne', err);
        }
        if(!doc){
            return res.json({status: 404});
        }else{
            var _record = JSON.parse(doc.record);
            console.log(_record);
            if(_record.length >= voteLimit){
                return res.json({
                    info: "最多只能投" + voteLimit + "票"
                });
            }

            candidatesModel.where({name: candidateName}).update({$inc: {voteNumber: 1}}, function(err) {
                if (err) {
                    console.log('where', err);
                }

                _record.push(candidateName);
                return votersModel.where({uniqueid: uniqueid}).update({record: JSON.stringify(_record)}, function(){
                    return res.json({
                        info: "ok"
                    });
                });
            });
        }
    });
    setTimeout(function(){
        res.json({
            info: "超时"
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

    var uniqueid = req.param('uniqueid');
    votersModel.findOne({uniqueid: uniqueid}, function(err, voter){
        if(err) return console.log('1.', err);
        if(voter){
            ep.emit('voter', voter);
        }else{
            return res.render('verify');
        }
    });

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
}