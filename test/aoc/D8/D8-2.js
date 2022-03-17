export default function getAns8_2(rows) {
  const orderNumberMap = {
    "abcefg": 0,
    "cf": 1,
    "acdeg": 2,
    "acdfg": 3,
    "bcdf": 4,
    "abdfg": 5,
    "abdefg": 6,
    "acf": 7,
    "abcdefg": 8,
    "abcdfg": 9
  }

  let ans = 0

  const totalNumberStores = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function filterWithLengthHOC(arr) {
    return function (length) {
      return arr.filter(str => str.length === length)[0]
    }
  }

  // 參數: 
  // str: "gf"
  // map:origin符號參考表charterMap
  // removes:['a', 'b', 'c'] 原始符號
  // return a chrater
  function findTransformedByRemoveOrigins(str, map, removes) {
    let removesT = removes.map(remove => map[remove])
    let arr = str.split("")
    let [chrater] = arr.filter(el => !removesT.includes(el))
    return chrater
  }


  rows.forEach(row => {
    let charterMap = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: ""
    }



    // 步驟1:找出每個字母的出現次數
    let { exampleArr, testArr } = row
    let eachCharaterCount = exampleArr.reduce((acc, current) => {
      let charaters = current.split("");
      charaters.forEach(charater => acc[charater] = acc[charater] + 1);
      return acc;
    }, { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 })



    // 步驟2: 得到b、e、f 被轉成什麼
    let e = getKeyByValue(eachCharaterCount, 4);
    let b = getKeyByValue(eachCharaterCount, 6);
    let f = getKeyByValue(eachCharaterCount, 9);
    charterMap['b'] = b;
    charterMap['e'] = e;
    charterMap['f'] = f;

    let filterWithLength = filterWithLengthHOC(exampleArr)


    // 步驟3.1:找長度為2(唯一)
    // 步驟3.2:得到c 被轉成什麼

    // filterWithLength的回傳值，找出 f被轉成的符號，去掉他，就是c被轉成的符號
    let c = findTransformedByRemoveOrigins(filterWithLength(2), charterMap, ['f']);
    charterMap['c'] = c;

    // 步驟3.3:找長度為3(唯一)
    // 步驟3.4:得到a 被轉成什麼

    let a = findTransformedByRemoveOrigins(filterWithLength(3), charterMap, ['c', 'f']);
    charterMap['a'] = a;

    // 步驟3.5:找長度為4(唯一)
    // 步驟3.6:得到d 被轉成什麼
    let d = findTransformedByRemoveOrigins(filterWithLength(4), charterMap, ['b', 'c', 'f']);
    charterMap['d'] = d;

    // 步驟3.7:剩下g，直接得到g 被轉成什麼
    let g = findTransformedByRemoveOrigins(filterWithLength(7), charterMap, ['a', 'b', 'c', 'd', 'e', 'f']);
    charterMap['g'] = g;


    // 步驟4:將左側的符號 轉成數字Map (Ignor)

    let charterMapInverse = Object.keys(charterMap).reduce((acc, currentKey) => {
      let currentValue = charterMap[currentKey]
      acc[currentValue] = currentKey
      return acc
    }, {})

    // 步驟5: 用數字Map將右側的符號轉數字
    let rowNumber = testArr.reduce(
      (acc, str, index) => {
        let sortedStr = str.split("").map(el => charterMapInverse[el]).sort().join("")
        let value = orderNumberMap[sortedStr]

        let thisValue = value * Math.pow(10, 3 - index)
        return acc + thisValue
      }
      , 0)
    ans += rowNumber

  })



  return ans


}