import { PDKIllegalArgumentError } from "../../errors/PixelBinErrors.js";
import { getUrlFromObj } from "../../utils.js";

describe("getUrlFromObj", () => {
    it("should generate url from obj with transformation list", async () => {
        const transformations = [
            {
                plugin: "t",
                name: "resize",
                values: [
                    {
                        key: "h",
                        value: "200",
                    },
                    {
                        key: "w",
                        value: "100",
                    },
                    {
                        key: "fill",
                        value: "999",
                    },
                ],
            },
            {
                plugin: "erase",
                name: "bg",
            },
            {
                plugin: "t",
                name: "extend",
            },
            {
                plugin: "p",
                name: "preset1",
            },
        ];
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };

        let url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
    });

    it("should generate url from obj with transformation pattern", async () => {
        const transformationPattern = "t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1";
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformationPattern,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };

        let url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/t.resize(h:200,w:100,fill:999)~erase.bg()~t.extend()~p:preset1/__playground/playground-default.jpeg",
        );
    });

    it("should generate url from obj with empty transformation list", async () => {
        const transformations = [];
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: transformations,
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
    });

    it("should generate url from obj when neither `transformations` or `transformationPattern` is passed", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
    });

    it("should generate url from obj with empty object in `transformations`", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
    });

    it("should generate url from obj with empty string in `transformationPattern`", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformationPattern: "",
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "__playground/playground-default.jpeg",
        };
        let url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v2/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
        obj.version = "v1";
        url = getUrlFromObj(obj);
        expect(url).toBe(
            "https://cdn.pixelbin.io/v1/red-scene-95b6ea/original/__playground/playground-default.jpeg",
        );
    });

    it("should throw error to generate url from obj if filePath not defined", async () => {
        const obj = {
            cloudName: "red-scene-95b6ea",
            zone: "z-slug",
            version: "v2",
            transformations: [{}],
            baseUrl: "https://cdn.pixelbin.io",
            filePath: "",
        };
        try {
            getUrlFromObj(obj);
            throw new Error("should not be called");
        } catch (err) {
            expect(err).toBeInstanceOf(PDKIllegalArgumentError);
        }
    });
})
