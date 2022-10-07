import type { HexColor } from '@/utils'
import { FunctionComponent } from 'react'
import styles from './ColorButton.module.scss'

interface ColorButtonProps {
  onClick: (color: HexColor) => void
  color: HexColor
  revealed: boolean
  picked: boolean
  isAnswer: boolean
  [key: string]: any
}

const ColorButton: FunctionComponent<ColorButtonProps> = ({ onClick, color, revealed, picked, isAnswer, ...rest }) => {
  return (
    <button
      className={`${styles['color-button']} ${
        picked
          ? isAnswer
            ? styles['correct-answer']
            : styles['wrong-answer']
          : revealed
          ? isAnswer
            ? styles['unpicked-correct-answer']
            : ''
          : ''
      }`}
      style={revealed ? { backgroundColor: color } : undefined}
      onClick={(e) => onClick(color)}
      disabled={revealed}
      {...rest}>
      {color}
    </button>
  )
}

export default ColorButton
