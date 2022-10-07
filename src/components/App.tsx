import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import ColorDisplay from '@/components/ColorDisplay'
import ColorButton from '@/components/ColorButton'
import Score from '@/components/Score'
import NextIcon from '@/components/NextIcon'

import type { HexColor } from '@/utils'
import { randomColors, randomInt } from '@/utils'

function App() {
  const [colorChoices, setColorChoices] = useState<HexColor[] | null>(null)
  const [trueColorId, setTrueColorId] = useState<number | null>(null)

  const [userColorAnswer, setUserColorAnswer] = useState<HexColor | null>(null)
  const [score, setScore] = useState<number>(0)

  const [canGoToNextColorQuestion, setCanGoToNextColorQuestion] = useState(false)

  const trueColor = (colorChoices !== null && trueColorId !== null && colorChoices[trueColorId]) || null
  const revealed = userColorAnswer !== null

  const getNumChoicesBasedOnScore = (score: number): number => Math.min(2 + Math.floor(score / 10), 8)

  const newColorQuestion = (numChoices: number) => {
    setUserColorAnswer(null)
    setColorChoices(randomColors(numChoices))
    setTrueColorId(randomInt(0, numChoices - 1))
  }

  useEffect(() => newColorQuestion(getNumChoicesBasedOnScore(score)), [])

  useEffect(() => {
    const requestFullscreen = () => document.documentElement.requestFullscreen()
    document.addEventListener('dblclick', requestFullscreen)
    return () => {
      document.removeEventListener('dblclick', requestFullscreen)
    }
  }, [])

  const handleColorButtonClick = (color: HexColor) => {
    let newScore = score // to get updated numChoices for next question

    if (color === trueColor) {
      setScore((score) => score + 1)
      newScore++
    }

    setUserColorAnswer(color)

    // next color question after timeout
    setTimeout(() => {
      setCanGoToNextColorQuestion(true)
      let timeout: NodeJS.Timeout
      const nextColor = () => {
        clearTimeout(timeout)
        setCanGoToNextColorQuestion(false)
        document.removeEventListener<'click'>('click', nextColor)
        newColorQuestion(getNumChoicesBasedOnScore(newScore))
      }
      timeout = setTimeout(nextColor, 5000)
      document.addEventListener<'click'>('click', nextColor) // allow user to skip timeout
    }, 600)
  }

  return (
    <main className={styles.main}>
      <ColorDisplay color={trueColor}>
        <Score value={score} />
        {canGoToNextColorQuestion && <NextIcon />}
      </ColorDisplay>
      <div className={styles.buttons}>
        {colorChoices &&
          colorChoices.map((color) => (
            <ColorButton
              onClick={handleColorButtonClick}
              color={color}
              key={color}
              revealed={revealed}
              picked={color === userColorAnswer}
              isAnswer={color === trueColor}
            />
          ))}
      </div>
    </main>
  )
}

export default App
