import * as glob from 'glob'

/**
 * Recursively scans a directory and returns all JS/TS files.
 *
 * Uses glob patterns to match `.js`, `.jsx`, `.ts`, and `.tsx` files.
 * Ignores `node_modules` and `dist` directories by default.
 *
 * @param {string} dir - The root directory to scan.
 * @returns {string[]} An array of absolute file paths matching the patterns.
 */
export const scanDir = (dir: string): string[] =>
  glob.sync('**/*.{jsx,tsx}', {
    cwd: dir,
    absolute: true,
    ignore: ['node_modules/**', '**/dist/**'],
  })
