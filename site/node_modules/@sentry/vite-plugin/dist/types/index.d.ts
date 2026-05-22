import type { SentryRollupPluginOptions } from "@sentry/rollup-plugin";
interface SentryVitePlugin {
    name: string;
    enforce: "pre";
}
export declare const sentryVitePlugin: (options?: SentryRollupPluginOptions) => SentryVitePlugin[];
export type { Options as SentryVitePluginOptions } from "@sentry/bundler-plugin-core";
export { sentryCliBinaryExists } from "@sentry/bundler-plugin-core";
