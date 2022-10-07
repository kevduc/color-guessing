import { FunctionComponent, useEffect, useRef } from 'react'
import styles from './Score.module.scss'

interface ScoreProps {
  value: number
}

const Score: FunctionComponent<ScoreProps> = ({ value }) => {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (value === 0) return

    spanRef.current?.animate(
      {
        scale: [1, 1.5, 1],
      },
      { duration: 400, easing: 'ease-in-out' }
    )
  }, [value])

  return (
    <span ref={spanRef} className={styles.score}>
      {value}
    </span>
  )
}

export default Score
