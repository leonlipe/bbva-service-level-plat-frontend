const execSync = require('child_process').execSync;
const fs = require('fs');

function execCommand(command) {
  try {
    const response = execSync(command);
    return response.toString().slice(0, -1);
  } catch (e) {
    console.warn(
      `Error executing command "${command}"\nError message: ${e.toString()}`
    );
    return null;
  }
}

function getCloudAccount() {
  return (
    execCommand('gcloud config list account --format "value(core.account)"') ||
    'email@dev.bbva.com'
  );
}

function getCloudProject() {
  return (
    execCommand('gcloud config list project --format "value(core.project)"') ||
    'dev-bbva-project'
  );
}

function getGaeRuntimeFromAppYaml() {
  try {
    const content = fs.readFileSync('./deployables/dev/app.yaml');
    const regex = /^runtime: ?(.*)$/gm;
    const result = regex.exec(content.toString());
    if (result.length === 2) {
      return result[1];
    }
  } catch (e) {
    console.warn(
      `Error getting gae runtime from ./deployables/dev/app.yaml.\nError: ${e.toString()}`
    );
  }
  return 'nodejs18';
}

(function main() {
  process.env.APP_PROPERTIES_PATHS = 'properties';
  process.env.BBVA_ENV = 'dev';
  process.env.GAE_ENV = 'fga-local';
  process.env.GAE_RUNTIME = getGaeRuntimeFromAppYaml();
  process.env.GAE_SERVICE = 'default';
  process.env.GOOGLE_CLOUD_PROJECT = getCloudProject();
  process.env.REQUESTOR = getCloudAccount();
  process.env.SERVER_SOFTWARE = 'dev-server';
  process.env.USER_SESSIONS_STORAGE_PATH = 'default';
})();
