const range = (min, max) => Array.from(
  { length: max },
  (_, i) => i + min
)

const randomInt = (min, max) => Math.floor(
  (Math.random() * max) + min
)

const randomArrayItem = (arr) => arr[
  arr.length * Math.random() | 0
]

const sum = (arr) => arr.reduce(
  (total, current) => total + current, 0
)

const randomSum = (arr, min, max) => {
  if (arr.length === 1) return arr[0]

  const sumSet = new Set()
  sumSet.add(sum(arr))

  for (const item of arr) {
    sumSet.add(item)
    const otherItems = arr.filter(i => i !== item)
    sumSet.add(sum(otherItems))
    for (const other of otherItems) {
      sumSet.add(item + other)
    }
  }

  const sumArray = Array.from(sumSet.values())

  return randomArrayItem(
    !!min && !!max
      ? sumArray.filter(v => v >= min && v <= max)
      : sumArray
  )
}

export {
  range,
  randomInt,
  randomArrayItem,
  sum,
  randomSum
}
