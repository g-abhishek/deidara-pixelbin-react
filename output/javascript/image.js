

class Image {

    constructor(_imageUri, _cloudName, _cloudZone) {
        this.imageUri = _imageUri;
        this.cloudName = _cloudName;
        this.cloudZone = _cloudZone;
        this.transformation = [];
        this.host = 'https://cdn.pixelbinx0.de';
    }

    setTransformation(transformation) {
        this.transformation = transformation.getTransformation();
        return this;
    }

    getUrl() {
        let operations = this.transformation.join('~').replace(/ /g, "");
        console.log(operations);
        return JSON.stringify(`${this.host}/${this.cloudName}/${this.cloudZone}/${operations}/${this.imageUri}`);
    }    

}

export default Image;

