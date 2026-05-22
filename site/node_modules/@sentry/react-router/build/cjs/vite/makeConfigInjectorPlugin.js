Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

/**
 * Creates a Vite plugin that injects the Sentry options into the global Vite config.
 * This ensures the sentryConfig is available to other components that need access to it,
 * like the buildEnd hook.
 *
 * @param options - Configuration options for the Sentry Vite plugin
 * @returns A Vite plugin that injects sentryConfig into the global config
 */
function makeConfigInjectorPlugin(options) {
  return {
    name: 'sentry-react-router-config-injector',
    enforce: 'pre',
    config(config) {
      return {
        ...config,
        sentryConfig: options,
      };
    },
  };
}

exports.makeConfigInjectorPlugin = makeConfigInjectorPlugin;
//# sourceMappingURL=makeConfigInjectorPlugin.js.map
