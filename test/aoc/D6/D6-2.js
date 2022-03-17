import { readFileSync } from 'fs'
let input = readFileSync(path.resolve(__dirname, './D6.txt'), 'utf8')
let fishes = input.split(',').map(Number)
console.log('fishes', fishes)
// Group 0
// Group 1
// Group 2
// Group 3
// Group 4
// Group 5
// Group 6

// Group 7
// Group 8

let createAllFishGroup = () => {
  return {
    0: { groupNumber: 0 },
    1: { groupNumber: 0 },
    2: { groupNumber: 0 },
    3: { groupNumber: 0 },
    4: { groupNumber: 0 },
    5: { groupNumber: 0 },
    6: { groupNumber: 0 },
    7: { groupNumber: 0 },
    8: { groupNumber: 0 }
  }
}

let allFishGroup = createAllFishGroup()

// group 的輪轉
// 1-8 的 往上一格
// 0的 將人數灌到6跟8

fishes.forEach(fish => {
  let group = allFishGroup[fish]
  group.groupNumber++
})

// console.log("allFishGroup", allFishGroup);

function dayPass() {
  let newFishGroup = createAllFishGroup()

  for (let i = 0; i < 9; i++) {
    if (i === 0) {
      newFishGroup[6].groupNumber += allFishGroup[i].groupNumber
      newFishGroup[8].groupNumber += allFishGroup[i].groupNumber
    } else {
      newFishGroup[i - 1].groupNumber += allFishGroup[i].groupNumber
    }
  }

  allFishGroup = newFishGroup
}

let day = 1
let endDay = 256

while (day <= endDay) {
  dayPass()
  day++
}

console.log('allFishGroup', allFishGroup)
let ans = 0
ans = Object.values(allFishGroup).reduce((acc, cur) => {
  return acc + cur.groupNumber
}, 0)

console.log('ans', ans)
