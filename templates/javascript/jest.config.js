/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = async () => {
  return {
      testEnvironment: "jsdom",
      transformIgnorePatterns: ["/node_modules/(?!@pixelbin/js)/.+\\.js$"],
  };
};