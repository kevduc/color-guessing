import { useCallback, useEffect, useState } from 'react'
import styles from './App.module.scss'
import ColorDisplay from '@/components/ColorDisplay'
import ColorButton from '@/components/ColorButton'
import Score from '@/components/Score'

import type { HexColor } from '@/utils'
import { randomColors, randomInt } from '@/utils'

const NUM_CHOICES = 3

function App() {
  const [colorChoices, setColorChoices] = useState<HexColor[] | null>(null)
  const [trueColorId, setTrueColorId] = useState<number | null>(null)

  const [colorChoice, setColorChoice] = useState<HexColor | null>(null)
  const [score, setScore] = useState<number>(0)

  const trueColor = (colorChoices !== null && trueColorId !== null && colorChoices[trueColorId]) || null
  const revealed = colorChoice !== null

  const resetColors = () => {
    setColorChoice(null)
    setColorChoices(randomColors(NUM_CHOICES))
    setTrueColorId(randomInt(0, NUM_CHOICES - 1))
  }

  useEffect(resetColors, [])

  const handleColorButtonClick = useCallback(
    (color: HexColor) => {
      if (color === trueColor) setScore((score) => score + 1)
      setColorChoice(color)
      setTimeout(resetColors, 3000)
    },
    [trueColor]
  )

  return (
    <main className={styles.main}>
      <Score value={score} />
      <ColorDisplay color={trueColor} />
      <div className={styles.buttons}>
        {colorChoices &&
          colorChoices.map((color) => (
            <ColorButton
              onClick={handleColorButtonClick}
              color={color}
              key={color}
              revealed={revealed}
              picked={color === colorChoice}
              isAnswer={color === trueColor}
            />
          ))}
      </div>
    </main>
  )
}

export default App
