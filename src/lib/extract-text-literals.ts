import traverse, { NodePath } from '@babel/traverse'
import * as t from '@babel/types'
import { getAstFromFile } from './get-ast-from-file'

/**
 * Extracts all text literals from a JSX/TSX file.
 *
 * It collects:
 * - JSXText nodes (`<div>Hello</div>`)
 * - String literals in JSX attributes (`title="Hello"`)
 * - Template literals in JSX expressions (`{`Hello ${name}`}`)
 *
 * @param {string} file - Path to the JSX/TSX file
 * @returns {string[]} Array of extracted text literals
 */
export const extractTextLiterals = (file: string): string[] => {
  const ast = getAstFromFile(file)

  if (!ast) return []

  const literals: string[] = []

  traverse(ast, {
    JSXText(path: NodePath<t.JSXText>) {
      const text = path.node.value.trim()

      if (text) {
        literals.push(text)
      }
    },
    JSXAttribute(path: NodePath<t.JSXAttribute>) {
      const value = path.node.value

      if (t.isStringLiteral(value)) {
        literals.push(value.value)
      } else if (t.isJSXExpressionContainer(value) && t.isTemplateLiteral(value.expression)) {
        value.expression.quasis.forEach((quasi) => {
          const trimmed = quasi.value.raw.trim()

          if (trimmed) {
            literals.push(trimmed)
          }
        })
      }
    },
    StringLiteral(path: NodePath<t.StringLiteral>) {
      if (!path.parentPath.isImportDeclaration()) {
        literals.push(path.node.value)
      }
    },
  })

  return literals
}
