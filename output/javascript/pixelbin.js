import "core-js/stable";
import "regenerator-runtime/runtime";
import Image from "./image.js";
import Transformation from "./transformation";
import * as errors from "./errors/PixelbinErrors";
import { getUrlUtilsInstance } from "./utils/url.utils";
import { upload } from "./utils/upload.utils";

import * as Sharp from "./plugins/Sharp";

import * as RemoveBG from "./plugins/RemoveBG";

import * as EraseBG from "./plugins/EraseBG";

import * as SuperResolution from "./plugins/SuperResolution";

import * as Artifact from "./plugins/Artifact";

import * as WatermarkRemoval from "./plugins/WatermarkRemoval";

import * as AWSRekognitionPlugin from "./plugins/AWSRekognitionPlugin";

import * as GoogleVisionPlugin from "./plugins/GoogleVisionPlugin";

import * as ImageGeneration from "./plugins/ImageGeneration";

import * as FaceRestoration from "./plugins/FaceRestoration";

/**
 * class to create a Pixelbin object
 */
class Pixelbin {
    /**
     * @param {Object} cloud-details takes detail for cloud name and zone
     */
    constructor({ cloud: { cloudName, zone } }) {
        this.cloudName = cloudName;
        this.zone = zone === "default" ? "" : zone || "";
    }

    /**
     * provides image on which transformation can be done.
     * @param {String} imageUri path of image.
     * returns Image
     */
    image(imageUri) {
        return new Image(imageUri, this.cloudName, this.zone);
    }

    /**
     * provides a url utils instance
     * returns UrlUtils
     */
    static get urlUtils() {
        return getUrlUtilsInstance();
    }

    /**
     * provides functionality to upload files.
     * @param {File} file
     * @param {string} signedUrl
     * @param {Object} fields
     */
    static async upload(file, signedUrl, fields) {
        return upload(file, signedUrl, fields);
    }

    static plugins = {
        Sharp,
        RemoveBG,
        EraseBG,
        SuperResolution,
        Artifact,
        WatermarkRemoval,
        AWSRekognitionPlugin,
        GoogleVisionPlugin,
        ImageGeneration,
        FaceRestoration,
    };

    static Transformation = Transformation;
}

export { Pixelbin as default, Transformation };
