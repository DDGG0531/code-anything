import { readFileSync } from 'fs'
let input = readFileSync(path.resolve(__dirname, './D4.txt'), 'utf8')

let splitWithBreakLine = input.split(/[\r\n]+/g)

let [markedNumbersWithComma, ...leftArr] = splitWithBreakLine

// 賓果的每個彩球
let markedNumbers = markedNumbersWithComma.split(',').map(Number)

// 每張棋盤
let boards = leftArr.reduce((acc, currentValue, currentIndex, array) => {
  let order = Math.floor(currentIndex / 5)
  // currentValue is '22 13 17 11  0'
  // row => [22, 13, 17, 11, 0]

  // get regex of string in string
  let regex = /\s+/g
  let row = currentValue
    .trim()
    .split(regex)
    .map(value => ({ value: Number(value), checked: false }))
  acc[order] ? acc[order].push(...row) : (acc[order] = row)
  return acc
}, [])

// console.log("boards", boards);

let bingo = []

// board

// 1. 找到number在board的index
// : return index
// : mutate board
function searchIndexFromBoard(board, targetNumber) {
  return board.map(el => el.value).findIndex(value => targetNumber === value)
}

// 2. 改變該index的checked屬性
// : return { didMutate: boolean, mutateIndex: number }
// : mutate board
function muateteChecked(board, targetIndex) {
  if (targetIndex !== -1) {
    board[targetIndex].checked = true
    return {
      didMutate: true,
      mutateIndex: targetIndex
    }
  } else {
    return {
      didMutate: false,
      mutateIndex: targetIndex
    }
  }
}

// 3. 檢查board是否bingo，只檢查與該index有關的
// : return bingo or not
function checkedBingo(board, targetIndex, indexInBoards) {
  // ...
  // 一行五(n)個
  // 如果targetIndex = 0
  // 檢查row: 0,0+1,0+2,0+3,0+4
  // 檢查col: 0,0+n, 0+2n,0+3n,0+4n

  // 0 1 2 3 4
  // 5 6 7 8 9

  // 如果targetIndex = 6
  // 檢查row: 0,0+1,0+2,0+3,0+4
  // 檢查col: 0,0+n, 0+2n,0+3n,0+4n

  if (targetIndex === -1) {
    return false
  }

  let rowToCheck = [] // 0,2,3
  let colToCheck = []
  let startIndex = targetIndex // 6
  let diffColIndex = startIndex % 5
  let diffRowIndex = Math.floor(startIndex / 5)
  for (let i = 0; i < 5; i++) {
    let currentRowIndex = startIndex + (i - diffColIndex)
    rowToCheck.push(currentRowIndex)
    let currentColIndex = startIndex + (i - diffRowIndex) * 5
    colToCheck.push(currentColIndex)
  }

  let rowAllChecked = board
    .filter((_, index) => rowToCheck.includes(index))
    .every(({ checked }) => checked)
  let colAllChecked = board
    .filter((_, index) => colToCheck.includes(index))
    .every(({ checked }) => checked)

  let isBingo = rowAllChecked || colAllChecked

  if (isBingo) {
    bingo.push({ board, index: indexInBoards })
    let value = 0
    let mltiValue1 = board[targetIndex].value
    let mltiValue2 = board.reduce((acc, current, index) => {
      return current.checked ? acc : acc + current.value
    }, 0)

    value = mltiValue1 * mltiValue2
    // console.log('mltiValue1', mltiValue1)
    // console.log('mltiValue2', mltiValue2)
    console.log('bingo value', value)
  }

  return isBingo
}

for (let i = 0; i < markedNumbers.length; i++) {
  // if (bingo) {
  //   console.log('bingo', bingo)
  //   break; }

  if (bingo.length) {
    let indexInBingo = bingo.map(el => el.index)
    console.log('indexInBingo', indexInBingo)
    boards = boards.filter((board, index) => {
      return !indexInBingo.includes(index)
    })
    console.log('object', boards.length)
    if (boards.length === 0) {
      console.log('final win', bingo[0])
      break
    }
    bingo = []
  }

  let number = markedNumbers[i]

  for (let j = 0; j < boards.length; j++) {
    let board = boards[j]
    let index = searchIndexFromBoard(board, number)

    if (index !== -1) {
      let { didMutate, mutateIndex } = muateteChecked(board, index)
      if (didMutate) {
        let result = checkedBingo(board, mutateIndex, j)
      }
    }
  }
}
