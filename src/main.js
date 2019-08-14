import { runExtension } from './app/extension';

const run = () => {
    chrome.runtime.sendMessage(null, { message: 'ENABLE_EXT' }, null, () => {});
    runExtension();
};

run();
