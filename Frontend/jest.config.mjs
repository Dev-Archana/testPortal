export default {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["./src/tests/setupTests.js"]
};