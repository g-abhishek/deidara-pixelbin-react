import Pixelbin from "@pixelbin/js";
import {Transformation} from "@pixelbin/js";
import {extend, resize} from "@pixelbin/js/plugins/Sharp";
import { bg } from "@pixelbin/js/plugins/EraseBG";
import { upscale } from "@pixelbin/js/plugins/SuperResolution";

describe("SDK tests", () => {
    it("should run", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })

        expect(pixelbin.cloudName).toBe("noel");
        expect(pixelbin.zone).toBe("default");
    })
    it("should accept an image uri and fetch url for original image", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/noel/default/original/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize", async() => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148}))
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/noel/default/t.resize(h:200,w:148,f:cover,b:000000,p:center)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => erase.bg for ecommerce", async() => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148}))
        t = t.and(bg({ industryType: "ecommerce" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/noel/default/t.resize(h:200,w:148,f:cover,b:000000,p:center)~erase.bg(i:ecommerce)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => erase.bg", async() => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148}))
        t = t.and(bg({}));
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/noel/default/t.resize(h:200,w:148,f:cover,b:000000,p:center)~erase.bg(i:general)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => sharp extend => upscale", async() => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148}))
        t = t.and(extend({}));
        t = t.and(upscale({}));
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/noel/default/t.resize(h:200,w:148,f:cover,b:000000,p:center)~t.extend(t:10,l:10,b:10,r:10,bc:000000)~sr.upscale(t:2x)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => sharp extend => upscale 4x", async() => {
        const pixelbin = new Pixelbin({
            cloudName: "noel", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148}))
        t = t.and(extend({}));
        t = t.and(upscale({type: "4x"}));
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/noel/default/t.resize(h:200,w:148,f:cover,b:000000,p:center)~t.extend(t:10,l:10,b:10,r:10,bc:000000)~sr.upscale(t:4x)/test-image.jpeg");
    });
})
