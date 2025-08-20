import fs from 'fs'
import { scanDir } from '../utils'
import { extractTextLiterals } from './extract-text-literals'

export const generateLangFile = (projectDir: string, outputFile: string) => {
  const files = scanDir(projectDir)
  const phrases: Record<string, string> = {}

  files.forEach((file) => {
    const literals = extractTextLiterals(file)
    literals.forEach((text) => {
      if (!phrases[text]) phrases[text] = text
    })
  })

  fs.writeFileSync(outputFile, JSON.stringify(phrases, null, 2), 'utf8')
}
