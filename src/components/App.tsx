import { useEffect, useRef, useState } from 'react'

import type { HexColor } from '@/utils'
import { randomColors, randomInt } from '@/utils'

import styles from './App.module.scss'
import ColorDisplay from '@/components/ColorDisplay'
import type { ColorComponentsDisplay } from '@/components/ColorButton'
import ColorButton from '@/components/ColorButton'
import Score from '@/components/Score'
import NextButton from '@/components/NextButton'
import TutorialInfo from '@/components/TutorialInfo'
import LevelUp from '@/components/LevelUp'

function App() {
  const [colorChoices, setColorChoices] = useState<HexColor[] | null>(null)
  const [trueColorId, setTrueColorId] = useState<number | null>(null)

  const [userColorAnswer, setUserColorAnswer] = useState<HexColor | null>(null)
  const [score, setScore] = useState<number>(0)
  const [previousScore, setPreviousScore] = useState<number>(-1)

  const [canGoToNextColorQuestion, setCanGoToNextColorQuestion] = useState<boolean>(false)
  const [isLevelUpAnimationDone, setIsLevelUpAnimationDone] = useState<boolean>(true)

  const colorDisplayRef = useRef<HTMLElement>(null)

  const hasClickedAnAnswer = userColorAnswer !== null
  const trueColor = colorChoices !== null && trueColorId !== null ? colorChoices[trueColorId] : null
  const revealed = hasClickedAnAnswer

  const isLevelUp = (score: number, previousScore: number): boolean =>
    score > previousScore && score > 0 && score !== 10 && score % 5 === 0
  const getNumChoicesBasedOnScore = (score: number): number =>
    score < 5 ? 2 : score < 20 ? 3 : Math.min(2 + Math.floor(score / 10), 8)
  const getColorComponentsDisplayBasedOnScore = (score: number): ColorComponentsDisplay =>
    score < 15 ? 'always' : score < 25 ? 'all-on-hover' : score < 35 ? 'individual-on-hover' : 'none' // TODO: update to include new modes e.g. "show-random-2"
  // TODO: extract levels to json file
  // TODO: add animated "Level Up! ⬆" when difficulty changes (on phone only?)
  // TODO: add instructions when behavior changes (e.g. on tactile: long press on button to reveal colors)
  // TODO: add sound effects

  const [colorComponentsDisplay, setColorComponentsDisplay] = useState<ColorComponentsDisplay>(
    getColorComponentsDisplayBasedOnScore(score)
  )

  const newColorQuestion = (numChoices: number) => {
    setUserColorAnswer(null)
    setColorChoices(randomColors(numChoices))
    setTrueColorId(score === 0 ? 1 : randomInt(0, numChoices - 1))
  }

  useEffect(() => newColorQuestion(getNumChoicesBasedOnScore(score)), [])

  useEffect(() => {
    const requestFullscreen = () => document.documentElement.requestFullscreen()
    document.addEventListener('dblclick', requestFullscreen)
    return () => {
      document.removeEventListener('dblclick', requestFullscreen)
    }
  }, [])

  useEffect(() => {
    if (!isLevelUpAnimationDone) {
      setTimeout(() => {
        setIsLevelUpAnimationDone(true)
      }, 2500)
    }
  }, [isLevelUpAnimationDone])

  const handleColorButtonClick = (color: HexColor) => {
    let newScore = score // to get updated numChoices for next question
    const newPreviousScore = score

    setPreviousScore(score)

    if (color === trueColor) {
      newScore++
      setScore((score) => score + 1)
    }

    setUserColorAnswer(color)

    // allow next color question after timeout
    setTimeout(() => {
      setCanGoToNextColorQuestion(true)
      const nextColor = () => {
        setCanGoToNextColorQuestion(false)
        colorDisplayRef.current?.removeEventListener<'click'>('click', nextColor)
        setColorComponentsDisplay(getColorComponentsDisplayBasedOnScore(newScore))
        newColorQuestion(getNumChoicesBasedOnScore(newScore))
        if (isLevelUp(newScore, newPreviousScore)) setIsLevelUpAnimationDone(false)
      }
      colorDisplayRef.current?.addEventListener<'click'>('click', nextColor)
    }, 600)
  }

  return (
    <main className={styles.main}>
      <ColorDisplay ref={colorDisplayRef} color={trueColor}>
        {isLevelUp(score, previousScore) && !hasClickedAnAnswer && <LevelUp />}
        <Score value={score} />
        {canGoToNextColorQuestion && <NextButton />}
      </ColorDisplay>
      <div className={styles.buttons}>
        {colorChoices &&
          isLevelUpAnimationDone &&
          colorChoices.map((color) => (
            <ColorButton
              onClick={handleColorButtonClick}
              color={color}
              key={color}
              revealed={revealed}
              picked={color === userColorAnswer}
              isAnswer={color === trueColor}
              colorComponentsDisplay={colorComponentsDisplay}
            />
          ))}
        {score === 0 && !hasClickedAnAnswer && <TutorialInfo />}
      </div>
    </main>
  )
}

export default App
