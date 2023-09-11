export default {
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\',
    ],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: [
        'node_modules',
    ],

    modulePaths: [
        '<rootDir>src',
    ],

    setupFilesAfterEnv: [ '<rootDir>/config/jest/setupTests.ts' ],

    // An array of file extensions your modules use
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],

    // The root directory that Jest should scan for tests and modules within
    rootDir: '../../',

    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy',
    },
};
