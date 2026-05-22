import { init as init$1 } from '@sentry/browser';
import { consoleSandbox, applySdkMetadata, setTag } from '@sentry/core';

const BROWSER_TRACING_INTEGRATION_ID = 'BrowserTracing';

/**
 * Initializes the client side of the React Router SDK.
 */
function init(options) {
  // If BrowserTracing integration was passed to options, emit a warning
  if (options.integrations && Array.isArray(options.integrations)) {
    const hasBrowserTracing = options.integrations.some(
      integration => integration.name === BROWSER_TRACING_INTEGRATION_ID,
    );

    if (hasBrowserTracing) {
      consoleSandbox(() => {
        // eslint-disable-next-line no-console
        console.warn(
          'browserTracingIntegration is not fully compatible with @sentry/react-router. Please use reactRouterTracingIntegration instead.',
        );
      });
    }
  }

  applySdkMetadata(options, 'react-router', ['react-router', 'browser']);

  const client = init$1(options);

  setTag('runtime', 'browser');

  return client;
}

export { init };
//# sourceMappingURL=sdk.js.map
