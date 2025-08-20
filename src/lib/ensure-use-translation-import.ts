import traverse, { NodePath } from '@babel/traverse'
import * as t from '@babel/types'
import { forOf, getAstFromFile, isUseTranslationSpecifier } from '../utils'

export const ensureUseTranslationImport = (file: string) => {
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
