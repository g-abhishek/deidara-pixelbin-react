import Pixelbin from "@pixelbin/js";
import { Transformation } from "@pixelbin/js";
import { extend, resize, flip } from "@pixelbin/js/plugins/Sharp";
import { bg } from "@pixelbin/js/plugins/EraseBG";
import { upscale } from "@pixelbin/js/plugins/SuperResolution";

describe("SDK tests", () => {
    it("should run", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        });

        expect(pixelbin.cloudName).toBe("cloudname");
        expect(pixelbin.zone).toBe("");
    })
    it("should accept an image uri and fetch url for original image", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/original/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for original image with zone slug", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "testsl"
        })
        const image = pixelbin.image("test-image.jpeg");
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/testsl/original/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148 }))
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/t.resize(h:200,w:148)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp flip", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(flip())
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/t.flip()/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => erase.bg for ecommerce", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148 }))
        t = t.and(bg({ industryType: "ecommerce" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/t.resize(h:200,w:148)~erase.bg(i:ecommerce)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => erase.bg", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148 }))
        t = t.and(bg());
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/t.resize(h:200,w:148)~erase.bg(i:general)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => sharp extend => upscale", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148 }))
        t = t.and(extend());
        t = t.and(upscale());
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/t.resize(h:200,w:148)~t.extend(t:10,l:10,b:10,r:10,bc:000000)~sr.upscale(t:2x)/test-image.jpeg");
    });
    it("should accept an image uri and fetch url for sharp resize => sharp extend => upscale 4x", async () => {
        const pixelbin = new Pixelbin({
            cloudName: "cloudname", zone: "default"
        })
        const image = pixelbin.image("test-image.jpeg");
        let t = new Transformation();
        t = t.and(resize({ height: 200, width: 148 }))
        t = t.and(extend());
        t = t.and(upscale({ type: "4x" }));
        image.setTransformation(t);
        expect(image.getUrl()).toBe("https://cdn.pixelbinx0.de/cloudname/t.resize(h:200,w:148)~t.extend(t:10,l:10,b:10,r:10,bc:000000)~sr.upscale(t:4x)/test-image.jpeg");
    });
})
