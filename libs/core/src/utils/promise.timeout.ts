/**
 * An errors which gets raised when the timeout
 * exceeded
 *
 * @internal
 */
export class TimeoutError extends Error {}

/**
 * Executes a promise in the given timeout. If the promise
 * does not finish in the given timeout, it will
 * raise a TimeoutError
 *
 * @param {number} ms The timeout in milliseconds
 * @param {Promise<any>} promise The promise which should get executed
 *
 * @internal
 */
export const promiseTimeout = function (
  ms: number,
  promise: Promise<any>
): Promise<any> {
  let timer: NodeJS.Timeout;
  return Promise.race([
    promise,
    new Promise(
      (_, reject) =>
        (timer = setTimeout(
          () => reject(new TimeoutError(`Timed out in ${ms}ms.`)),
          ms
        ))
    ),
  ]).finally(() => clearTimeout(timer));
};

const defaultKey = 'default';
// eslint-disable-next-line @typescript-eslint/ban-types
export function memoize(fn: Function) {
  const cache = {};
  return (...args) => {
    const n = args[0] || defaultKey;
    if (n in cache) {
      return cache[n];
    }
    const result = fn(n === defaultKey ? undefined : n);
    cache[n] = result;
    return result;
  };
}

export const isNullish = (value: unknown): value is undefined | null =>
  value === undefined || value === null;
