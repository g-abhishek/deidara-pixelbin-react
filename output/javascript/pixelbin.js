import Image from './image.js';

class Pixelbin {
    constructor({ cloud : { name, zone } }) {
        this.cloudName = name;
        this.cloudZone = zone;
    }

    image(imageUri) {
        return new Image(imageUri, this.cloudName, this.cloudZone);
    }

}

export default Pixelbin;