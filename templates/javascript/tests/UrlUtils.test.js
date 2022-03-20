import { PDKIllegalArgumentError } from "../errors/PixelbinErrors";
import {objToUrl, urlToObj} from "../utils";

describe("UrlUtils tests", () => {
    it("should get obj from url", async() => {
        const obj =  urlToObj("https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize()/__playground/playground-default.jpeg");
        expect(obj.transformations).toEqual([
            {
                "plugin": "t",
                "name": "resize",
                isPreset: false,
            }
        ])
        expect(obj.cloudName).toBe("red-scene-95b6ea")
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.resize()");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });
    it("should get obj from url - 1", async() => {
        const obj =  urlToObj("https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100)/__playground/playground-default.jpeg");
        expect(obj.transformations).toEqual([
            {
                "plugin": "t",
                "name": "resize",
                isPreset: false,
                "values": [
                    {
                        "key": "h",
                        "value": "200"
                    },
                    {
                        "key": "w",
                        "value": "100"
                    }
                ]
            }
        ]);
        expect(obj.cloudName).toBe("red-scene-95b6ea")
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.resize(h:200,w:100)");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });
    it("should get obj from url - 2", async() => {
        const obj =  urlToObj("https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg");
        expect(obj.transformations).toEqual([
            {
                "plugin": "t",
                "name": "resize",
                isPreset: false,
                "values": [
                    {
                        "key": "h",
                        "value": "200"
                    },
                    {
                        "key": "w",
                        "value": "100"
                    },
                    {
                        key: "fill",
                        value: "999"
                    }
                ]
            },
            {
                "plugin": "erase",
                "name": "bg",
                isPreset: false,
            },
            {
                "plugin": "t",
                "name": "extend",
                isPreset: false,
            }
        ]);
        expect(obj.cloudName).toBe("red-scene-95b6ea")
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()");
        expect(obj.filePath).toBe("__playground/playground-default.jpeg");
    });
    it("should get obj from url with preset", async ()=> {
        const presetUrl = "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        const obj = urlToObj(presetUrl);
        expect(obj.transformations).toEqual(
            [{"isPreset": false, "name": "compress", "plugin": "t"}, {"isPreset": false, "name": "resize", "plugin": "t"}, {"isPreset": false, "name": "extend", "plugin": "t"}, {"isPreset": true, "name": "presetNameXyx"}]
        );
        expect(obj.cloudName).toBe("red-scene-95b6ea")
        expect(obj.zone).toBeUndefined();
        expect(obj.baseUrl).toBe("https://cdn.pixelbin.io");
        expect(obj.pattern).toBe("t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)");
        expect(obj.filePath).toBe("alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg");
    })
    it("should generate url from obj", async()=> {
        const transformations = [
            {
                "plugin": "t",
                "name": "resize",
                isPreset: false,
                "values": [
                    {
                        "key": "h",
                        "value": "200"
                    },
                    {
                        "key": "w",
                        "value": "100"
                    },
                    {
                        key: "fill",
                        value: "999"
                    }
                ]
            },
            {
                "plugin": "erase",
                "name": "bg",
                isPreset: false,
            },
            {
                "plugin": "t",
                "name": "extend",
                isPreset: false,
            },
            {
                "name": "preset1",
                isPreset: true,
            }
        ];
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        expect(url).toBe("https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg");
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe("https://cdn.pixelbin.io/v1/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg");
    })
    it("should generate url from obj when empty", async()=> {
        const transformations = [];
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        // expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(url).toBe("https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg");
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe("https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg");
    })
    it("should generate url from obj undefined", async()=> {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        // expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(url).toBe("https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg");
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe("https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg");
    })
    it("should generate url from obj  empty object", async()=> {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = objToUrl(obj);
        // expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(url).toBe("https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg");
        obj.version = "v1";
        url = objToUrl(obj);
        expect(url).toBe("https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg");
    })
    it("should throw error to generate url from obj if filePath not defined", async()=> {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "",
        };
        try{
            objToUrl(obj);
            throw new Error("should not be called");
        }catch(err){
            expect(err).toBeInstanceOf(PDKIllegalArgumentError)
        }
        
    })

});