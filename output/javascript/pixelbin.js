import "core-js/stable";
import "regenerator-runtime/runtime";
import Image from "./image.js";
import Transformation from "./transformation";
import * as errors from "./errors/PixelbinErrors";
import { urlToObj, objToUrl } from "./url";
import { upload } from "./upload";

import * as Basic from "./plugins/Basic";
import * as RemoveBG from "./plugins/RemoveBG";
import * as EraseBG from "./plugins/EraseBG";
import * as SuperResolution from "./plugins/SuperResolution";
import * as ArtifactRemoval from "./plugins/ArtifactRemoval";
import * as WatermarkRemoval from "./plugins/WatermarkRemoval";
import * as AWSRekognition from "./plugins/AWSRekognition";
import * as GoogleVision from "./plugins/GoogleVision";

/**
 * class to create a Pixelbin object
 */
class Pixelbin {
    /**
     * @param {Object} cloud-details takes detail for cloud name and zone
     */
    constructor({ cloudName, zone }) {
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
     * provides access to url utilities
     * returns Object
     */
    static get url() {
        return { objToUrl, urlToObj };
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
        Basic,
        RemoveBG,
        EraseBG,
        SuperResolution,
        ArtifactRemoval,
        WatermarkRemoval,
        AWSRekognition,
        GoogleVision,
    };

    static Transformation = Transformation;
}

export { Pixelbin as default, Transformation };
