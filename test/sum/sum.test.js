import fn from './index'
import { describe, it, expect } from 'vitest'

describe('測試sum', () => {
  it('1+1=2', () => {
    let result = fn(1, 1)
    let expectResult = 2
    expect(result).toBe(expectResult)
  })
})
