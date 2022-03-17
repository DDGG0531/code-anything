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

function calcErrorSum(errors) {
  // error is a number

  let valueMap = {
    41: 3,
    93: 57,
    125: 1197,
    62: 25137
  }
  return errors.reduce((acc, curr) => {
    return acc + valueMap[curr]
  }, 0)
}

// 先知道正反向
// if 正 => push
// if 反 =>
//  isInverse last and current
//   if true => pop
//   else => over return current

export default function getAns10_1(newRows) {
  let errorNumbers = []

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
        errorNumbers.push(current)
        break
      }
    }
  }

  let ans = calcErrorSum(errorNumbers)

  return ans
}
