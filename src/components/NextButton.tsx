import { FunctionComponent } from 'react'
import styles from './NextButton.module.scss'

interface NextButtonProps {}

const NextButton: FunctionComponent<NextButtonProps> = () => {
  return <a className={`${styles['next-button']}`}>Next</a>
}

export default NextButton
