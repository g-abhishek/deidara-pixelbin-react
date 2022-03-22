module.exports = () => {
    return {
        setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
        moduleNameMapper: {},
        modulePaths: ["<rootDir>/src/"],
        testEnvironment: "jsdom",
    };
};
