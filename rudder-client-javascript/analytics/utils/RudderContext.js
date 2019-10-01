//Context class
import RudderApp from "./RudderApp";
import {
  RudderLibraryInfo,
  RudderOSInfo,
  RudderScreenInfo
} from "./RudderInfo";
class RudderContext {
  constructor() {
    this.rl_app = new RudderApp();
    this.rl_traits = null;
    this.rl_library = new RudderLibraryInfo();
    //this.rl_os = null;
    let os = new RudderOSInfo();
    os.rl_version = ""; //skipping version for simplicity now
    let screen = new RudderScreenInfo();

    //Depending on environment within which the code is executing, screen
    //dimensions can be set
    //User agent and locale can be retrieved only for browser
    //For server-side integration, same needs to be set by calling program
    if (process.browser) {
      //server-side integration
      screen.rl_width = 0;
      screen.rl_height = 0;
      screen.rl_density = 0;
      os.rl_version = "";
      os.rl_name = "";
      this.rl_user_agent = null;
      this.rl_locale = null;
    } else {
      //running within browser
      screen.rl_width = window.width;
      screen.rl_height = window.height;
      screen.rl_density = window.devicePixelRatio;
      this.rl_user_agent = navigator.userAgent;
      //property name differs based on browser version
      this.rl_locale = navigator.language || navigator.browserLanguage;
    }

    this.screen = screen;
    this.rl_device = null;
    this.rl_network = null;
  }
}
export default RudderContext;
