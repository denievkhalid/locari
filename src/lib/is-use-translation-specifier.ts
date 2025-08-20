import * as t from '@babel/types'

/**
 * Checks if a given ImportSpecifier node imports `useTranslation`.
 *
 * @param {t.ImportSpecifier} specifier - The AST node to check.
 * @returns {boolean} True if the specifier imports `useTranslation`.
 */
export const isUseTranslationSpecifier = (specifier: t.ImportSpecifier): boolean =>
  t.isIdentifier(specifier.imported) && specifier.imported.name === 'useTranslation'
