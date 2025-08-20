type TryCatchFn<T> = () => T
type CatchFn<T> = (err: unknown) => T

/**
 * Executes a function and catches any errors, returning a fallback value if an error occurs.
 *
 * This utility simplifies try/catch patterns by handling errors and returning
 * a default value or performing alternative logic via the `onError` callback.
 *
 * @template T - The type of the value returned by `fn` and `onError`.
 * @param {() => T} fn - The function to execute.
 * @param {(err: unknown) => T} onError - The function to execute if `fn` throws an error.
 * @returns {T} The result of `fn`, or the result of `onError` if an error was thrown.
 */
export function tryCatch<T>(fn: TryCatchFn<T>, onError: CatchFn<T>): T {
  try {
    return fn()
  } catch (err) {
    return onError(err)
  }
}
