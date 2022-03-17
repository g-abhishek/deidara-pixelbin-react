// import { resize } from "./dist/bundle";
// import EraseBg from "@pixelbin/js/plugins/EraseBG.js";
import "./dist/bundle.js";
console.log("test");

// intiate pixelbin image with cloud name and zone
// let pixelbin = new Pixelbin({
//     cloud: {
//         name: "yellow-block-cd3e57",
//         zone: "0",
//     },
// });

// // initiate image for pixelbin
// let img = pixelbin.image("uploads/original/0b7b31de-6fa5-4883-92fd-23843ce3e286.jpeg");

// // get backgroud removal transformation from erasebg. 
// let t1 = EraseBg.bg();

// // get resize transformation from erasebg. 
// let t2 = resize({ height: 1143, width: 995 });

// // creating another transformation using t1 and t2. 
// let t3 = t1.and(t2);

// // prints transformation url. 
// console.log(img.setTransformation(t3).getUrl());