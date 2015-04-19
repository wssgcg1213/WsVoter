/**
 * Created by Liuchenling on 4/11/15.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var candidate = new Schema({
    id: ObjectId,
    name: String,
    voteNumber: Number,
    sex: String,
    avatar: String,
    description: String
});
var candidates = new Schema([candidate]);

module.exports = mongoose.model('candidates', candidates);

var tmp = [{
    id: 1,
    name: "王尼玛",
    voteNumber: 123,
    sex: 'female',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "尼玛县，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 2,
    name: "啥啥啥",
    voteNumber: 290,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "222，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 3,
    name: "对对对",
    voteNumber: 346,
    sex: 'female',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "333，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 4,
    name: "飞飞飞",
    voteNumber: 666,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "444，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
},{
    id: 5,
    name: "王尼玛",
    voteNumber: 190,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "尼玛县，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 6,
    name: "啥啥啥",
    voteNumber: 333,
    sex: 'female',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "222，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 7,
    name: "对对对",
    voteNumber: 99,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "333，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 8,
    name: "飞飞飞",
    voteNumber: 24,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "444，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
},{
    id: 9,
    name: "王尼玛",
    voteNumber: 123,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "尼玛县，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 10,
    name: "啥啥啥",
    voteNumber: 157,
    sex: 'female',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "222，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 11,
    name: "对对对",
    voteNumber: 123,
    sex: 'male',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "333，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}, {
    id: 12,
    name: "飞飞飞",
    voteNumber: 45,
    sex: 'female',
    avatar: "http://www.zeroling.com/content/images/2015/Mar/QQ20150331-3-2x.png",
    description: "444，位于西藏自治区的中部、那曲地区西北部，县人民政府驻尼玛镇。总面积72499.41平方千米。总人口4万人（2003年）。辖1个镇、13个乡，77个行政村。2009年底总人口为27375人，下辖1个镇、13个乡，77个行政村。尼玛县经济以牧业为主，特..."
}];



