const devMode = process.env.NODE_ENV === 'development';

export const logger = {

  debug(...args) {
    if(!devMode){
      return;
    }
    console.log(...args); // eslint-disable-line
  },
  log(...args) {
    console.log(...args); // eslint-disable-line
  },
  error(...args) {
    console.error(...defaultArgs,...args); // eslint-disable-line
  },
  warn(...args) {
    console.warn(...defaultArgs, ...args); // eslint-disable-line
  }
};
