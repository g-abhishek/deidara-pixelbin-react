
const { bg } = require('./output/javascript/plugins/EraseBG');
const { resize } = require('./output/javascript/plugins/Sharp');
const Image = require('./output/javascript/image');

let img=new Image("abc");

let t1 = bg()

let t2 = resize()

let t3 = t1.and(t2);

console.log(img.setTransformation(t3).getUrl());