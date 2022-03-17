export default function getAns7_2(positions) {
  positions = positions.sort((a, b) => a - b);
  function calcSteps(a, b) {
    let steps = Math.abs(b - a);
    steps = ((1 + steps) * steps) / 2;
    return steps;
  }

  function calcFuelConsume(positions, assumeX) {
    let fuelConsume = 0;

    fuelConsume = positions.reduce((acc, current) => {
      return acc + calcSteps(current, assumeX);
    }, 0);

    return fuelConsume;
  }

  let assumeX = Math.round(
    positions.reduce((acc, current) => {
      return acc + current;
    }, 0) / positions.length
  );

  let assumeXPlusOne = assumeX + 1;
  let assumeXMinusOne = assumeX - 1;

  let fuelConsumeCenter = calcFuelConsume(positions, assumeX);
  let fuelConsumePlusOne = calcFuelConsume(positions, assumeXPlusOne);
  let fuelConsumeMinusOne = calcFuelConsume(positions, assumeXMinusOne);



  let minium = Math.min(
    fuelConsumeMinusOne,
    fuelConsumeCenter,
    fuelConsumePlusOne
  );

  let ans = 0;

  if (minium === fuelConsumeCenter) {
    ans = fuelConsumeCenter;
  } else if (fuelConsumeMinusOne > fuelConsumePlusOne) {
    // 往右找
    let fuelConsume = calcFuelConsume(positions, assumeXPlusOne + 1);

    let minium = Math.min(fuelConsumePlusOne, fuelConsume);
    while (minium < fuelConsumePlusOne) {
      assumeXPlusOne++;
      fuelConsumePlusOne = minium;
      fuelConsume = calcFuelConsume(positions, assumeXPlusOne + 1);
      minium = Math.min(fuelConsumePlusOne, fuelConsume);
    }
    ans = minium;
  } else if (fuelConsumeMinusOne < fuelConsumePlusOne) {
    // 往左找

    let fuelConsume = calcFuelConsume(positions, assumeXMinusOne - 1);

    let minium = Math.min(fuelConsumeMinusOne, fuelConsume);
    while (minium < fuelConsumeMinusOne) {
      assumeXMinusOne--;
      fuelConsumeMinusOne = minium;
      fuelConsume = calcFuelConsume(positions, assumeXMinusOne - 1);
      minium = Math.min(fuelConsumeMinusOne, fuelConsume);
    }
    ans = minium;
  }

  return ans;

  // set assumeX equals 平均值的四捨五入
  // 列出assumeX-1 assumeX assumeX+1  => 找出最小標準差
  // if左勝，持續往左走直到沒數字or 標準差變大
  // if右勝，持續往右走直到沒數字or 標準差變大
  // if中勝，assumeX為point
}
