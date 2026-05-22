Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const core = require('@sentry/core');
const node = require('@sentry/node');
const debugBuild = require('../common/debug-build.js');
const lowQualityTransactionsFilterIntegration = require('./integration/lowQualityTransactionsFilterIntegration.js');
const reactRouterServer = require('./integration/reactRouterServer.js');

/**
 * Returns the default integrations for the React Router SDK.
 * @param options The options for the SDK.
 */
function getDefaultReactRouterServerIntegrations(options) {
  return [
    ...node.getDefaultIntegrations(options),
    lowQualityTransactionsFilterIntegration.lowQualityTransactionsFilterIntegration(options),
    reactRouterServer.reactRouterServerIntegration(),
  ];
}

/**
 * Initializes the server side of the React Router SDK
 */
function init(options) {
  const opts = {
    ...options,
    defaultIntegrations: getDefaultReactRouterServerIntegrations(options),
  };

  debugBuild.DEBUG_BUILD && core.debug.log('Initializing SDK...');

  core.applySdkMetadata(opts, 'react-router', ['react-router', 'node']);

  const client = node.init(opts);

  core.setTag('runtime', 'node');

  debugBuild.DEBUG_BUILD && core.debug.log('SDK successfully initialized');

  return client;
}

exports.getDefaultReactRouterServerIntegrations = getDefaultReactRouterServerIntegrations;
exports.init = init;
//# sourceMappingURL=sdk.js.map
