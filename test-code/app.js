// import pixelbin from 'pixelbin'
// import EraseBG from 'pixelbin/plugins/EraseBG.js'
// let {bg} = bg1;
// const bg = EraseBG.bg;
// const Image = pixelbin.Image;
// console.log(EraseBG.bg());
// let image = new Image("dfgh");
// console.log(image.setTransformation(t1).getUrl());


import {resize} from "pixelbin/plugins/Sharp.js";
import EraseBg from "pixelbin/plugins/EraseBG.js";

import Pixelbin from 'pixelbin';

// https://cdn.pixelbin.io/yellow-block-cd3e57/t.resize(w:1143,h:995)~t.compress()/uploads/original/0b7b31de-6fa5-4883-92fd-23843ce3e286.jpeg
let pixelbin = new Pixelbin({ 
    cloud : 
    { 
        name : "yellow-block-cd3e57", 
        zone : "0"
    } 
});

let img = pixelbin.image("uploads/original/0b7b31de-6fa5-4883-92fd-23843ce3e286.jpeg");

let t1 = EraseBg.bg();
let t2 = resize({height : 1143, width : 995});
let t3 = t1.and(t2)

console.log(img.setTransformation(t3).getUrl());