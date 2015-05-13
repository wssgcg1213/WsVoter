#!/usr/bin/env node

var fs = require('fs'),
    voterModel = require('../models/voters');
var mongoose = require('mongoose');
mongoose.connect('mongodb://wssgcg1213:6884650@localhost:27017/wsvoter');

var gened = [];
function generateId(){
    var result = ('' + Math.random()).slice(-6);
    if(gened.indexOf(result) > -1){
        return generateId();
    }
    return gened.push(result);
}

for(var i = 0; i < 1000; i++){
    generateId();
}
gened.map(function(id){
    var data = new voterModel({
        uniqueid: id,
        record: "[]"
    });
    data.save(function(e){
        if(e){return console.log(e)}
    });
});

fs.appendFileSync('uniqueids.txt', gened.join("\n"));
console.log(gened.length, "generated");
process.exit(0);