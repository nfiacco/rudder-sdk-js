import { getIntegrationsCDNPath } from '@rudderstack/analytics-js/components/configManager/util/cdnPaths';
import { getSDKUrl } from '@rudderstack/analytics-js/components/configManager/util/commonUtil';
import {
  CDN_INT_DIR,
  DEST_SDK_BASE_URL,
  SDK_CDN_BASE_URL,
} from '@rudderstack/analytics-js/constants/urls';

jest.mock('../../../src/components/configManager/util/commonUtil.ts', () => {
  const originalModule = jest.requireActual(
    '../../../src/components/configManager/util/commonUtil.ts',
  );

  return {
    __esModule: true,
    ...originalModule,
    getSDKUrl: jest.fn(),
  };
});

describe('CDN Paths: getIntegrationsCDNPath', () => {
  const dummyCustomURL = 'https://www.dummy.url/integrations';
  const dummyScriptURL = 'https://www.dummy.url/fromScript/v3/rudder-analytics.min.js';
  const dummyVersion = '3.x.x';

  beforeEach(() => {
    getSDKUrl.mockImplementation(() => dummyScriptURL);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return custom url if valid url is provided', () => {
    const integrationsCDNPath = getIntegrationsCDNPath(dummyVersion, false, dummyCustomURL);
    expect(integrationsCDNPath).toBe(dummyCustomURL);
  });

  it('should throw error if invalid custom url is provided', () => {
    const integrationsCDNPath = () => getIntegrationsCDNPath(dummyVersion, false, '/');
    expect(integrationsCDNPath).toThrow(
      'Failed to load RudderStack SDK: CDN base URL for integrations is not valid',
    );
  });

  it('should return script src path if script src exists and integrations version is not locked', () => {
    const integrationsCDNPath = getIntegrationsCDNPath(dummyVersion, false, undefined);
    expect(integrationsCDNPath).toBe('https://www.dummy.url/fromScript/v3/js-integrations');
  });

  it('should return script src path with versioned folder if script src exists and integrations version is locked', () => {
    const integrationsCDNPath = getIntegrationsCDNPath(dummyVersion, true, undefined);
    expect(integrationsCDNPath).toBe('https://www.dummy.url/fromScript/3.x.x/js-integrations');
  });

  it('should return default path if no script src exists and integrations version is not locked', () => {
    getSDKUrl.mockImplementation(() => undefined);

    const integrationsCDNPath = getIntegrationsCDNPath(dummyVersion, false, undefined);
    expect(integrationsCDNPath).toBe(DEST_SDK_BASE_URL);
  });

  it('should return default path with versioned folder if no script src exists and integrations version is locked', () => {
    getSDKUrl.mockImplementation(() => undefined);

    const integrationsCDNPath = getIntegrationsCDNPath(dummyVersion, true, undefined);
    expect(integrationsCDNPath).toBe(
      `${SDK_CDN_BASE_URL}/${dummyVersion}/latest/modern/${CDN_INT_DIR}`,
    );
  });
});