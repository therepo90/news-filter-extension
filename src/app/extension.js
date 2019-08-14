import { logger } from './logger';

export const packageName = 'Bad news filter';
const hiddenElements = [];

export const runExtension = async () => {
    logger.log(`%c${packageName} %cextension running`, 'color: orange;font-size:16px;', 'color:black;');

    // wait for some root element
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
};

const unhideAll = () => {
    logger.debug('Unhidding items ', hiddenElements); // won't undo html overflows
    disconnect();
    hiddenElements.forEach(elData => {
        if (elData.oldStyle) {
            elData.el.setAttribute('style', elData.oldStyle);
        } else {
            elData.el.removeAttribute('style');
        }
    });
    const debugNode = document.querySelector('#rg-styles');
    debugNode && debugNode.remove(); // only at top window
};
