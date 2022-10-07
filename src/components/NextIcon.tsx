import { FunctionComponent } from 'react'
import styles from './NextIcon.module.scss'

interface NextIconProps {}

const NextIcon: FunctionComponent<NextIconProps> = () => {
  return <div className={styles['next-icon']}></div>
}

export default NextIcon
