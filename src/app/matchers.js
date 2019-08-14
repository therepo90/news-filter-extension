import { sadSentences } from './words';
import { cleanText } from './utils';

const allSentences = sadSentences;

const createWordsInOrderRegexp = sentences => {
    const regexpStr = sentences
        .map(sentenceChunks => {
            const regexpChunks = sentenceChunks.map(sentenceChunk => {
                return sentenceChunk.map(possibleWord => `(\\b${possibleWord})`).join('|');
            });
            return regexpChunks.map(chunk => `(${chunk})`).join('.+?');
        })
        .map(sentence => `(${sentence})`)
        .join('|');
    return new RegExp(regexpStr, 'gis'); // s option doesnt work
};

export const allSentencesRegexp = createWordsInOrderRegexp(allSentences);

export const allSentencesMatcher = text => {
    text = cleanText(text);
    const match = text.match(allSentencesRegexp);
    const multiMatches = match && text.split(' ').length > 5;
    return multiMatches;
};
