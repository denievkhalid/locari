/**
 * Iterates over an array and executes a callback for each item.
 *
 * @template T - The type of items in the array.
 * @param {T[]} items - The array of items to iterate over.
 * @param {(item: T) => void} callback - Function to execute for each item.
 */
export const forOf = <T>(items: T[], callback: (item: T) => void) => {
  for (const item of items) {
    callback(item)
  }
}
