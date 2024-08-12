export {};
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["**/__tests__/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "setupTests.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
