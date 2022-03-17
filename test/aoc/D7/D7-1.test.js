import fn from './D7-1.js'
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

describe('7-1', () => {
  it('7-1 main', () => {
    let input = readFileSync(path.resolve(__dirname, './D7.txt'), 'utf8')
    let positions = input.split(',').map(Number)

    expect(fn(positions)).toBe(355989)
  })
})
