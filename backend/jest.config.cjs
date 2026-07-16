module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  },

  moduleFileExtensions: ["ts", "js", "json"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },

  testMatch: ["**/tests/**/*.test.ts"]
};