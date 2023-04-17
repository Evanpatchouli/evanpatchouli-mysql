const config = {
    reporters: [
        "default",
        "jest-allure"
    ],
    setupFilesAfterEnv: [
        "jest-allure/dist/setup",
        "./test/utils/localStorage.js"
    ],
    setupFiles: ["./test/utils/storage.js"],
    globalSetup: "./test/utils/globalSetup.js",
    // testEnvironment: "jsdom",
    testRunner: "jest-jasmine2",
    testSequencer: './jest.sequencer.js',
    maxWorkers: 1,
};

module.exports = config;