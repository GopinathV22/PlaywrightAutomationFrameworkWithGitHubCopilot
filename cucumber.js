module.exports = {
  default: {
    require: ['tests/CucumberFramework/support/hooks.js', 'tests/CucumberFramework/StepDefinitions/steps.js'],
    paths: ['tests/CucumberFramework/features/**/*.feature'],
    dryRun: false,
    parallel: 1
  }
};
