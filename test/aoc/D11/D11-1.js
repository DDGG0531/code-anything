// find adjacent cells in a grid
// 這個不包含對角線
function getAdjacent(grid, x, y) {
  let adjacent = []
  if (x > 0) adjacent.push(grid[y][x - 1])
  if (x < grid[y].length - 1) adjacent.push(grid[y][x + 1])
  if (y > 0) adjacent.push(grid[y - 1][x])
  if (y < grid.length - 1) adjacent.push(grid[y + 1][x])
  return adjacent
}

// find adjacent cells in a grid include diagonal
// 這個包含對角線
function getAdjacentIncludeDiagonal(grid, x, y) {
  let adjacent = []
  if (x > 0) adjacent.push(grid[y][x - 1])
  if (x < grid[y].length - 1) adjacent.push(grid[y][x + 1])
  if (y > 0) adjacent.push(grid[y - 1][x])
  if (y < grid.length - 1) adjacent.push(grid[y + 1][x])
  if (x > 0 && y > 0) adjacent.push(grid[y - 1][x - 1])
  if (x < grid[y].length - 1 && y > 0) adjacent.push(grid[y - 1][x + 1])
  if (x > 0 && y < grid.length - 1) adjacent.push(grid[y + 1][x - 1])
  if (x < grid[y].length - 1 && y < grid.length - 1)
    adjacent.push(grid[y + 1][x + 1])
  return adjacent
}

class octopuse {
  #flushed

  constructor(energy) {
    this.energy = energy
    this.#flushed = false
    this.neighbors = []
  }

  get startFlushed() {
    if (this.#flushed) return false
    if (this.energy < 10) return false
    this.#flushed = true
    return true
  }

  get flushed() {
    return this.#flushed
  }

  addEnergy(energy) {
    this.energy += energy
  }

  reset() {
    if (this.#flushed) {
      this.energy = 0
    }
    this.#flushed = false
  }
}

function addNeighborsToOctopuse(octopuseGrid) {
  // loop through octopuseGrid
  octopuseGrid.forEach((row, y) => {
    row.forEach((octopuse, x) => {
      octopuse.neighbors = getAdjacentIncludeDiagonal(octopuseGrid, x, y)
    })
  })
}

function addEnergyToEveryOctopuses(octopuseGrid) {
  octopuseGrid.forEach((row, y) => {
    row.forEach((octopuse, x) => {
      octopuse.addEnergy(1)
    })
  })
}

function findStarFlushedOctopuses(octopuseGrid) {
  let octopuses = octopuseGrid.flat()
  return octopuses.filter(octo => octo.startFlushed)
}

function addEnergyToNeighbor(someOctopuses) {
  someOctopuses.forEach(octo => {
    let neighbors = octo.neighbors
    neighbors.forEach(neighbor => neighbor.addEnergy(1))
  })
}

function stepOver(octopuseGrid) {
  let flushedCount = 0
  let octopuses = octopuseGrid.flat()
  octopuses.forEach(octo => {
    if (octo.flushed) {
      flushedCount++
      octo.reset()
    }
  })
  return flushedCount
}

export default function getAns11_1(grid, steps) {
  let ans = 0
  let octopuseGrid = grid.map(row => row.map(e => new octopuse(e)))
  // mutate octopuseGrid
  addNeighborsToOctopuse(octopuseGrid)

  // start step
  while (steps !== 0) {
    addEnergyToEveryOctopuses(octopuseGrid)
    let someOctopuses = findStarFlushedOctopuses(octopuseGrid)

    while (someOctopuses.length !== 0) {
      addEnergyToNeighbor(someOctopuses)
      someOctopuses = findStarFlushedOctopuses(octopuseGrid)
    }

    let flushedCount = stepOver(octopuseGrid)
    ans += flushedCount
    steps--
  }

  return ans
}
