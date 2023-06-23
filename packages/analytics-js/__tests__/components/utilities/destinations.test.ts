import { ConfigResponseDestinationItem } from '@rudderstack/analytics-js/components/configManager/types';
import {
  filterEnabledDestination,
  getNonCloudDestinations,
  isNonCloudDestination,
  isHybridModeDestination,
} from '@rudderstack/analytics-js/components/utilities/destinations';
import { dummySourceConfigResponse } from '../../../__fixtures__/fixtures';

const sampleDestinationResponse1: ConfigResponseDestinationItem[] = [
  {
    config: {
      measurementId: 'G-SC6JGSYH6H',
      capturePageView: 'rs',
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      useNativeSDKToSend: false,
      eventFilteringOption: 'disable',
      extendPageViewParams: false,
      oneTrustCookieCategories: [],
    },
    id: '2LoR1TbVG2bcISXvy7DamldfkgO',
    name: 'GA4 for JS SDK',
    updatedAt: '2023-03-14T11:34:29.216Z',
    enabled: true,
    deleted: false,
    destinationDefinition: {
      name: 'GA4',
      displayName: 'Google Analytics 4 (GA4)',
      updatedAt: '2023-03-14T11:21:29.656Z',
    },
    enableTransformationForDeviceMode: true,
    propagateEventsUntransformedOnError: false,
  },
  {
    config: {
      measurementId: 'G-SC6JGSYH6H',
      capturePageView: 'rs',
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      useNativeSDKToSend: false,
      eventFilteringOption: 'disable',
      extendPageViewParams: false,
      oneTrustCookieCategories: [],
    },
    id: '2LoR1TbVG2bcISXvy7Damldfkg1',
    name: 'Braze for JS SDK',
    updatedAt: '2023-03-14T11:34:29.216Z',
    enabled: true,
    deleted: false,
    destinationDefinition: {
      name: 'BRAZE',
      displayName: 'Braze',
      updatedAt: '2023-03-14T11:21:29.656Z',
    },
    enableTransformationForDeviceMode: false,
    propagateEventsUntransformedOnError: false,
  },
];

const sampleDestinationResponse2: ConfigResponseDestinationItem[] = [
  {
    config: {
      measurementId: 'G-SC6JGSYH6H',
      capturePageView: 'rs',
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      useNativeSDKToSend: false,
      eventFilteringOption: 'disable',
      extendPageViewParams: false,
      oneTrustCookieCategories: [],
    },
    id: '2LoR1TbVG2bcISXvy7DamldfkgO',
    name: 'GA4 for JS SDK',
    updatedAt: '2023-03-14T11:34:29.216Z',
    enabled: true,
    deleted: true,
    destinationDefinition: {
      name: 'GA4',
      displayName: 'Google Analytics 4 (GA4)',
      updatedAt: '2023-03-14T11:21:29.656Z',
    },
    enableTransformationForDeviceMode: true,
    propagateEventsUntransformedOnError: false,
  },
  {
    config: {
      measurementId: 'G-SC6JGSYH6H',
      capturePageView: 'rs',
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      useNativeSDKToSend: false,
      eventFilteringOption: 'disable',
      extendPageViewParams: false,
      oneTrustCookieCategories: [],
    },
    id: '2LoR1TbVG2bcISXvy7Damldfkg1',
    name: 'Braze for JS SDK',
    updatedAt: '2023-03-14T11:34:29.216Z',
    enabled: true,
    deleted: true,
    destinationDefinition: {
      name: 'BRAZE',
      displayName: 'Braze',
      updatedAt: '2023-03-14T11:21:29.656Z',
    },
    enableTransformationForDeviceMode: false,
    propagateEventsUntransformedOnError: false,
  },
];

const expectedFilteredDestinations = [
  {
    id: '2LoR1TbVG2bcISXvy7DamldfkgO',
    displayName: 'Google Analytics 4 (GA4)',
    enableTransformationForDeviceMode: true,
    propagateEventsUntransformedOnError: false,
    config: {
      measurementId: 'G-SC6JGSYH6H',
      capturePageView: 'rs',
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      useNativeSDKToSend: false,
      eventFilteringOption: 'disable',
      extendPageViewParams: false,
      oneTrustCookieCategories: [],
    },
    userFriendlyId: 'Google_Analytics_4_(GA4)___2LoR1TbVG2bcISXvy7DamldfkgO',
  },
  {
    id: '2LoR1TbVG2bcISXvy7Damldfkg1',
    displayName: 'Braze',
    enableTransformationForDeviceMode: false,
    propagateEventsUntransformedOnError: false,
    config: {
      measurementId: 'G-SC6JGSYH6H',
      capturePageView: 'rs',
      whitelistedEvents: [
        {
          eventName: '',
        },
      ],
      blacklistedEvents: [
        {
          eventName: '',
        },
      ],
      useNativeSDKToSend: false,
      eventFilteringOption: 'disable',
      extendPageViewParams: false,
      oneTrustCookieCategories: [],
    },
    userFriendlyId: 'Braze___2LoR1TbVG2bcISXvy7Damldfkg1',
  },
];

describe('Config manager util - filterEnabledDestination', () => {
  it('should return enabled destinations in specific format', () => {
    const actualOutcome = filterEnabledDestination(sampleDestinationResponse1);
    expect(actualOutcome).toStrictEqual(expectedFilteredDestinations);
  });

  it('should not return deleted destinations', () => {
    const actualOutcome = filterEnabledDestination(sampleDestinationResponse2);
    expect(actualOutcome).toStrictEqual([]);
  });

  it('should get non-cloud destinations', () => {
    const actualOutcome = getNonCloudDestinations(dummySourceConfigResponse.source.destinations);
    expect(actualOutcome.length).toBe(3);
  });

  it('should detect if destination is non-cloud', () => {
    const hybridDestination = isNonCloudDestination(
      dummySourceConfigResponse.source.destinations[0],
    );
    expect(hybridDestination).toBeTruthy();

    const nativeDest = isNonCloudDestination(dummySourceConfigResponse.source.destinations[1]);
    expect(nativeDest).toBeTruthy();

    const cloudDest = isNonCloudDestination(dummySourceConfigResponse.source.destinations[2]);
    expect(cloudDest).toBeFalsy();
  });

  it('should detect if a destination is hybrid', () => {
    const hybridDestination = isHybridModeDestination(
      dummySourceConfigResponse.source.destinations[0],
    );
    expect(hybridDestination).toBeTruthy();

    const nativeDest = isHybridModeDestination(dummySourceConfigResponse.source.destinations[1]);
    expect(nativeDest).toBeFalsy();

    const cloudDest = isHybridModeDestination(dummySourceConfigResponse.source.destinations[2]);
    expect(cloudDest).toBeFalsy();

    const hybridDestination2 = isHybridModeDestination(
      dummySourceConfigResponse.source.destinations[3],
    );
    expect(hybridDestination2).toBeTruthy();
  });
});