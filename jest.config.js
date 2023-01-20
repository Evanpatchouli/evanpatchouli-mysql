const config = {
    reporters: [
        "default",
        "jest-allure"
    ],
    setupFilesAfterEnv: ["jest-allure/dist/setup"],
    testRunner: "jest-jasmine2",
    testSequencer: './jest.sequencer.js',
    // maxWorkers: 1,
};

module.exports = config;