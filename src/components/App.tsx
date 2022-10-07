import { CSSProperties, useEffect, useRef, useState } from 'react'
import styles from './App.module.scss'
import ColorDisplay from '@/components/ColorDisplay'
import ColorButton from '@/components/ColorButton'
import Score from '@/components/Score'
import NextButton from '@/components/NextButton'
import TutorialInfo from '@/components/TutorialInfo'

import type { HexColor } from '@/utils'
import { randomColors, randomInt } from '@/utils'

const AUTO_NEXT_TIMEOUT = 8000 // ms

function App() {
  const [colorChoices, setColorChoices] = useState<HexColor[] | null>(null)
  const [trueColorId, setTrueColorId] = useState<number | null>(null)

  const [userColorAnswer, setUserColorAnswer] = useState<HexColor | null>(null)
  const [score, setScore] = useState<number>(0)

  const [canGoToNextColorQuestion, setCanGoToNextColorQuestion] = useState(false)

  const colorDisplayRef = useRef<HTMLElement>(null)

  const trueColor = colorChoices !== null && trueColorId !== null ? colorChoices[trueColorId] : null
  const revealed = userColorAnswer !== null

  const getNumChoicesBasedOnScore = (score: number): number =>
    score === 0 ? 1 : score < 5 ? 2 : score < 20 ? 3 : Math.min(2 + Math.floor(score / 10), 8)

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
        colorDisplayRef.current?.removeEventListener<'click'>('click', nextColor)
        newColorQuestion(getNumChoicesBasedOnScore(newScore))
      }
      timeout = setTimeout(nextColor, AUTO_NEXT_TIMEOUT)
      colorDisplayRef.current?.addEventListener<'click'>('click', nextColor) // allow user to skip timeout
    }, 600)
  }

  return (
    <main className={styles.main}>
      <ColorDisplay ref={colorDisplayRef} color={trueColor}>
        <Score value={score} />
        {canGoToNextColorQuestion && <NextButton style={{ '--animation-length': `${AUTO_NEXT_TIMEOUT}ms` } as CSSProperties} />}
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
        {score === 0 && <TutorialInfo />}
      </div>
    </main>
  )
}

export default App
