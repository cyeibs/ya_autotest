export default {
  gridUrl: "http://localhost:4444/wd/hub",
  baseUrl: "http://localhost",
  pageLoadTimeout: 20000,
  httpTimeout: 60000,
  testTimeout: 90000,
  resetCursor: false,
  // retry: 7,
  sets: {
    desktop: {
      files: ["test/testplane/**/*.testplane.(t|j)s"],
      browsers: ["chrome"],
    },
  },
  browsers: {
    chrome: {
      automationProtocol: "devtools",
      headless: false,
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
  plugins: {
    "html-reporter/testplane": {
      enabled: true,
      path: "test/testplane/testplane-report",
      defaultView: "all",
      diffMode: "3-up-scaled",
    },
  },
};
