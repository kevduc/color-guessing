import { FunctionComponent } from 'react'
import styles from './Score.module.scss'

interface ScoreProps {
  value: number
}

const Score: FunctionComponent<ScoreProps> = ({ value }) => {
  return <span className={styles.score}>{value}</span>
}

export default Score
