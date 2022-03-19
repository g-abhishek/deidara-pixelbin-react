# Pixelbin JS SDK

Pixelbin JS SDK helps you integrate Pixelbin with your Frontend JS Application.

## Installation

```
npm install  @pixelbin/js --save
```

## Usage

### Setup

```javascript
// Import the Pixelbin class
import Pixelbin from "@pixelbin/js";

// Create your instance
const pixelbin = new Pixelbin({
    cloudName: "demo",
    zone: "default", // optional
});
```

---

### Transform and Optimize Images

```javascript
// Import transformations from plugins
import EraseBg from "@pixelbin/js/plugins/EraseBg";
import Sharp from "@pixelbin/js/plugins/Sharp";

// Create a new instance. If you have't (see above for the details)
const pixelbin = new Pixelbin({
    /*...*/
});

// Create EraseBg.bg transformation
let t1 = EraseBg.bg();

// Create resize transformation
const t2 = Sharp.resize({ height: 100, width: 100 });

// create a new image
const demoImage = pixelbin.image("path/to/image"); // File Path on Pixelbin

// Add the transformations to the image
demoImage.setTransformation(t1.and(t2));

// Get the image url
console.log(demoImage.getUrl());
```

```
https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/erase.bg()~t.resize(h:100,w:100)/path/to/image
```

---

### Add Pixelbin to HTML

Add the [this](./dist/pixelbin.js) distributable in a script tag along with axios

```html
<script src="pixelbin.js"></script>
```

```javascript
// Pixelbin is available in the browser as `Pixelbin` on the window object
const pixelbin = new Pixelbin({ cloudName: "demo", zone: "default" });

// create an image with the pixelbin object
const image = pixelbin.image("demoImage.jpeg");

// create a transformation
let t = Pixelbin.plugins.Sharp.resize({ height: 100, width: 100 });

// add Transformations to the image
image.setTransformation(t);

// get the url
image.getUrl();
```

---

### Upload images to pixelbin

The SDK provides a `upload` utility to upload images directly from the browser with a presigned url.

#### upload(file, presignedUrl, fields):

| parameter | type                                                          |
| --------- | ------------------------------------------------------------- |
| file      | [File](https://developer.mozilla.org/en-US/docs/Web/API/File) |
| url       | string                                                        |
| fields    | Object                                                        |

**returns**: Promise

`url` and `fields` can be generated with the Pixelbin Backend SDK @pixelbin/core.

<details>
<summary>Example</summary>

```html
<input type="file" id="fileInput" />
```

```javascript
const fileInput = document.getElementById("fileInput");
// the signed url and fields can be generated and served with @pixelbin/core
const { url: signedUrl, fields } = {
    url: "PRESIGNED-URL",
    fields: {
        key: "FIELD-SET-FROM-BACKEND",
        acl: "FIELD-SET-FROM-BACKEND",
        "x-amz-meta-assetData": "FIELD-SET-FROM-BACKEND",
        bucket: "FIELD-SET-FROM-BACKEND",
        "X-Amz-Algorithm": "FIELD-SET-FROM-BACKEND",
        "X-Amz-Credential": "FIELD-SET-FROM-BACKEND",
        "X-Amz-Date": "FIELD-SET-FROM-BACKEND",
        Policy: "FIELD-SET-FROM-BACKEND",
        "X-Amz-Signature": "FIELD-SET-FROM-BACKEND",
    },
};

const handleFileInputEvent = function (e) {
    const file = e.target.files[0];
    Pixelbin.upload(file, signedUrl, fields)
        .then(() => console.log("Uploaded Successfully"))
        .catch((err) => console.log("Error while uploading"));
};
fileInput.addEventListener("change", handleFileInputEvent);
```

</details>

---

### Using the URL utilities

Pixelbin provides url utilities to construct and deconstruct pixelbin urls.

#### 1. urlToObj

| parameter   | type   |
| ----------- | ------ |
| pixelbinUrl | String |

<details>
<summary> Example </summary>

```javascript
const pixelbinUrl =
    "https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg";

const obj = Pixelbin.url.urlToObj(pixelbinUrl);
```

</details>

**Returns**:

| property        | type            | example                                                                         |
| --------------- | --------------- | ------------------------------------------------------------------------------- |
| cloudName       | String          | `your-cloud-name`                                                               |
| zone            | String          | `z-slug`                                                                        |
| version         | String          | `v2`                                                                            |
| transformations | Transformations | example                                                                         |
| pattern         | String          | `t.resize(h:100, w:200)~t.flip()`                                               |
| original        | String          | `https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/original/path/to/image.jpeg` |

<details>
<summary> Example </summary>

```json
// obj
{
    "cloudName": "your-cloud-name",
    "zone": "z-slug",
    "version": "v2",
    "transformations": [
        {
            "plugin": "t",
            "name": "resize",
            "isPreset": false,
            "values": [
                {
                    "key": "h",
                    "value": "100"
                },
                {
                    "key": "w",
                    "value": "200"
                }
            ]
        },
        {
            "plugin": "t",
            "name": "flip",
            "isPreset": false
        }
    ],
    "original": "https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/original/path/to/image.jpeg"
}
```

</details>

#### 2. objToUrl

| parameter       | type              | example                                                                         |
| --------------- | ----------------- | ------------------------------------------------------------------------------- |
| cloudName       | String            | `your-cloud-name`                                                               |
| zone            | String            | `z-slug`                                                                        |
| version         | String            | `v2`                                                                            |
| transformations | Transformations   | example                                                                         |
| pattern         | String [optional] | `t.resize(h:100, w:200)~t.flip()`                                               |
| original        | String            | `https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/original/path/to/image.jpeg` |

<details>
<summary> Example </summary>

```javascript
// add transformations to another image.
const url = Pixelbin.url.objToUrl(obj); // obj is as shown above
```

</details>

**Returns**:

-   Pixelbin url

```
https://cdn.pixelbin.io/v2/your-cloud-name/z-slug/t.resize(h:100,w:200)~t.flip()/path/to/image.jpeg
```

## Transformation

A transformation is an operation or a list of operations that can be performed on an image. Please refer [list of supported transformations](#list-of-supported-transformations) for details.

```javascript
// import a resize transformation
import { resize } from "@pixelbin/js/plugins/Sharp";

// create the sharp transformation
const t = resize({ height: 100, width: 100 });
```

Multiple transformations can be chained by using `and` on the created transformation object

```javascript
// import a resize transformation
import { resize, flip } from "@pixelbin/js/plugins/Sharp";

// create the sharp transformation
const t1 = resize({ height: 100, width: 100 });
const t2 = flip();
const t3 = t1.and(t2);
```

## Image

Image class represents an image on Pixelbin.

```javascript
//To create an Image, call image method on the pixelbin object;
const image = pixelbin.image("path/to/image");
```

Transformations can be set on an image by using `setTransformation` on the image object.

```javascript
image.setTransformation(t);
```

To get the url of the image with the applied transformations, use the `getUrl` on the image object.

```javascript
image.getUrl();
```

For a working example, refer [here](#transform-and-optimize-images)

## List of supported transformations

### 1. Sharp

<details>
<summary> 1. resize </summary>

#### Supported Configuration

| parameter  | type                                                                                                              | defaults   |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ---------- |
| height     | integer                                                                                                           | 0          |
| width      | integer                                                                                                           | 0          |
| fit        | enum : `cover` , `contain` , `fill` , `inside` , `outside`                                                        | `cover`    |
| background | color                                                                                                             | `000000`   |
| position   | enum : `top` , `bottom` , `left` , `right` , `right_top` , `right_bottom` , `left_top` , `left_bottom` , `center` | `center`   |
| algorithm  | enum : `nearest` , `cubic` , `mitchell` , `lanczos2` , `lanczos3`                                                 | `lanczos3` |

#### Usage Example

```javascript
const t = resize({
    height: 0,
    width: 0,
    fit: "cover",
    background: "000000",
    position: "center",
    algorithm: "lanczos3",
});
```

</details>

<details>
<summary> 2. compress </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| quality   | integer | 80       |

#### Usage Example

```javascript
const t = compress({
    quality: 80,
});
```

</details>

<details>
<summary> 3. extend </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| top        | integer | 10       |
| left       | integer | 10       |
| bottom     | integer | 10       |
| right      | integer | 10       |
| background | color   | `000000` |

#### Usage Example

```javascript
const t = extend({
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    background: "000000",
});
```

</details>

<details>
<summary> 4. extract </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| top       | integer | 10       |
| left      | integer | 10       |
| height    | integer | 50       |
| width     | integer | 20       |

#### Usage Example

```javascript
const t = extract({
    top: 10,
    left: 10,
    height: 50,
    width: 20,
});
```

</details>

<details>
<summary> 5. trim </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| threshold | integer | 10       |

#### Usage Example

```javascript
const t = trim({
    threshold: 10,
});
```

</details>

<details>
<summary> 6. rotate </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| angle      | integer | 0        |
| background | color   | `000000` |

#### Usage Example

```javascript
const t = rotate({
    angle: 0,
    background: "000000",
});
```

</details>

<details>
<summary> 7. flip </summary>

#### Usage Example

```javascript
const t = flip({});
```

</details>

<details>
<summary> 8. flop </summary>

#### Usage Example

```javascript
const t = flop({});
```

</details>

<details>
<summary> 9. sharpen </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| sigma     | integer | 1        |
| flat      | integer | 1        |
| jagged    | integer | 2        |

#### Usage Example

```javascript
const t = sharpen({
    sigma: 1,
    flat: 1,
    jagged: 2,
});
```

</details>

<details>
<summary> 10. median </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| size      | integer | 3        |

#### Usage Example

```javascript
const t = median({
    size: 3,
});
```

</details>

<details>
<summary> 11. blur </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| sigma     | integer | 1        |

#### Usage Example

```javascript
const t = blur({
    sigma: 1,
});
```

</details>

<details>
<summary> 12. flatten </summary>

#### Supported Configuration

| parameter  | type  | defaults |
| ---------- | ----- | -------- |
| background | color | `000000` |

#### Usage Example

```javascript
const t = flatten({
    background: "000000",
});
```

</details>

<details>
<summary> 13. negate </summary>

#### Usage Example

```javascript
const t = negate({});
```

</details>

<details>
<summary> 14. normalise </summary>

#### Usage Example

```javascript
const t = normalise({});
```

</details>

<details>
<summary> 15. linear </summary>

#### Supported Configuration

| parameter | type    | defaults |
| --------- | ------- | -------- |
| a         | integer | 1        |
| b         | integer | 0        |

#### Usage Example

```javascript
const t = linear({
    a: 1,
    b: 0,
});
```

</details>

<details>
<summary> 16. modulate </summary>

#### Supported Configuration

| parameter  | type    | defaults |
| ---------- | ------- | -------- |
| brightness | integer | 1        |
| saturation | integer | 1        |
| hue        | integer | 90       |

#### Usage Example

```javascript
const t = modulate({
    brightness: 1,
    saturation: 1,
    hue: 90,
});
```

</details>

<details>
<summary> 17. grey </summary>

#### Usage Example

```javascript
const t = grey({});
```

</details>

<details>
<summary> 18. tint </summary>

#### Supported Configuration

| parameter | type  | defaults |
| --------- | ----- | -------- |
| color     | color | `000000` |

#### Usage Example

```javascript
const t = tint({
    color: "000000",
});
```

</details>

<details>
<summary> 19. toFormat </summary>

#### Supported Configuration

| parameter | type                           | defaults |
| --------- | ------------------------------ | -------- |
| format    | enum : `jpeg` , `png` , `webp` | `jpeg`   |

#### Usage Example

```javascript
const t = toFormat({
    format: "jpeg",
});
```

</details>

<details>
<summary> 20. merge </summary>

#### Supported Configuration

| parameter  | type                                                                                                                                                                                                                                                                                                                   | defaults   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| mode       | enum : `overlay` , `underlay`                                                                                                                                                                                                                                                                                          | `overlay`  |
| image      | file                                                                                                                                                                                                                                                                                                                   | ``         |
| background | color                                                                                                                                                                                                                                                                                                                  | `00000000` |
| height     | integer                                                                                                                                                                                                                                                                                                                | 0          |
| width      | integer                                                                                                                                                                                                                                                                                                                | 0          |
| top        | integer                                                                                                                                                                                                                                                                                                                | 0          |
| left       | integer                                                                                                                                                                                                                                                                                                                | 0          |
| gravity    | enum : `northwest` , `north` , `northeast` , `east` , `center` , `west` , `southwest` , `south` , `southeast` , `custom`                                                                                                                                                                                               | `center`   |
| blend      | enum : `over` , `in` , `out` , `atop` , `dest` , `dest-over` , `dest-in` , `dest-out` , `dest-atop` , `xor` , `add` , `saturate` , `multiply` , `screen` , `overlay` , `darken` , `lighten` , `colour-dodge` , `color-dodge` , `colour-burn` , `color-burn` , `hard-light` , `soft-light` , `difference` , `exclusion` | `over`     |
| tile       | boolean                                                                                                                                                                                                                                                                                                                | false      |

#### Usage Example

```javascript
const t = merge({
    mode: "overlay",
    image: "",
    background: "00000000",
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    gravity: "center",
    blend: "over",
    tile: false,
});
```

</details>

### 2. RemoveBG

<details>
<summary> 1. bg </summary>

#### Usage Example

```javascript
const t = bg({});
```

</details>

### 3. EraseBG

<details>
<summary> 1. bg </summary>

#### Supported Configuration

| parameter    | type                           | defaults  |
| ------------ | ------------------------------ | --------- |
| industryType | enum : `general` , `ecommerce` | `general` |

#### Usage Example

```javascript
const t = bg({
    industryType: "general",
});
```

</details>

### 4. SuperResolution

<details>
<summary> 1. upscale </summary>

#### Supported Configuration

| parameter | type               | defaults |
| --------- | ------------------ | -------- |
| type      | enum : `2x` , `4x` | `2x`     |

#### Usage Example

```javascript
const t = upscale({
    type: "2x",
});
```

</details>

### 5. Artifact

<details>
<summary> 1. remove </summary>

#### Usage Example

```javascript
const t = remove({});
```

</details>

### 6. WatermarkRemoval

<details>
<summary> 1. remove </summary>

#### Usage Example

```javascript
const t = remove({});
```

</details>

### 7. AWSRekognitionPlugin

<details>
<summary> 1. detectLabels </summary>

#### Supported Configuration

| parameter         | type    | defaults |
| ----------------- | ------- | -------- |
| maximumLabels     | integer | 5        |
| minimumConfidence | integer | 55       |

#### Usage Example

```javascript
const t = detectLabels({
    maximumLabels: 5,
    minimumConfidence: 55,
});
```

</details>

<details>
<summary> 2. moderation </summary>

#### Supported Configuration

| parameter         | type    | defaults |
| ----------------- | ------- | -------- |
| minimumConfidence | integer | 55       |

#### Usage Example

```javascript
const t = moderation({
    minimumConfidence: 55,
});
```

</details>

### 8. GoogleVisionPlugin

<details>
<summary> 1. detectLabels </summary>

#### Supported Configuration

| parameter     | type    | defaults |
| ------------- | ------- | -------- |
| maximumLabels | integer | 5        |

#### Usage Example

```javascript
const t = detectLabels({
    maximumLabels: 5,
});
```

</details>

### 9. ImageGeneration

<details>
<summary> 1. generate </summary>

#### Supported Configuration

| parameter | type   | defaults       |
| --------- | ------ | -------------- |
| prompt    | string | `A cute puppy` |

#### Usage Example

```javascript
const t = generate({
    prompt: "A cute puppy",
});
```

</details>

### 10. FaceRestoration

<details>
<summary> 1. restore </summary>

#### Usage Example

```javascript
const t = restore({});
```

</details>
