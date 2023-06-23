const DEFAULT_BEACON_QUEUE_MAX_SIZE = 10;
const DEFAULT_BEACON_QUEUE_FLUSH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

// Limit of the Beacon transfer mechanism on the browsers
const MAX_BATCH_PAYLOAD_SIZE_BYTES = 64 * 1024; // 64 KB

const DEFAULT_BEACON_QUEUE_OPTIONS = {
  maxItems: DEFAULT_BEACON_QUEUE_MAX_SIZE,
  flushQueueInterval: DEFAULT_BEACON_QUEUE_FLUSH_INTERVAL_MS,
};

const REQUEST_TIMEOUT_MS = 10 * 1000; // 10 seconds

const DATA_PLANE_API_VERSION = 'v1';

const QUEUE_NAME = 'rudder_beacon';

export {
  MAX_BATCH_PAYLOAD_SIZE_BYTES,
  DEFAULT_BEACON_QUEUE_OPTIONS,
  REQUEST_TIMEOUT_MS,
  DATA_PLANE_API_VERSION,
  QUEUE_NAME,
};