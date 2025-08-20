import { writeFileSync } from 'fs'
import { extractTextLiterals } from './extract-text-literals'
import { forOf, scanDir } from '../utils'
import type { Phrase } from './types'

/**
 * Scans a project directory for text literals and generates a language file.
 *
 * This function recursively collects all JavaScript/TypeScript/JSX/TSX files,
 * extracts string literals from them, and writes a JSON file where each
 * string literal maps to itself. Useful for initializing i18n language files.
 *
 * @param {string} projectDir - The root directory of the project to scan.
 * @param {string} outputFile - The path to the output JSON file to generate.
 */
export const generateLangFile = (projectDir: string, outputFile: string) => {
  const files = scanDir(projectDir)

  const phrases: Phrase = {}

  forOf(files, (file) => {
    const literals = extractTextLiterals(file)

    forOf(literals, (literal) => {
      if (!phrases[literal]) {
        phrases[literal] = literal
      }
    })
  })

  writeFileSync(outputFile, JSON.stringify(phrases, null, 2), 'utf8')
}
