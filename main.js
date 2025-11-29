include("logger.js");

const logger = new Logger("main");

function bang() {
  logger.info("Device initialization complete!");
}
