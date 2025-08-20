import traverse, { NodePath } from '@babel/traverse'
import * as t from '@babel/types'
import { forOf, getAstFromFile, isUseTranslationSpecifier } from '../utils'

/**
 * Ensures that a given file imports `useTranslation` from `react-i18next`.
 *
 * The function parses the file into a Babel AST, traverses its import declarations,
 * and checks if `useTranslation` is already imported. It does **not** modify the file.
 *
 * @param {string} file - The path to the file to check.
 * @returns {boolean} `true` if `useTranslation` is imported, `false` otherwise.
 */
export const ensureUseTranslationImport = (file: string): boolean => {
  let hasImport: boolean = false

  const ast = getAstFromFile(file)

  if (!ast) return false

  traverse(ast, {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
      const source = path.node.source.value

      if (source === 'react-i18next') {
        const specifiers = path.node.specifiers as t.ImportSpecifier[]

        forOf(specifiers, (specifier) => {
          if (isUseTranslationSpecifier(specifier)) {
            hasImport = true
            path.stop()
          }
        })
      }
    },
  })

  return hasImport
}
