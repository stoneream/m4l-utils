include("header.js");

const logger = new Logger("main");
let trackAPI = null;

function trackChangedHandler() {
  logger.info("Tracks changed");
}

function bang() {
  logger.info("Device initialization complete!");
  trackAPI = new LiveObjectObserver("live_set", "tracks", trackChangedHandler);
}
