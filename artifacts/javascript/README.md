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
    cloud: {
        cloudName: "demo",
        zone: "default", // optional
    },
});
```

### Transform and Optimize Images

```javascript
// Create a new instance. If you have't (see above for the details)
const pixelbin = new Pixelbin({
    /*...*/
});

// create a new image
const demoImage = pixelbin.image("demo.jpeg");

// Import a transformations from plugins
import EraseBg from "@pixelbin/js/plugins/EraseBg";

// Create EraseBg.bg transformation
let t1 = EraseBg.bg();

// Import the resize transformation
import { resize } from "@pixelbin/js/plugins/Sharp";

// Create resize transformation
const t2 = resize({ height: 100, width: 100 });

// Add the transformations to the image
demoImage.setTransformations(t1.and(t2));

// Get the image url
console.log(demoImage.getUrl());
```

### Usage in browser

Add the `umd` distributable in a script tag.

```html
<script src="pixelbin.js" />
```

```javascript
// Pixelbin is available in the browser as `Pixelbin` on the window object
const pixelbin = new Pixelbin({ cloud: { cloudName: "demo", zone: "default" } });

// create an image with the pixelbin object
const image = pixelbin.image("demoImage.jpeg");

// create a transformation
let t = Pixelbin.plugins.Sharp.resize({ height: 100, width: 100 });

// add Transformations to the image
image.setTransfromation(t);

// get the url
image.getUrl();
```

### Upload images to pixelbin

The SDK provides a `upload` utility to upload images directly from the broswer with a presigned url.

#### upload(file, presignedUrl, fields):

| Parameter | type   |
| --------- | ------ |
| file      | File   |
| url       | string |
| fields    | Object |

**returns**: Promise

`url` and `fields` can be generated with the Pixelbin Backend SDK.

### Using the URL Utils

Pixelbin gives access to URL Utils on the Pixelbin class. It provides the following features.

```javascript
const urlUtils = Pixelbin.urlUtils;

// get a list of transformations from image url
const transformationList = urlUtils.deconstructPixelbinUrl(pixelbinUrl);

const originalImageUrl = "INSERT-ORIGINAL-URL";

// add transformations to another image.
const url = urlUtils.generatePixelbinUrl(originalImageUrl, transformationList);
```

## List of supported transformations

### 1. Sharp

<details>
<summary> 1. resize </summary>

#### Supported Configuration

| Property   | Type                                                                                                              | Defaults   |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ---------- |
| height     | integer                                                                                                           | 0          |
| width      | integer                                                                                                           | 0          |
| fit        | enum : `cover` , `contain` , `fill` , `inside` , `outside`                                                        | 'cover'    |
| background | color                                                                                                             | '000000'   |
| position   | enum : `top` , `bottom` , `left` , `right` , `right_top` , `right_bottom` , `left_top` , `left_bottom` , `center` | 'center'   |
| algorithm  | enum : `nearest` , `cubic` , `mitchell` , `lanczos2` , `lanczos3`                                                 | 'lanczos3' |

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

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| quality  | integer | 80       |

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

| Property   | Type    | Defaults |
| ---------- | ------- | -------- |
| top        | integer | 10       |
| left       | integer | 10       |
| bottom     | integer | 10       |
| right      | integer | 10       |
| background | color   | '000000' |

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

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| top      | integer | 10       |
| left     | integer | 10       |
| height   | integer | 50       |
| width    | integer | 20       |

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

| Property  | Type    | Defaults |
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

| Property   | Type    | Defaults |
| ---------- | ------- | -------- |
| angle      | integer | 0        |
| background | color   | '000000' |

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

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| sigma    | integer | 1        |
| flat     | integer | 1        |
| jagged   | integer | 2        |

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

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| size     | integer | 3        |

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

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| sigma    | integer | 1        |

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

| Property   | Type  | Defaults |
| ---------- | ----- | -------- |
| background | color | '000000' |

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

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| a        | integer | 1        |
| b        | integer | 0        |

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

| Property   | Type    | Defaults |
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

| Property | Type  | Defaults |
| -------- | ----- | -------- |
| color    | color | '000000' |

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

| Property | Type                           | Defaults |
| -------- | ------------------------------ | -------- |
| format   | enum : `jpeg` , `png` , `webp` | 'jpeg'   |

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

| Property   | Type                                                                                                                                                                                                                                                                                                                   | Defaults   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| mode       | enum : `overlay` , `underlay`                                                                                                                                                                                                                                                                                          | 'overlay'  |
| image      | file                                                                                                                                                                                                                                                                                                                   | ''         |
| background | color                                                                                                                                                                                                                                                                                                                  | '00000000' |
| height     | integer                                                                                                                                                                                                                                                                                                                | 0          |
| width      | integer                                                                                                                                                                                                                                                                                                                | 0          |
| top        | integer                                                                                                                                                                                                                                                                                                                | 0          |
| left       | integer                                                                                                                                                                                                                                                                                                                | 0          |
| gravity    | enum : `northwest` , `north` , `northeast` , `east` , `center` , `west` , `southwest` , `south` , `southeast` , `custom`                                                                                                                                                                                               | 'center'   |
| blend      | enum : `over` , `in` , `out` , `atop` , `dest` , `dest-over` , `dest-in` , `dest-out` , `dest-atop` , `xor` , `add` , `saturate` , `multiply` , `screen` , `overlay` , `darken` , `lighten` , `colour-dodge` , `color-dodge` , `colour-burn` , `color-burn` , `hard-light` , `soft-light` , `difference` , `exclusion` | 'over'     |
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

| Property     | Type                           | Defaults  |
| ------------ | ------------------------------ | --------- |
| industryType | enum : `general` , `ecommerce` | 'general' |

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

| Property | Type               | Defaults |
| -------- | ------------------ | -------- |
| type     | enum : `2x` , `4x` | '2x'     |

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

| Property          | Type    | Defaults |
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

| Property          | Type    | Defaults |
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

| Property      | Type    | Defaults |
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

| Property | Type   | Defaults       |
| -------- | ------ | -------------- |
| prompt   | string | 'A cute puppy' |

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
