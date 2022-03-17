function isPositionSymbol(num) {
  return num === 91 || num === 40 || num === 123 || num === 60
}

function isInverseNumber(a, b) {
  let valuemap = {
    91: 93,
    93: 91,
    40: 41,
    41: 40,
    123: 125,
    125: 123,
    60: 62,
    62: 60
  }
  return valuemap[a] === b
}

// 先知道正反向
// if 正 => push
// if 反 =>
//  isInverse last and current
//   if true => pop
//   else => over return current

export default function getAns10_2(newRows) {
  let eachRowRecord = []

  for (let p = 0; p < newRows.length; p++) {
    let row = newRows[p]
    let records = []

    for (let i = 0; i < row.length; i++) {
      let current = newRows[p][i]
      let last = records[records.length - 1]

      let isPositive = isPositionSymbol(current)
      if (isPositive) {
        records.push(current)
        continue
      }

      let isInverse = isInverseNumber(current, last)
      if (isInverse) {
        records.pop()
        continue
      } else {
        records = null
        break
      }
    }

    if (records !== null) {
      let reveresRecord = records.reverse()
      eachRowRecord.push(reveresRecord)
    }
  }

  let eachRowSumRecord = eachRowRecord.map(row => {
    let valueMap = {
      40: 1,
      91: 2,
      123: 3,
      60: 4
    }
    return row.reduce((acc, curr) => {
      return acc * 5 + valueMap[curr]
    }, 0)
  })

  // get middile number of an array
  let sortedEachRowSumRecord = eachRowSumRecord.sort((a, b) => a - b)
  let middle = Math.floor(sortedEachRowSumRecord.length / 2)
  let ans = sortedEachRowSumRecord[middle]

  return ans
}
