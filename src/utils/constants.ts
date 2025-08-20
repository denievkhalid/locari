import * as parser from '@babel/parser'

export const PARSE_SOURCE_TYPE: 'module' | 'script' = 'module'
export const PARSE_PLUGINS: parser.ParserPlugin[] = ['jsx', 'typescript']
