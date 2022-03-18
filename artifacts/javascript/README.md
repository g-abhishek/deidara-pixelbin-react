# Pixelbin JS SDK

Pixelbin JS SDK helps you integrate Pixelbin with your Frontend JS Application.

## Installation

---

```
npm install  @pixelbin/js --save
```

## Usage

---

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
import Erase from "@pixelbin/js/plugins/Erase";

// Create Erase.bg transformation
let t1 = Erase.bg();

// Import the resize transformation
import { resize } from "@pixelbin/js/plugins/Sharp";

// Create resize transformation
const t2 = resize({ height: 100, width: 100 });

// Add the transformations to the image
demoImage.addTransformations(t1.and(t2));

// Get the image url
console.log(demoImage.getUrl());
```

## List of supported transformations

### Sharp

#### 1. resize

##### Supported Configuration

| Property   | Type                                                                                                              | Defaults |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| height     | integer                                                                                                           | 0        |
| width      | integer                                                                                                           | 0        |
| fit        | enum : `cover` , `contain` , `fill` , `inside` , `outside`                                                        | 'cover'  |
| background | color                                                                                                             | '000000' |
| position   | enum : `top` , `bottom` , `left` , `right` , `right_top` , `right_bottom` , `left_top` , `left_bottom` , `center` | 'center' |

##### Usage Example

```javascript
const t = resize({
    height: 0,
    width: 0,
    fit: "cover",
    background: "000000",
    position: "center",
});
```

#### 2. compress

##### Supported Configuration

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| quality  | integer | 90       |

##### Usage Example

```javascript
const t = compress({
    quality: 90,
});
```

#### 3. extend

##### Supported Configuration

| Property   | Type    | Defaults |
| ---------- | ------- | -------- |
| top        | integer | 10       |
| left       | integer | 10       |
| bottom     | integer | 10       |
| right      | integer | 10       |
| background | color   | '000000' |

##### Usage Example

```javascript
const t = extend({
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    background: "000000",
});
```

#### 4. extract

##### Supported Configuration

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| top      | integer | 10       |
| left     | integer | 10       |
| height   | integer | 50       |
| width    | integer | 20       |

##### Usage Example

```javascript
const t = extract({
    top: 10,
    left: 10,
    height: 50,
    width: 20,
});
```

#### 5. trim

##### Supported Configuration

| Property  | Type    | Defaults |
| --------- | ------- | -------- |
| threshold | integer | 10       |

##### Usage Example

```javascript
const t = trim({
    threshold: 10,
});
```

#### 6. rotate

##### Supported Configuration

| Property   | Type    | Defaults |
| ---------- | ------- | -------- |
| angle      | integer | 0        |
| background | color   | '000000' |

##### Usage Example

```javascript
const t = rotate({
    angle: 0,
    background: "000000",
});
```

#### 7. flip

##### Usage Example

```javascript
const t = flip({});
```

#### 8. flop

##### Usage Example

```javascript
const t = flop({});
```

#### 9. sharpen

##### Supported Configuration

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| sigma    | integer | 1        |
| flat     | integer | 1        |
| jagged   | integer | 2        |

##### Usage Example

```javascript
const t = sharpen({
    sigma: 1,
    flat: 1,
    jagged: 2,
});
```

#### 10. median

##### Supported Configuration

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| size     | integer | 3        |

##### Usage Example

```javascript
const t = median({
    size: 3,
});
```

#### 11. blur

##### Supported Configuration

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| sigma    | integer | 1        |

##### Usage Example

```javascript
const t = blur({
    sigma: 1,
});
```

#### 12. flatten

##### Supported Configuration

| Property   | Type  | Defaults |
| ---------- | ----- | -------- |
| background | color | '000000' |

##### Usage Example

```javascript
const t = flatten({
    background: "000000",
});
```

#### 13. negate

##### Usage Example

```javascript
const t = negate({});
```

#### 14. normalise

##### Usage Example

```javascript
const t = normalise({});
```

#### 15. linear

##### Supported Configuration

| Property | Type    | Defaults |
| -------- | ------- | -------- |
| a        | integer | 1        |
| b        | integer | 0        |

##### Usage Example

```javascript
const t = linear({
    a: 1,
    b: 0,
});
```

#### 16. modulate

##### Supported Configuration

| Property   | Type    | Defaults |
| ---------- | ------- | -------- |
| brightness | integer | 1        |
| saturation | integer | 1        |
| hue        | integer | 90       |

##### Usage Example

```javascript
const t = modulate({
    brightness: 1,
    saturation: 1,
    hue: 90,
});
```

#### 17. grey

##### Usage Example

```javascript
const t = grey({});
```

#### 18. tint

##### Supported Configuration

| Property | Type  | Defaults |
| -------- | ----- | -------- |
| color    | color | '000000' |

##### Usage Example

```javascript
const t = tint({
    color: "000000",
});
```

#### 19. jpg

##### Supported Configuration

| Property    | Type    | Defaults |
| ----------- | ------- | -------- |
| quality     | integer | 90       |
| progressive | boolean | false    |

##### Usage Example

```javascript
const t = jpg({
    quality: 90,
    progressive: false,
});
```

#### 20. png

##### Supported Configuration

| Property         | Type    | Defaults |
| ---------------- | ------- | -------- |
| quality          | integer | 90       |
| progressive      | boolean | false    |
| compressionLevel | integer | 9        |

##### Usage Example

```javascript
const t = png({
    quality: 90,
    progressive: false,
    compressionLevel: 9,
});
```

### RemoveBG

#### 1. bg

##### Usage Example

```javascript
const t = bg({});
```

### EraseBG

#### 1. bg

##### Supported Configuration

| Property     | Type                           | Defaults  |
| ------------ | ------------------------------ | --------- |
| industryType | enum : `general` , `ecommerce` | 'general' |

##### Usage Example

```javascript
const t = bg({
    industryType: "general",
});
```

### SuperResolution

#### 1. upscale

##### Supported Configuration

| Property | Type               | Defaults |
| -------- | ------------------ | -------- |
| type     | enum : `2x` , `4x` | '2x'     |

##### Usage Example

```javascript
const t = upscale({
    type: "2x",
});
```

### Artifact

#### 1. remove

##### Usage Example

```javascript
const t = remove({});
```

### WatermarkRemoval

#### 1. remove

##### Usage Example

```javascript
const t = remove({});
```

### AWSRekognitionPlugin

#### 1. detectLabels

##### Supported Configuration

| Property          | Type    | Defaults |
| ----------------- | ------- | -------- |
| maximumLabels     | integer | 5        |
| minimumConfidence | integer | 55       |

##### Usage Example

```javascript
const t = detectLabels({
    maximumLabels: 5,
    minimumConfidence: 55,
});
```

#### 2. moderation

##### Supported Configuration

| Property          | Type    | Defaults |
| ----------------- | ------- | -------- |
| minimumConfidence | integer | 55       |

##### Usage Example

```javascript
const t = moderation({
    minimumConfidence: 55,
});
```

### GoogleVisionPlugin

#### 1. detectLabels

##### Supported Configuration

| Property      | Type    | Defaults |
| ------------- | ------- | -------- |
| maximumLabels | integer | 5        |

##### Usage Example

```javascript
const t = detectLabels({
    maximumLabels: 5,
});
```
