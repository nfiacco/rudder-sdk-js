/* eslint-disable no-underscore-dangle */
import { Mixpanel } from '../../../src/integrations/Mixpanel';

describe('Mixpanel init tests', () => {
  let mixpanel;

  beforeEach(() => {
    window.mixpanel = {};

    // Add a dummy script as it is required by the init script
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.id = 'dummyScript';
    const headElements = document.getElementsByTagName('head');
    headElements[0].insertBefore(scriptElement, headElements[0].firstChild);
  });

  afterEach(() => {
    // Reset DOM to original state
    document.getElementById('dummyScript')?.remove();
  });

  test('Persistence type is missing', () => {
    mixpanel = new Mixpanel({ persistence: 'none' }, { logLevel: 'debug' });
    mixpanel.init();
    expect(window.mixpanel._i[0][1]).toEqual({
      cross_subdomain_cookie: false,
      secure_cookie: false,
      persistence: 'cookie',
    });
  });

  test('Persistence type is cookie', () => {
    mixpanel = new Mixpanel(
      { persistenceType: 'cookie', persistenceName: '' },
      { logLevel: 'debug' },
    );
    mixpanel.init();
    expect(window.mixpanel._i[0][1]).toEqual({
      cross_subdomain_cookie: false,
      secure_cookie: false,
      persistence: 'cookie',
    });
  });

  test('Persistence type is localStorage and Persistence name is non empty', () => {
    mixpanel = new Mixpanel(
      { persistenceType: 'localStorage', persistenceName: 'abc' },
      { logLevel: 'debug' },
    );
    mixpanel.init();
    expect(window.mixpanel._i[0][1]).toEqual({
      cross_subdomain_cookie: false,
      secure_cookie: false,
      persistence: 'localStorage',
      persistence_name: 'abc',
    });
  });

  test('Persistence type is none', () => {
    mixpanel = new Mixpanel(
      { persistenceType: 'none', persistenceName: '' },
      { logLevel: 'debug' },
    );
    mixpanel.init();
    expect(window.mixpanel._i[0][1]).toEqual({
      cross_subdomain_cookie: false,
      secure_cookie: false,
      disable_persistence: true,
    });
  });
});
