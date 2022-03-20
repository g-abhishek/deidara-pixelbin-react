module.exports = {
    pluginApi: {
        "delimiters": {
            "operationSeparator": "~",
            "parameterSeparator": ","
        },
        "plugins": {
            "t": {
                "identifier": "t",
                "name": "Basic",
                "description": "Basic Image Library Module",
                "credentials": {
                    "required": false
                },
                "operations": [
                    {
                        "params": [
                            {
                                "name": "height",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 12000,
                                "identifier": "h",
                                "title": "Height"
                            },
                            {
                                "name": "width",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 12000,
                                "identifier": "w",
                                "title": "Width"
                            },
                            {
                                "name": "fit",
                                "type": "enum",
                                "enum": [
                                    "cover",
                                    "contain",
                                    "fill",
                                    "inside",
                                    "outside"
                                ],
                                "default": "cover",
                                "identifier": "f",
                                "title": "Fit"
                            },
                            {
                                "name": "background",
                                "type": "color",
                                "default": "000000",
                                "identifier": "b",
                                "title": "Background"
                            },
                            {
                                "name": "position",
                                "type": "enum",
                                "enum": [
                                    "top",
                                    "bottom",
                                    "left",
                                    "right",
                                    "right_top",
                                    "right_bottom",
                                    "left_top",
                                    "left_bottom",
                                    "center"
                                ],
                                "default": "center",
                                "identifier": "p",
                                "title": "Position"
                            },
                            {
                                "name": "algorithm",
                                "type": "enum",
                                "enum": [
                                    "nearest",
                                    "cubic",
                                    "mitchell",
                                    "lanczos2",
                                    "lanczos3"
                                ],
                                "default": "lanczos3",
                                "identifier": "k",
                                "title": "Algorithm"
                            }
                        ],
                        "displayName": "Resize an image",
                        "method": "resize",
                        "description": "Resize your images by setting the width and/or height parameters, using different crop parameters like cover, fill etc.."
                    },
                    {
                        "params": [
                            {
                                "name": "quality",
                                "type": "integer",
                                "default": 80,
                                "min": 0,
                                "max": 100,
                                "identifier": "q",
                                "title": "Quality"
                            }
                        ],
                        "displayName": "Compress an image",
                        "method": "compress",
                        "description": "Compress any image to desired size"
                    },
                    {
                        "params": [
                            {
                                "name": "top",
                                "type": "integer",
                                "default": 10,
                                "min": 0,
                                "max": 500,
                                "identifier": "t",
                                "title": "Top"
                            },
                            {
                                "name": "left",
                                "type": "integer",
                                "default": 10,
                                "min": 0,
                                "max": 500,
                                "identifier": "l",
                                "title": "Left"
                            },
                            {
                                "name": "bottom",
                                "type": "integer",
                                "default": 10,
                                "min": 0,
                                "max": 500,
                                "identifier": "b",
                                "title": "Bottom"
                            },
                            {
                                "name": "right",
                                "type": "integer",
                                "default": 10,
                                "min": 0,
                                "max": 500,
                                "identifier": "r",
                                "title": "Right"
                            },
                            {
                                "name": "background",
                                "type": "color",
                                "default": "000000",
                                "identifier": "bc",
                                "title": "Background"
                            }
                        ],
                        "displayName": "Extend an image",
                        "method": "extend",
                        "description": "Extends/pads the edges of the image with the provided background colour. This operation will always occur after resizing and extraction, if any."
                    },
                    {
                        "params": [
                            {
                                "name": "top",
                                "type": "integer",
                                "default": 10,
                                "min": 0,
                                "max": 12000,
                                "identifier": "t",
                                "title": "Top"
                            },
                            {
                                "name": "left",
                                "type": "integer",
                                "default": 10,
                                "min": 0,
                                "max": 12000,
                                "identifier": "l",
                                "title": "Left"
                            },
                            {
                                "name": "height",
                                "type": "integer",
                                "default": 50,
                                "min": 0,
                                "max": 12000,
                                "identifier": "h",
                                "title": "Height"
                            },
                            {
                                "name": "width",
                                "type": "integer",
                                "default": 20,
                                "min": 0,
                                "max": 12000,
                                "identifier": "w",
                                "title": "Width"
                            }
                        ],
                        "displayName": "Extract a region of the image",
                        "method": "extract",
                        "description": "Extract a region by setting parameters like top, height, width etc.."
                    },
                    {
                        "params": [
                            {
                                "name": "threshold",
                                "type": "integer",
                                "default": 10,
                                "min": 1,
                                "max": 500,
                                "identifier": "t",
                                "title": "Threshold"
                            }
                        ],
                        "displayName": "Trim an image",
                        "method": "trim",
                        "description": "Trim \"boring\" pixels from all edges that contain values similar to the top-left pixel. Images consisting entirely of a single colour will calculate \"boring\" using the alpha channel, if any."
                    },
                    {
                        "params": [
                            {
                                "name": "angle",
                                "type": "integer",
                                "default": 0,
                                "min": -360,
                                "max": 360,
                                "identifier": "a",
                                "title": "Angle"
                            },
                            {
                                "name": "background",
                                "type": "color",
                                "default": "000000",
                                "identifier": "b",
                                "title": "Background"
                            }
                        ],
                        "displayName": "Rotate an image",
                        "method": "rotate",
                        "description": "Rotate Image by setting the angle parameter."
                    },
                    {
                        "params": [],
                        "displayName": "Flip an image vertically",
                        "method": "flip",
                        "description": "Mirror the image vertically."
                    },
                    {
                        "params": [],
                        "displayName": "Flip an image horizontally",
                        "method": "flop",
                        "description": "Mirror the image horizontally."
                    },
                    {
                        "params": [
                            {
                                "name": "sigma",
                                "type": "integer",
                                "default": 1,
                                "min": 1,
                                "max": 500,
                                "identifier": "s",
                                "title": "Sigma"
                            },
                            {
                                "name": "flat",
                                "type": "integer",
                                "default": 1,
                                "min": 1,
                                "max": 100,
                                "identifier": "f",
                                "title": "Flat"
                            },
                            {
                                "name": "jagged",
                                "type": "integer",
                                "default": 2,
                                "min": 1,
                                "max": 100,
                                "identifier": "j",
                                "title": "Jagged"
                            }
                        ],
                        "displayName": "Sharpen an image",
                        "method": "sharpen",
                        "description": "Sharpen an image by playing with different parameters like sigma, flat and jagged."
                    },
                    {
                        "params": [
                            {
                                "name": "size",
                                "type": "integer",
                                "default": 3,
                                "min": 1,
                                "max": 10,
                                "identifier": "s",
                                "title": "Size"
                            }
                        ],
                        "displayName": "Apply Median Filter",
                        "method": "median",
                        "description": "Apply a Median Filter to reduce impulsive, or salt-and-pepper noise"
                    },
                    {
                        "params": [
                            {
                                "name": "sigma",
                                "type": "integer",
                                "default": 1,
                                "min": 1,
                                "max": 1000,
                                "identifier": "s",
                                "title": "Sigma"
                            }
                        ],
                        "displayName": "Blur an image",
                        "method": "blur",
                        "description": "Apply blur effect on your image. Use the sigma parameter to apply an accurate Gaussian Blur."
                    },
                    {
                        "params": [
                            {
                                "name": "background",
                                "type": "color",
                                "default": "000000",
                                "identifier": "b",
                                "title": "Background"
                            }
                        ],
                        "displayName": "Flatten an image",
                        "method": "flatten",
                        "description": "Merge alpha transparency channel, if any, with a background, then remove the alpha channel."
                    },
                    {
                        "params": [],
                        "displayName": "Produce the \"negative\" of an image.",
                        "method": "negate",
                        "description": "Creates the negative of the image."
                    },
                    {
                        "params": [],
                        "displayName": "Normalise an image",
                        "method": "normalise",
                        "description": "Color Normalise Image."
                    },
                    {
                        "params": [
                            {
                                "name": "a",
                                "type": "integer",
                                "default": 1,
                                "min": 0,
                                "max": 50,
                                "identifier": "a",
                                "title": "A"
                            },
                            {
                                "name": "b",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 50,
                                "identifier": "b",
                                "title": "B"
                            }
                        ],
                        "displayName": "Use Levels adjustment on an image",
                        "method": "linear",
                        "description": "Apply the linear formula a * input + b to the image."
                    },
                    {
                        "params": [
                            {
                                "name": "brightness",
                                "type": "integer",
                                "default": 1,
                                "min": 1,
                                "max": 10,
                                "identifier": "b",
                                "title": "Brightness"
                            },
                            {
                                "name": "saturation",
                                "type": "integer",
                                "default": 1,
                                "min": 1,
                                "max": 10,
                                "identifier": "s",
                                "title": "Saturation"
                            },
                            {
                                "name": "hue",
                                "type": "integer",
                                "default": 90,
                                "min": -360,
                                "max": 360,
                                "identifier": "h",
                                "title": "Hue"
                            }
                        ],
                        "displayName": "Modulate an image",
                        "method": "modulate",
                        "description": "Transforms the image using brightness, saturation, hue rotation, and lightness. Brightness and lightness both operate on luminance, with the difference being that brightness is multiplicative whereas lightness is additive."
                    },
                    {
                        "params": [],
                        "displayName": "Apply grey scale filter on an image",
                        "method": "grey",
                        "description": "Grey scales Image"
                    },
                    {
                        "params": [
                            {
                                "name": "color",
                                "type": "color",
                                "default": "000000",
                                "identifier": "c",
                                "title": "Color"
                            }
                        ],
                        "displayName": "Tint an image",
                        "method": "tint",
                        "description": "Creates tint on Image"
                    },
                    {
                        "params": [
                            {
                                "name": "format",
                                "type": "enum",
                                "enum": [
                                    "jpeg",
                                    "png",
                                    "webp"
                                ],
                                "default": "jpeg",
                                "identifier": "f",
                                "title": "Format"
                            }
                        ],
                        "displayName": "Change image format",
                        "method": "toFormat",
                        "description": "Change image to a different format"
                    },
                    {
                        "params": [
                            {
                                "name": "mode",
                                "type": "enum",
                                "default": "overlay",
                                "enum": [
                                    "overlay",
                                    "underlay"
                                ],
                                "identifier": "m",
                                "title": "Mode"
                            },
                            {
                                "name": "image",
                                "type": "file",
                                "default": "",
                                "identifier": "i",
                                "title": "Image"
                            },
                            {
                                "name": "background",
                                "type": "color",
                                "default": "00000000",
                                "identifier": "bg",
                                "title": "Background"
                            },
                            {
                                "name": "height",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 12000,
                                "identifier": "h",
                                "title": "Height"
                            },
                            {
                                "name": "width",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 12000,
                                "identifier": "w",
                                "title": "Width"
                            },
                            {
                                "name": "top",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 12000,
                                "identifier": "t",
                                "title": "Top"
                            },
                            {
                                "name": "left",
                                "type": "integer",
                                "default": 0,
                                "min": 0,
                                "max": 12000,
                                "identifier": "l",
                                "title": "Left"
                            },
                            {
                                "name": "gravity",
                                "type": "enum",
                                "default": "center",
                                "enum": [
                                    "northwest",
                                    "north",
                                    "northeast",
                                    "east",
                                    "center",
                                    "west",
                                    "southwest",
                                    "south",
                                    "southeast",
                                    "custom"
                                ],
                                "identifier": "g",
                                "title": "Gravity"
                            },
                            {
                                "name": "blend",
                                "type": "enum",
                                "default": "over",
                                "enum": [
                                    "over",
                                    "in",
                                    "out",
                                    "atop",
                                    "dest",
                                    "dest-over",
                                    "dest-in",
                                    "dest-out",
                                    "dest-atop",
                                    "xor",
                                    "add",
                                    "saturate",
                                    "multiply",
                                    "screen",
                                    "overlay",
                                    "darken",
                                    "lighten",
                                    "colour-dodge",
                                    "color-dodge",
                                    "colour-burn",
                                    "color-burn",
                                    "hard-light",
                                    "soft-light",
                                    "difference",
                                    "exclusion"
                                ],
                                "identifier": "b",
                                "title": "Blend"
                            },
                            {
                                "name": "tile",
                                "type": "boolean",
                                "default": false,
                                "identifier": "r",
                                "title": "Tile"
                            }
                        ],
                        "displayName": "Merge two image",
                        "method": "merge",
                        "description": "Overlay or Underlay an image over the another one"
                    }
                ],
                "enabled": true
            },
            "remove": {
                "identifier": "remove",
                "name": "RemoveBG",
                "description": "RemoveBG Background Removal Module",
                "credentials": {
                    "required": true,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "apiKey": {
                                "id": "apiKey",
                                "title": "API Key",
                                "description": "API Key",
                                "type": "string"
                            }
                        },
                        "required": [
                            "apiKey"
                        ]
                    }
                },
                "operations": [
                    {
                        "params": [],
                        "displayName": "Remove background of any image",
                        "method": "bg",
                        "description": "RemoveBG Background Removal"
                    }
                ],
                "enabled": false
            },
            "erase": {
                "identifier": "erase",
                "name": "EraseBG",
                "description": "EraseBG Background Removal Module",
                "credentials": {
                    "required": false
                },
                "operations": [
                    {
                        "params": [
                            {
                                "name": "Industry Type",
                                "type": "enum",
                                "enum": [
                                    "general",
                                    "ecommerce"
                                ],
                                "default": "general",
                                "identifier": "i",
                                "title": "Industry type"
                            }
                        ],
                        "displayName": "Remove background of an image",
                        "method": "bg",
                        "description": "Remove the background of any image."
                    }
                ],
                "enabled": true
            },
            "sr": {
                "identifier": "sr",
                "name": "SuperResolution",
                "description": "Super Resolution Module",
                "credentials": {},
                "operations": [
                    {
                        "params": [
                            {
                                "name": "type",
                                "type": "enum",
                                "enum": [
                                    "2x",
                                    "4x"
                                ],
                                "default": "2x",
                                "identifier": "t",
                                "title": "Type"
                            }
                        ],
                        "displayName": "Upscale image resolution",
                        "method": "upscale",
                        "description": "Upscale your images to a larger resolution."
                    }
                ],
                "enabled": true
            },
            "af": {
                "identifier": "af",
                "name": "Artifact Removal",
                "description": "Artifact Removal Plugin",
                "credentials": {},
                "operations": [
                    {
                        "params": [],
                        "displayName": "Artifact Removal",
                        "method": "remove",
                        "description": "Remove JPEG compression artifact noise and get cleaner images."
                    }
                ],
                "enabled": true
            },
            "wm": {
                "identifier": "wm",
                "name": "WatermarkRemoval",
                "description": "Watermark Removal Plugin",
                "credentials": {},
                "operations": [
                    {
                        "params": [],
                        "displayName": "Remove Watermarks from image",
                        "method": "remove",
                        "description": "Produce watermark free images."
                    }
                ],
                "enabled": true
            },
            "awsRek": {
                "identifier": "awsRek",
                "name": "AWS Rekognition",
                "description": "AWS Rekognition Plugin",
                "credentials": {
                    "required": true,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "region": {
                                "id": "region",
                                "title": "AWS Region",
                                "description": "AWS Region",
                                "type": "string"
                            },
                            "accessKeyId": {
                                "id": "accessKeyId",
                                "title": "AWS Access Key ID",
                                "description": "AWS Access Key ID",
                                "type": "string"
                            },
                            "secretAccessKey": {
                                "id": "secretAccessKey",
                                "title": "AWS Secret Access Key",
                                "description": "AWS Secret Access Key",
                                "type": "string"
                            }
                        },
                        "required": [
                            "region",
                            "accessKeyId",
                            "secretAccessKey"
                        ]
                    }
                },
                "operations": [
                    {
                        "params": [
                            {
                                "name": "Maximum Labels",
                                "type": "integer",
                                "default": 5,
                                "min": 0,
                                "max": 10,
                                "identifier": "l",
                                "title": "Maximum labels"
                            },
                            {
                                "name": "Minimum Confidence",
                                "type": "integer",
                                "default": 55,
                                "min": 0,
                                "max": 99,
                                "identifier": "c",
                                "title": "Minimum confidence"
                            }
                        ],
                        "displayName": "AWS Rekognition DetectLabels",
                        "method": "detectLabels",
                        "description": "Detect objects in images."
                    },
                    {
                        "params": [
                            {
                                "name": "Minimum Confidence",
                                "type": "integer",
                                "default": 55,
                                "min": 0,
                                "max": 99,
                                "identifier": "c",
                                "title": "Minimum confidence"
                            }
                        ],
                        "displayName": "AWS Rekognition Moderation",
                        "method": "moderation",
                        "description": "Detect content that is inappropriate, unwanted, or offensive."
                    }
                ],
                "enabled": false
            },
            "googleVis": {
                "identifier": "googleVis",
                "name": "Google Vision",
                "description": "Google Vision Plugin",
                "credentials": {
                    "required": true,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "apiKey": {
                                "id": "apiKey",
                                "title": "API Key",
                                "description": "API Key",
                                "type": "string"
                            }
                        },
                        "required": [
                            "apiKey"
                        ]
                    }
                },
                "operations": [
                    {
                        "params": [
                            {
                                "name": "Maximum Labels",
                                "type": "integer",
                                "default": 5,
                                "min": 0,
                                "max": 10,
                                "identifier": "l",
                                "title": "Maximum labels"
                            }
                        ],
                        "displayName": "Google Vision DetectLabels",
                        "method": "detectLabels",
                        "description": "Detect objects in images."
                    }
                ],
                "enabled": false
            }
        },
        "presets": [
            {
                "_id": "5ae70981-1cf7-4b4c-858b-f3291c5f22a2",
                "createdAt": "2022-02-15T13:42:37.292Z",
                "updatedAt": "2022-02-15T13:42:37.292Z",
                "isActive": true,
                "orgId": "1936",
                "presetName": "compressor",
                "transformation": "t.compress()",
                "archived": false
            }
        ]
    },
};
