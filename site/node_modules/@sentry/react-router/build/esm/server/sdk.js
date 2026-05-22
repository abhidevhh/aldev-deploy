import { debug, applySdkMetadata, setTag } from '@sentry/core';
import { init as init$1, getDefaultIntegrations } from '@sentry/node';
import { DEBUG_BUILD } from '../common/debug-build.js';
import { lowQualityTransactionsFilterIntegration } from './integration/lowQualityTransactionsFilterIntegration.js';
import { reactRouterServerIntegration } from './integration/reactRouterServer.js';

/**
 * Returns the default integrations for the React Router SDK.
 * @param options The options for the SDK.
 */
function getDefaultReactRouterServerIntegrations(options) {
  return [
    ...getDefaultIntegrations(options),
    lowQualityTransactionsFilterIntegration(options),
    reactRouterServerIntegration(),
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

  DEBUG_BUILD && debug.log('Initializing SDK...');

  applySdkMetadata(opts, 'react-router', ['react-router', 'node']);

  const client = init$1(opts);

  setTag('runtime', 'node');

  DEBUG_BUILD && debug.log('SDK successfully initialized');

  return client;
}

export { getDefaultReactRouterServerIntegrations, init };
//# sourceMappingURL=sdk.js.map
