import { FunctionComponent } from 'react'
import styles from './NextButton.module.scss'

interface NextButtonProps {
  [key: string]: any
}

const NextButton: FunctionComponent<NextButtonProps> = ({ ...rest }) => {
  return (
    <button className={`${styles['next-button']}`} {...rest}>
      Next
    </button>
  )
}

export default NextButton
