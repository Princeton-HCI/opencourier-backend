module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src', 'test'],
  testMatch: ['**/*.active.spec.ts'],
  // testMatch: ['**/*.active.spec.ts', '**/*.integration.spec.ts'],
}
