import { readFileSync } from 'fs'
let input = readFileSync(path.resolve(__dirname, './D5.txt'), 'utf8')

let splitWithBreakLine = input.split(/[\r\n]+/g)

let x = splitWithBreakLine.map(el => el.split(' '))

function getCordinate(p) {
  return p
    .split(',')
    .map(e => Number(e))
    .reduce(
      (acc, current, index) => {
        return index % 2 === 0
          ? { x: current, y: acc.y }
          : { x: acc.x, y: current }
      },
      { x: 0, y: 0 }
    )
}

let aTobArray = x.map(el => {
  let [p1, _, p2] = el
  let p1Cordinate = getCordinate(p1)

  let p2Cordinate = getCordinate(p2)
  return [p1Cordinate, p2Cordinate]
})

let boardLength = 1000
let boardMap = {}

console.log('boardLength', boardLength)

function createBoardMap() {
  let targetKey = ''
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      targetKey = `${i}-${j}`
      boardMap[targetKey] = 0
    }
  }
}

createBoardMap()
// console.log("boardMap", boardMap);

function draw() {
  aTobArray.forEach(el => {
    let startX = el[0].x
    let startY = el[0].y
    let endX = el[1].x
    let endY = el[1].y

    let isSameHorizontal = startY === endY
    let isSameVertical = startX === endX
    let isSameDiagonal = Math.abs(endX - startX) === Math.abs(endY - startY)

    let notSame = !(isSameHorizontal || isSameVertical || isSameDiagonal)
    let markCordinateKey = ''

    if (notSame) {
      return
    } else if (isSameHorizontal) {
      let diffHorizontalIndex = endX - startX
      for (
        let i = 0;
        diffHorizontalIndex >= 0
          ? i <= diffHorizontalIndex
          : i >= diffHorizontalIndex;
        diffHorizontalIndex >= 0 ? i++ : i--
      ) {
        markCordinateKey = `${startX + i}-${startY}`

        boardMap[markCordinateKey] += 1
      }
    } else if (isSameVertical) {
      let diffVerticalIndex = endY - startY

      for (
        let i = 0;
        diffVerticalIndex >= 0
          ? i <= diffVerticalIndex
          : i >= diffVerticalIndex;
        diffVerticalIndex >= 0 ? i++ : i--
      ) {
        markCordinateKey = `${startX}-${startY + i}`

        boardMap[markCordinateKey] += 1
      }
    } else if (isSameDiagonal) {
      let diffHorizontalIndex = endX - startX
      let diffVerticalIndex = endY - startY

      for (
        let i = 0, j = 0;
        diffHorizontalIndex >= 0
          ? i <= diffHorizontalIndex
          : i >= diffHorizontalIndex;
        diffHorizontalIndex >= 0 ? i++ : i--, diffVerticalIndex >= 0 ? j++ : j--
      ) {
        markCordinateKey = `${startX + i}-${startY + j}`

        boardMap[markCordinateKey] += 1
      }
    }
  })

  let ans = Object.values(boardMap).reduce((acc, current) => {
    return current > 1 ? acc + 1 : acc
  }, 0)
  console.log('ans', ans)
}

draw()
