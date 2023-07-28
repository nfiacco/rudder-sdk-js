import { UserSessionManager } from '@rudderstack/analytics-js/components/userSessionManager';
import { userSessionStorageKeys } from '@rudderstack/analytics-js/components/userSessionManager/userSessionStorageKeys';
import { StoreManager } from '@rudderstack/analytics-js/services/StoreManager';
import { Store } from '@rudderstack/analytics-js/services/StoreManager/Store';
import { state, resetState } from '@rudderstack/analytics-js/state';
import {
  MIN_SESSION_TIMEOUT,
  DEFAULT_SESSION_TIMEOUT,
} from '@rudderstack/analytics-js/constants/timeouts';
import { defaultLogger } from '@rudderstack/analytics-js/services/Logger';
import { defaultErrorHandler } from '@rudderstack/analytics-js/services/ErrorHandler';
import { PluginsManager } from '@rudderstack/analytics-js/components/pluginsManager';
import { defaultPluginEngine } from '@rudderstack/analytics-js/services/PluginEngine';

jest.mock('@rudderstack/analytics-js-common/utilities/uuId', () => ({
  generateUUID: jest.fn().mockReturnValue('test_uuid'),
}));

describe('User session manager', () => {
  const dummyAnonymousId = 'dummy-anonymousId-12345678';
  defaultLogger.warn = jest.fn();
  const defaultPluginsManager = new PluginsManager(
    defaultPluginEngine,
    defaultErrorHandler,
    defaultLogger,
  );
  const defaultStoreManager = new StoreManager(
    defaultPluginsManager,
    defaultErrorHandler,
    defaultLogger,
  );

  let userSessionManager: UserSessionManager;

  defaultStoreManager.init();
  const clientDataStore = defaultStoreManager.getStore('clientData') as Store;

  const setCustomValuesInStorage = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      clientDataStore.set(key, value);
    });
  };

  const setCustomValuesInStorageEngine = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      clientDataStore.engine.setItem(key, value);
    });
  };

  const clearStorage = () => {
    Object.values(userSessionStorageKeys).forEach(key => {
      clientDataStore.remove(key);
    });
  };

  beforeEach(() => {
    clearStorage();
    resetState();
    userSessionManager = new UserSessionManager(
      defaultErrorHandler,
      defaultLogger,
      defaultPluginsManager,
    );
  });

  it('should initialize user details from storage to state', () => {
    const customData = {
      rl_user_id: 'sample-user-id-1234567',
      rl_trait: { key1: 'value1' },
      rl_anonymous_id: 'dummy-anonymousId',
      rl_group_id: 'sample-group-id-7654321',
      rl_group_trait: { key2: 'value2' },
      rl_page_init_referrer: 'dummy-url-1',
      rl_page_init_referring_domain: 'dummy-url-2',
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    expect(state.session.userId.value).toBe(customData.rl_user_id);
    expect(state.session.userTraits.value).toStrictEqual(customData.rl_trait);
    expect(state.session.anonymousUserId.value).toBe(customData.rl_anonymous_id);
    expect(state.session.groupId.value).toBe(customData.rl_group_id);
    expect(state.session.groupTraits.value).toStrictEqual(customData.rl_group_trait);
    expect(state.session.initialReferrer.value).toBe(customData.rl_page_init_referrer);
    expect(state.session.initialReferringDomain.value).toBe(
      customData.rl_page_init_referring_domain,
    );
  });
  it('should initialize user details when storage is empty to state', () => {
    const customData = {
      rl_user_id: '',
      rl_trait: {},
      rl_group_id: '',
      rl_group_trait: {},
      rl_page_init_referrer: '$direct',
      rl_page_init_referring_domain: '',
    };
    userSessionManager.init(clientDataStore);
    expect(state.session.userId.value).toBe(customData.rl_user_id);
    expect(state.session.userTraits.value).toStrictEqual(customData.rl_trait);
    expect(typeof state.session.anonymousUserId.value).toBe('string');
    expect(state.session.anonymousUserId.value).toBe('test_uuid');
    expect(state.session.groupId.value).toBe(customData.rl_group_id);
    expect(state.session.groupTraits.value).toStrictEqual(customData.rl_group_trait);
    expect(state.session.initialReferrer.value).toBe(customData.rl_page_init_referrer);
    expect(state.session.initialReferringDomain.value).toBe(
      customData.rl_page_init_referring_domain,
    );
  });
  // TODO: mode test cases need to be covered
  it('setAnonymousId', () => {
    clientDataStore.set = jest.fn();
    const newAnonymousId = 'new-dummy-anonymous-id';
    userSessionManager.init(clientDataStore);
    userSessionManager.setAnonymousId(newAnonymousId);
    expect(state.session.anonymousUserId.value).toBe(newAnonymousId);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  it('setUserId', () => {
    clientDataStore.set = jest.fn();
    const newUserId = 'new-dummy-user-id';
    userSessionManager.init(clientDataStore);
    userSessionManager.setUserId(newUserId);
    expect(state.session.userId.value).toBe(newUserId);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  it('setUserTraits', () => {
    clientDataStore.set = jest.fn();
    const newUserTraits = { key1: 'value1', key2: 'value2' };
    userSessionManager.init(clientDataStore);
    userSessionManager.setUserTraits(newUserTraits);
    expect(state.session.userTraits.value).toStrictEqual(newUserTraits);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  it('setGroupId', () => {
    clientDataStore.set = jest.fn();
    const newGroupId = 'new-dummy-group-id';
    userSessionManager.init(clientDataStore);
    userSessionManager.setGroupId(newGroupId);
    expect(state.session.groupId.value).toBe(newGroupId);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  it('setGroupTraits', () => {
    clientDataStore.set = jest.fn();
    const newGroupTraits = { key1: 'value1', key2: 'value2' };
    userSessionManager.init(clientDataStore);
    userSessionManager.setGroupTraits(newGroupTraits);
    expect(state.session.groupTraits.value).toStrictEqual(newGroupTraits);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  it('setInitialReferrer', () => {
    clientDataStore.set = jest.fn();
    const newReferrer = 'new-dummy-referrer-1';
    userSessionManager.init(clientDataStore);
    userSessionManager.setInitialReferrer(newReferrer);
    expect(state.session.initialReferrer.value).toBe(newReferrer);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  it('setInitialReferringDomain', () => {
    clientDataStore.set = jest.fn();
    const newReferrer = 'new-dummy-referrer-2';
    userSessionManager.init(clientDataStore);
    userSessionManager.setInitialReferringDomain(newReferrer);
    expect(state.session.initialReferringDomain.value).toBe(newReferrer);
    expect(clientDataStore.set).toHaveBeenCalled();
  });
  // TODO: debug the below 8 test cases with .skip later
  // single tests are passing but when running the whole suite tests are failing
  it.skip('getAnonymousId', () => {
    const customData = {
      rl_anonymous_id: dummyAnonymousId,
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualAnonymousId = userSessionManager.getAnonymousId();
    expect(actualAnonymousId).toBe(customData.rl_anonymous_id);
  });
  it.skip('getAnonymousId with option to fetch from external source', () => {
    const customData = {
      ajs_anonymous_id: 'dummy-anonymousId-12345678',
    };
    const option = {
      autoCapture: {
        source: 'segment',
        enabled: true,
      },
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualAnonymousId = userSessionManager.getAnonymousId(option);
    expect(actualAnonymousId).toBe(customData.ajs_anonymous_id);
  });
  it.skip('getUserId', () => {
    const customData = {
      rl_user_id: 'dummy-userId-12345678',
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualUserId = userSessionManager.getUserId();
    expect(actualUserId).toBe(customData.rl_user_id);
  });
  it.skip('getUserTraits', () => {
    const customData = {
      rl_trait: { key1: 'value1', random: '123456789' },
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualUserTraits = userSessionManager.getUserTraits();
    expect(actualUserTraits).toStrictEqual(customData.rl_trait);
  });
  it.skip('getGroupId', () => {
    const customData = {
      rl_group_id: 'dummy-groupId-12345678',
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualGroupId = userSessionManager.getGroupId();
    expect(actualGroupId).toBe(customData.rl_group_id);
  });
  it.skip('getGroupTraits', () => {
    const customData = {
      rl_group_trait: { key1: 'value1', random: '123456789' },
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualGroupTraits = userSessionManager.getGroupTraits();
    expect(actualGroupTraits).toStrictEqual(customData.rl_group_trait);
  });
  it.skip('getInitialReferrer', () => {
    const customData = {
      rl_page_init_referrer: 'dummy-url-1234',
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualInitialReferrer = userSessionManager.getInitialReferrer();
    expect(actualInitialReferrer).toBe(customData.rl_page_init_referrer);
  });
  it.skip('getInitialReferringDomain', () => {
    const customData = {
      rl_page_init_referring_domain: 'dummy-url-287654',
    };
    setCustomValuesInStorage(customData);
    userSessionManager.init(clientDataStore);
    const actualInitialReferringDomain = userSessionManager.getInitialReferringDomain();
    expect(actualInitialReferringDomain).toBe(customData.rl_page_init_referring_domain);
  });
  it('initializeSessionTracking: should be called during initialization of user session', () => {
    userSessionManager.initializeSessionTracking = jest.fn();
    userSessionManager.init(clientDataStore);
    expect(userSessionManager.initializeSessionTracking).toHaveBeenCalled();
  });
  it('initializeSessionTracking: should call startAutoTracking if auto tracking is not disabled', () => {
    userSessionManager.startOrRenewAutoTracking = jest.fn();
    userSessionManager.initializeSessionTracking();
    expect(userSessionManager.startOrRenewAutoTracking).toHaveBeenCalled();
  });
  it('initializeSessionTracking: should print warning message and use default timeout if provided timeout is not in number format', () => {
    state.loadOptions.value.sessions.timeout = '100000';
    userSessionManager.initializeSessionTracking();
    expect(defaultLogger.warn).toHaveBeenCalledWith(
      'UserSessionManager:: The session timeout value "100000" is not a number. The default timeout of 1800000 ms will be used instead.',
    );
    expect(state.session.sessionInfo.value.timeout).toBe(DEFAULT_SESSION_TIMEOUT);
  });
  it('initializeSessionTracking: should print warning message and disable auto tracking if provided timeout is 0', () => {
    state.loadOptions.value.sessions.timeout = 0;
    userSessionManager.initializeSessionTracking();
    expect(defaultLogger.warn).toHaveBeenCalledWith(
      'UserSessionManager:: The session timeout value is 0, which disables the automatic session tracking feature. If you want to enable session tracking, please provide a positive integer value for the timeout.',
    );
    expect(state.session.sessionInfo.value.autoTrack).toBe(false);
  });
  it('initializeSessionTracking: should print warning message if provided timeout is less than 10 second', () => {
    state.loadOptions.value.sessions.timeout = 5000; // provided timeout as 5 second
    userSessionManager.initializeSessionTracking();
    expect(defaultLogger.warn).toHaveBeenCalledWith(
      `UserSessionManager:: The session timeout value 5000 ms is less than the recommended minimum of 10000 ms. Please consider increasing the timeout value to ensure optimal performance and reliability.`,
    );
  });
  it('refreshSession: should return empty object if any type of tracking is not enabled', () => {
    userSessionManager.init(clientDataStore);
    state.session.sessionInfo.value = {};
    userSessionManager.refreshSession();
    expect(state.session.sessionInfo.value).toStrictEqual({});
  });
  it('refreshSession: should return session id and sessionStart when auto tracking is enabled', () => {
    const futureTimestamp = Date.now() + 5000;
    state.session.sessionInfo.value = {
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: futureTimestamp,
      id: 1683613729115,
      sessionStart: true,
    };
    userSessionManager.refreshSession();
    expect(state.session.sessionInfo.value).toEqual({
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: expect.any(Number),
      id: 1683613729115,
      sessionStart: false,
    });
  });
  it('refreshSession: should return session id and sessionStart when manual tracking is enabled', () => {
    const manualTrackingSessionId = 1029384756;
    userSessionManager.init(clientDataStore);
    userSessionManager.start(manualTrackingSessionId);
    userSessionManager.refreshSession();
    expect(state.session.sessionInfo.value).toEqual({
      id: manualTrackingSessionId,
      sessionStart: true,
      manualTrack: true,
    });
  });
  it('refreshSession: should generate new session id and sessionStart and return when auto tracking session is expired', () => {
    userSessionManager.init(clientDataStore);
    const pastTimestamp = Date.now() - 5000;
    state.session.sessionInfo.value = {
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: pastTimestamp,
      id: 1683613729115,
      sessionStart: false,
    };
    userSessionManager.refreshSession();
    expect(state.session.sessionInfo.value).toEqual({
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      id: expect.any(Number),
      expiresAt: expect.any(Number),
      sessionStart: true,
    });
  });
  it('refreshSession: should return only session id from the second event of the auto session tracking', () => {
    userSessionManager.initializeSessionTracking();
    userSessionManager.refreshSession(); // sessionInfo For First Event
    userSessionManager.refreshSession();
    expect(state.session.sessionInfo.value.sessionStart).toBe(false);
  });
  it('refreshSession: should return only session id from the second event of the manual session tracking', () => {
    const manualTrackingSessionId = 1029384756;
    userSessionManager.start(manualTrackingSessionId);
    userSessionManager.refreshSession(); // sessionInfo For First Event
    userSessionManager.refreshSession();
    expect(state.session.sessionInfo.value.sessionStart).toBe(false);
  });
  it('startAutoTracking: should create a new session in case of invalid session', () => {
    userSessionManager.init(clientDataStore);
    state.session.sessionInfo.value = {
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: Date.now() - 1000,
      id: 1683613729115,
      sessionStart: false,
    };
    userSessionManager.startOrRenewAutoTracking();
    expect(state.session.sessionInfo.value).toEqual({
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: expect.any(Number),
      id: expect.any(Number),
      sessionStart: undefined,
    });
  });
  it('startAutoTracking: should not create a new session in case of valid session', () => {
    userSessionManager.init(clientDataStore);
    state.session.sessionInfo.value = {
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: Date.now() + 30 * 1000,
      id: 1683613729115,
      sessionStart: false,
    };
    userSessionManager.startOrRenewAutoTracking();
    expect(state.session.sessionInfo.value).toEqual({
      autoTrack: true,
      timeout: 10 * 60 * 1000,
      expiresAt: expect.any(Number),
      id: 1683613729115,
      sessionStart: false,
    });
  });
  it('startManualTracking: should create a new manual session', () => {
    const manualTrackingSessionId = 1029384756;
    userSessionManager.init(clientDataStore);
    userSessionManager.start(manualTrackingSessionId);
    expect(state.session.sessionInfo.value).toEqual({
      manualTrack: true,
      id: manualTrackingSessionId,
      sessionStart: undefined,
    });
  });
  it('startManualTracking: should create a new manual session even id session id is not provided', () => {
    userSessionManager.init(clientDataStore);
    userSessionManager.start();
    expect(state.session.sessionInfo.value).toEqual({
      manualTrack: true,
      id: expect.any(Number),
      sessionStart: undefined,
    });
  });
  it('endSessionTracking: should clear session info', () => {
    userSessionManager.init(clientDataStore);
    userSessionManager.end();
    expect(state.session.sessionInfo.value).toEqual({});
  });
  it('reset: should reset user session to the initial value except anonymousId', () => {
    userSessionManager.init(clientDataStore);
    userSessionManager.setAnonymousId(dummyAnonymousId);
    const sessionInfoBeforeReset = JSON.parse(JSON.stringify(state.session.sessionInfo.value));
    userSessionManager.reset();
    expect(state.session.userId.value).toEqual('');
    expect(state.session.userTraits.value).toEqual({});
    expect(state.session.groupId.value).toEqual('');
    expect(state.session.groupTraits.value).toEqual({});
    expect(state.session.anonymousUserId.value).toEqual(dummyAnonymousId);
    // new session will be generated
    expect(state.session.sessionInfo.value.autoTrack).toBe(sessionInfoBeforeReset.autoTrack);
    expect(state.session.sessionInfo.value.timeout).toBe(sessionInfoBeforeReset.timeout);
    expect(state.session.sessionInfo.value.expiresAt).not.toBe(sessionInfoBeforeReset.expiresAt);
    expect(state.session.sessionInfo.value.id).not.toBe(sessionInfoBeforeReset.id);
    expect(state.session.sessionInfo.value.sessionStart).toBe(undefined);
  });
  it('reset: should clear anonymousId with first parameter set to true', () => {
    userSessionManager.init(clientDataStore);
    userSessionManager.setAnonymousId(dummyAnonymousId);
    userSessionManager.reset(true);
    expect(state.session.anonymousUserId.value).toEqual('');
  });
  it('reset: should not start a new session with second parameter set to true', () => {
    userSessionManager.init(clientDataStore);
    const sessionInfoBeforeReset = JSON.parse(JSON.stringify(state.session.sessionInfo.value));
    userSessionManager.reset(true, true);
    expect(state.session.sessionInfo.value).toEqual(sessionInfoBeforeReset);
  });

  it('should migrate legacy storage data is migration is enabled', () => {
    const customData = {
      rl_user_id:
        'RudderEncrypt%3AU2FsdGVkX1%2FSIc%2F%2FsRy9t3CPVe54IHncEARgbMhX7xkKDtO%2BVtg%2BW1mjeAF1v%2Fp5', // '"1wefk7M3Y1D6EDX4ZpIE00LpKAE"'
      rl_trait:
        'RudderEncrypt%3AU2FsdGVkX19T0ItDzfT%2FZwWZ8wg4za9jcxyhSM4ZvWvkZCGeDekKc1%2B6l6i19bw8xv4YrtR8IBMp0SJBw76cbg%3D%3D', // '{email: 'saibattinoju@rudderstack.com'}'
      rl_anonymous_id:
        'RudderEncrypt%3AU2FsdGVkX19GLIcQTLgTdMu3NH14EwwTTK0ih%2BouACRQVDSrmYeVNe3vzF6W9oh0UzjgEf8N%2Fvxy%2BE%2F2BzIHuA%3D%3D', // '"bc9597ae-117e-4857-9d85-f02719b73239"'
      // V3 encrypted
      rl_page_init_referrer:
        'RS_ENC_v3_Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jZG4vbW9kZXJuL2lpZmUvaW5kZXguaHRtbCI%3D', // '"$direct"
    };

    setCustomValuesInStorageEngine(customData);

    // Enable migration
    state.storage.migrate.value = true;

    defaultPluginsManager.init();

    const invokeSpy = jest.spyOn(defaultPluginsManager, 'invokeSingle');

    userSessionManager.init(clientDataStore);

    expect(invokeSpy).nthCalledWith(
      1,
      'storage.migrate',
      'rl_user_id',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      2,
      'storage.migrate',
      'rl_trait',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      3,
      'storage.migrate',
      'rl_anonymous_id',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      4,
      'storage.migrate',
      'rl_group_id',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      5,
      'storage.migrate',
      'rl_group_trait',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      6,
      'storage.migrate',
      'rl_page_init_referrer',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      7,
      'storage.migrate',
      'rl_page_init_referring_domain',
      clientDataStore.engine,
      defaultLogger,
    );
    expect(invokeSpy).nthCalledWith(
      8,
      'storage.migrate',
      'rl_session',
      clientDataStore.engine,
      defaultLogger,
    );

    // All the values will be deleted from storage as plugin invocation fails
    // Eventually, default values will be assigned during initialization
    expect(state.session.userId.value).toBe('');
    expect(state.session.userTraits.value).toStrictEqual({});
    expect(state.session.anonymousUserId.value).toBe('test_uuid');
    expect(state.session.groupId.value).toBe('');
    expect(state.session.groupTraits.value).toStrictEqual({});
    expect(state.session.initialReferrer.value).toBe('$direct');
    expect(state.session.initialReferringDomain.value).toBe('');
    expect(state.session.sessionInfo.value).not.toBeUndefined();
  });
});