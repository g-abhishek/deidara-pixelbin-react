module.exports = (api) => {
    api.cache(true);
    return {
        "env": {
            "test": {
                "presets": [
                    "@babel/preset-react",
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "current",
                            },
                        },
                    ]
                ],
                "plugins": [
                    "@babel/plugin-transform-modules-commonjs",
                ]
            }
        }
    };
}
