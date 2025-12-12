export const toEm = (px) => `${px / 16}em`;

export const throttle = (callback, delay = 300) => {
  let throttled = false;
  let savedArgs = null;

  const processPending = () => {
    if (savedArgs == null) {
      throttled = false;
    } else {
      callback(...savedArgs);
      savedArgs = null;
      setTimeout(processPending, delay);
    }
  };

  return (...args) => {
    if (throttled) {
      savedArgs = args;
      return;
    }

    callback(...args);
    throttled = true;

    setTimeout(processPending, delay);
  };
};
