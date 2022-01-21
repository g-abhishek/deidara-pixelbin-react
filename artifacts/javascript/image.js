/**
 * class to create a Image object
 */
class Image {
    /**
     * @param {String} _imageUri path of image
     * @param {String} _cloudName cloud name
     * @param {String} _cloudZone cloud zone
     */
    constructor(_imageUri, _cloudName, _cloudZone) {
        this.imageUri = _imageUri;
        this.cloudName = _cloudName;
        this.cloudZone = _cloudZone;
        this.transformation = [];
        this.host = "https://cdn.pixelbinx0.de";
    }

    /**
     * Set transformation to be performed on Image.
     * @param {Transformation} transformation Image transformation
     * returns Image
     */
    setTransformation(transformation) {
        this.transformation = transformation.getTransformation();
        return this;
    }

    /**
     * Get Transformation CDN link
     * @param {Transformation} transformation Image transformation
     * returns String
     */
    getUrl() {
        let operations = this.transformation.join("~").replace(/ /g, "");
        return JSON.stringify(
            `${this.host}/${this.cloudName}/${this.cloudZone}/${operations}/uploads/${this.imageUri}`,
        );
    }
}

export default Image;
