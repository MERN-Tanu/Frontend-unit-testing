module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
};

setupFilesAfterEnv: [
  "<rootDir>/support/setupTests.js"
]