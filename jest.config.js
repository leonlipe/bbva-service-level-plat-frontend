module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/server.ts'],
  testPathIgnorePatterns: ['build', 'webapp'],
  testResultsProcessor: 'jest-sonar-reporter',
  setupFiles: ['./env.js'],
};
