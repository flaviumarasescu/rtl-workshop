const config = {
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 16,
      functions: 14,
      lines: 26
    }
  },
  watchPathIgnorePatterns: ['node_modules'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
}

module.exports = config
