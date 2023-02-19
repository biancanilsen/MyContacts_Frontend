const { createTrue } = require("typescript");

module.exports = function (config) {
    config.set({
        browsers: ['ChromeHeadless'],
        frameworks: ['jasmine'],
        reporters: ['progress'],
        files: [
            // 'src/app/pages/**/*.spec.ts',
            { pattern: '**/*.spec.ts',  watched: false } 
        ],
        preprocessors: {
            '**/*.spec.ts': ['webpack'] 
        },
        junitReporter: {
            outputDir: 'test-results',
            outputFile: 'test-results.xml'
        },
        singleRun: true,
    });
};