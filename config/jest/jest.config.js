module.exports = {
  rootDir: '../../',
  verbose: true,
  clearMocks: true,
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/setup-tests.ts'
  ],
  setupFiles: [
    '<rootDir>/config/jest/__mocks__.tsx',
    '<rootDir>/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/'
  ],
  coverageDirectory: '<rootDir>/config/jest/coverage',
  moduleDirectories: ['.', 'src', 'node_modules'],
  moduleNameMapper: {
    // General
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    "\\.(jpg|jpeg|png|svg|pdf)$": "<rootDir>/config/jest/__mocks__/file-mock.js",

    // Alias,
    '^components(.*)$': '<rootDir>/src/components$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^containers(.*)$': '<rootDir>/src/containers$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^root(.*)$': '<rootDir>$1'
  },
  transform: {
    '^.+\\.(jsx|js)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: "jsdom"
}
