import * as parser from '@babel/parser'
import fs from 'fs'
import { PARSE_PLUGINS, PARSE_SOURCE_TYPE } from '../utils/constants'
import { tryCatch } from '../utils'

const { parse } = parser

const parseOptions = {
  sourceType: PARSE_SOURCE_TYPE,
  plugins: PARSE_PLUGINS,
}

/**
 * Reads a file and parses it into a Babel AST (Abstract Syntax Tree).
 *
 * If the file does not exist or parsing fails, it returns `null`.
 *
 * @param {string} file - The path to the file to parse.
 * @returns {ReturnType<typeof parser.parse> | null} The AST of the file, or `null` if an error occurred.
 */
export const getAstFromFile = (file: string): ReturnType<typeof parse> | null =>
  tryCatch(
    () => parse(fs.readFileSync(file, 'utf8'), parseOptions),
    () => null,
  )
