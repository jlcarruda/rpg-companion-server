module.exports = {
  displayName: 'unit-tests',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['src/app.js'],
  // testResultsProcessor: 'jest-sonar-reporter',
  testMatch: ['**/tests/unit/**/(*.)+(spec|test).+(ts|tsx|js)'],
  clearMocks: true,
  setupFiles: ['dotenv/config'],
};
