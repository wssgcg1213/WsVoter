#!/usr/bin/env node

var fs = require('fs'),
    voterModel = require('../models/voters'),
    candidatesModel = require('../models/candidates');

var mongoose = require('mongoose');
mongoose.connect('mongodb://wssgcg1213:6884650@localhost:27017/wsvoter');

voterModel.update({}, {record: "[]"}, { multi: true }, function(err, doc){
    if(err) return console.log("err", err);
    console.log(doc.uniqueid);
});

candidatesModel.update({}, {voteNumber: 0}, { multi: true }, function(err, doc){
    if(err) return console.log("err", err);
    console.log(doc.name);
});

