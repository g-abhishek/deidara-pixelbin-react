import Pixelbin from "@pixelbin/js";

describe("UrlUtils tests", () => {
    it("should get transformation list from url", async() => {
        const urlUtils = Pixelbin.urlUtils;
        const transformations =  urlUtils.deconstructPixelbinUrl("https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/t.resize()/__playground/playground-default.jpeg");
        expect(transformations).toEqual([
            {
                "plugin": "t",
                "name": "resize",
                isPreset: false,
            }
        ])
    });
    it("should get transformation list from url", async() => {
        const urlUtils = Pixelbin.urlUtils;
        const transformations =  urlUtils.deconstructPixelbinUrl("https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/t.resize(h:200,w:100)/__playground/playground-default.jpeg");
        expect(transformations).toEqual([
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
        ])
    });
    it("should get transformation list from url - 2", async() => {
        const urlUtils = Pixelbin.urlUtils;
        const transformations =  urlUtils.deconstructPixelbinUrl("https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg");
        expect(transformations).toEqual([
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
        ])
    });
    it("deconstruct url with preset", async ()=> {
        const presetUrl = "https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/t.compress()~t.resize()~t.extend()~p.apply(n:presetNameXyx)/alien_fig_tree_planet_x_wallingford_seattle_washington_usa_517559.jpeg";
        const urlUtils = Pixelbin.urlUtils;
        expect(urlUtils.deconstructPixelbinUrl(presetUrl)).toEqual(
            [{"isPreset": false, "name": "compress", "plugin": "t"}, {"isPreset": false, "name": "resize", "plugin": "t"}, {"isPreset": false, "name": "extend", "plugin": "t"}, {"isPreset": true, "name": "presetNameXyx"}]
        );
    })
    it("should generate url from transformation list", async()=> {
        const transformation = [
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
        ];
        const urlUtils = Pixelbin.urlUtils;
        const originalUrl = "https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg";
        expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()");
        expect(urlUtils.generatePixelbinUrl(originalUrl, transformation)).toBe("https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg");
        expect(urlUtils.generatePixelbinUrl(originalUrl, transformation, "v1")).toBe("https://cdn.pixelbinx0.de/v1/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()/__playground/playground-default.jpeg");
    })
    it("should generate url from transformation list", async()=> {
        const transformation = [
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
        const urlUtils = Pixelbin.urlUtils;
        const originalUrl = "https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg";
        expect(urlUtils.generatePixelbinPattern(transformation)).toBe("t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1");
        expect(urlUtils.generatePixelbinUrl(originalUrl, transformation)).toBe("https://cdn.pixelbinx0.de/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg");
        expect(urlUtils.generatePixelbinUrl(originalUrl, transformation, "v1")).toBe("https://cdn.pixelbinx0.de/v1/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg");
    })

});