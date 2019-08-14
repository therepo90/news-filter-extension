import { logger } from './logger';
import { queryElements } from './utils';
import { allSentencesMatcher } from './matchers';

export const packageName = 'Bad news filter';
const hiddenElements = [];

const findParentLink = el => {
    let node = el.parentNode;
    while (node != document.body) {
        if(node.matches('.link')) {
            break;
        }
        node = node.parentNode;
    }
    return node;
};

export const runExtension = async () => {
    logger.log(`%c${packageName} %cextension running`, 'color: green;font-size:16px;', 'color:black;');
    const descSelector = `#itemsStream > .link .description > p > a`;
    const titleSelector = `#itemsStream .lcontrast.m-reset-margin > h2`;
    const root = document.body;
    const elements = queryElements(titleSelector, root).concat(queryElements(descSelector, root));
    elements.forEach(el => {
        if(allSentencesMatcher(el.innerText)){
            const node = findParentLink(el);
            if(node) {
                hideElement(node, 'allSentences')
            }
        }
    });

};

const requestUpdateBadge = () => {
    chrome.runtime.sendMessage(null, { message: 'UPDATE_BADGE', text: String(hiddenElements.length) }, null, () => {});
};

const hideElement = (el, reason) => {
    logger.debug('hiding element', el);
    const oldStyle = el.getAttribute('style');
    el.style.setProperty('display', 'none', 'important');
    if (!hiddenElements.find(elData => elData.el === el)) {
        logger.debug('Hiding due to:', reason, el);
        hiddenElements.push({
            oldStyle,
            el,
        });
        logger.debug({ hiddenElements });
    }
    requestUpdateBadge();
};

const unhideAll = () => {
    logger.debug('Unhidding items ', hiddenElements);
    hiddenElements.forEach(elData => {
        if (elData.oldStyle) {
            elData.el.setAttribute('style', elData.oldStyle);
        } else {
            elData.el.removeAttribute('style');
        }
    });
    chrome.runtime.sendMessage(null, { message: 'DISABLE_EXT', text: 'OFF' }, null, () => {});
};

chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'UNHIDE') {
        logger.debug('Unhiding');
        unhideAll();
    }
    return true;
});

