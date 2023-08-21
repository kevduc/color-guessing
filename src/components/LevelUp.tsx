import { FunctionComponent } from 'react'
import styles from './LevelUp.module.scss'

interface LevelUpProps {
  [key: string]: any
}

const LevelUp: FunctionComponent<LevelUpProps> = ({ ...rest }) => {
  return (
    <span className={styles['level-up']} {...rest}>
      Level Up!
    </span>
  )
}

export default LevelUp
