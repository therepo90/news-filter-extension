export const NODE_TYPE_EL = 1;
export const NODE_TYPE_TEXT = 3;

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const queryElement = (selector, root) => {
    return queryElements(selector, root)[0];
};
export const queryElements = (selector, root) => {
    if (root.querySelectorAll) {
        return root ? Array.prototype.slice.call(root.querySelectorAll(selector)) : [];
    } else {
        return []; //text, comments etc.
    }
};

export const toArray = nodes => Array.prototype.slice.call(nodes);

export const cleanText = text => text ?
    text.replace('\n', '')
    .replace('\r\n', '')
    .replace('\t', '').trim() : '';
