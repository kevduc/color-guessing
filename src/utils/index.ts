const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

type HexColor = `#${string}`

const randomColor = (): HexColor =>
  `#${Math.floor(Math.random() * 2 ** 24)
    .toString(16)
    .padStart(6, '0')}`

const randomColors = (numColors: number) => new Array(numColors).fill(null).map(() => randomColor())

const clamp = (min: number, x: number, max: number) => Math.max(min, Math.min(x, max))

export { randomColor, randomColors, randomInt, clamp }
export type { HexColor }