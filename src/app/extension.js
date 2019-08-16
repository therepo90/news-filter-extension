import { logger } from './logger';
import { cleanText, queryElements } from './utils';
import { allSentencesMatcher } from './matchers';
import { MSG_DISABLE_EXT, MSG_UNHIDE, MSG_UPDATE_BADGE } from './constants';

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
    const sponsoredElementsSelectorMain = `#itemsStream .diggbox > a > span`;
    const sponsoredElementsSelectorTop = `#dyingLinksBox .diggbox > a > span`;
    const sponsoredElements = queryElements(sponsoredElementsSelectorMain, root).concat(queryElements(sponsoredElementsSelectorTop, root));
    sponsoredElements.forEach(el => {
        if(cleanText(el.innerText) === 'S'){
            const node = findParentLink(el);
            if(node) {
                hideElement(node, 'Sponsored')
            }
        }
    });

};

const requestUpdateBadge = () => {
    chrome.runtime.sendMessage(null, { message: MSG_UPDATE_BADGE, text: String(hiddenElements.length) }, null, () => {});
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
    chrome.runtime.sendMessage(null, { message: MSG_DISABLE_EXT, text: 'OFF' }, null, () => {});
};

chrome.runtime.onMessage.addListener((request) => {
    if (request.message === MSG_UNHIDE) {
        logger.debug('Unhiding');
        unhideAll();
    }
    return true;
});

