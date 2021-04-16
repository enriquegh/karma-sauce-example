module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  const customLaunchers = {
    sl_chromeW3C: {
      base: 'SauceLabs',
      browserName: 'chrome',
      browserVersion: 'latest',
      'sauce:options':{
        tags: ['w3c-chrome']
      }
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      browserVersion: 'latest',
      'sauce:options':{
        tags: ['w3c-chrome']
      }
    },
  };

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/*.js',
      'test/*.js'
    ],
    logLevel: config.LOG_DEBUG,
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    sauceLabs: {
      testName: 'Karma and Sauce Labs demo',
      recordScreenshots: false,
      startConnect: true,
      connectOptions: {
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    },
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  })
};
