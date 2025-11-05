module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/tests/**/*.test.js'],
  setupFiles: ['./tests/setup.js'],
  globalTeardown: './tests/teardown.js',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  }
};