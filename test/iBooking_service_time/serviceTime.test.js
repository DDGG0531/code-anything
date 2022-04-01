import A2D from './A2D.js'
import { describe, it, expect } from 'vitest'
import API_Cross_Day_1 from './API_Cross_Day_1.json'
import API_Cross_Day_2 from './API_Cross_Day_2.json'
import util from 'util'

describe('A2D', () => {
  it('週日晚上11點跨到週一早上2點', () => {
    let result = A2D(API_Cross_Day_1)
    let expectResult = {
      sunday: {
        times: [
          {
            startMinute: 1260,
            endMinute: 1620
          }
        ]
      },
      monday: {
        times: []
      },
      tuesday: {
        times: []
      },
      wednesday: {
        times: []
      },
      thursday: {
        times: []
      },
      friday: {
        times: []
      },
      saturday: {
        times: []
      }
    }

    console.log(util.inspect(result))

    expect(result).toEqual(expectResult)
  })

  it('週日晚上11點跨到週一下午1點', () => {
    let result = A2D(API_Cross_Day_2)
    let expectResult = {
      sunday: {
        times: [
          {
            startMinute: 1260,
            endMinute: 2160
          }
        ]
      },
      monday: {
        times: [
          {
            startMinute: 720,
            endMinute: 780
          }
        ]
      },
      tuesday: {
        times: []
      },
      wednesday: {
        times: []
      },
      thursday: {
        times: []
      },
      friday: {
        times: []
      },
      saturday: {
        times: []
      }
    }

    console.log(util.inspect(result))

    expect(result).toEqual(expectResult)
  })
})
