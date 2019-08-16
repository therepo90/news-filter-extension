import { runExtension } from './app/extension';
import { MSG_ENABLE_EXT } from './app/constants';

const run = () => {
    chrome.runtime.sendMessage(null, { message: MSG_ENABLE_EXT }, null, () => {});
    runExtension();
};

run();
