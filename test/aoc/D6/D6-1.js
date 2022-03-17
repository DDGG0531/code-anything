import { readFileSync } from "fs";
let input = readFileSync(path.resolve(__dirname, "./D6.txt"), "utf8");
let fishes = input.split(",").map(Number);
// 一隻魚的生命週期
// => 8 誕生 + 倒數9天生產
// => 7
// => 6
// => 5
// => 4
// => 3
// => 2
// => 1
// => 0
// => 6 生產 + 倒數7天生產
// => 5
// => 4
// => 3
// => 2
// => 1
// => 0
// => 6 生產 + 倒數7天生產

// 每一天開始，上帝會檢查每一隻魚，按照以下步驟給魚新的方向
// 白天指派方向，晚上生產
// 白天：每隻魚的待產時間 - 1， 若<0則重置為6，並生產
// 新生的魚，上帝直接給他較長的待產期8

// 讓每條魚 有自我意識，不用上帝每天指派方向，他們按照預設的方向去行動

class Fish {
  #newFishBCD;
  #oldFishBCD;

  constructor(originBCD) {
    this.#newFishBCD = 8;
    this.#oldFishBCD = 6;
    this.birthCountDown = originBCD ?? this.#newFishBCD;
  }

  dayPass() {
    this.birthCountDown--;
    if (this.birthCountDown < 0) {
      this.birthCountDown = this.#oldFishBCD;
      return { hasBaby: true, baby: this.haveABaby() };
    } else {
      return { hasBaby: false, baby: null };
    }
  }

  haveABaby() {
    return new Fish();
  }
}
// let fish = new Fish();
// console.log("Fish", fish);
// console.log("dayPass", fish.dayPass());

// 將第一批魚轉換成機械魚
let mFishes = fishes.map((fish) => new Fish(fish));

let day = 1;
let endDay = 80;

while (day <= endDay) {
  let newMFishes = [];
  mFishes.forEach((mfish) => {
    let { hasBaby, baby } = mfish.dayPass();
    hasBaby && newMFishes.push(baby);
  });

  mFishes = [...mFishes, ...newMFishes];
  day++;
}

console.log("ans", mFishes.length);
