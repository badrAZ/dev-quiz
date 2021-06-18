module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/'],
  testRegex: '\\.spec\\.js$',
  moduleNameMapper: {
    '^errors$': '<rootDir>/src/errors.js',
    '^config$': '<rootDir>/config.js',
  },
}
