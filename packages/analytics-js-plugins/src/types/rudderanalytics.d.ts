import type { RudderAnalytics, IRudderStackGlobals } from '@rudderstack/analytics-js-common';

declare global {
  interface Window {
    rudderanalytics: RudderAnalytics;
    RudderStackGlobals: IRudderStackGlobals;
    rudderAnalyticsMount: () => void;
    rudderAnalyticsBuildType: 'legacy' | 'modern';
  }
}