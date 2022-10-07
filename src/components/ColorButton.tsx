import type { HexColor } from '@/utils'
import { CSSProperties, FunctionComponent } from 'react'
import styles from './ColorButton.module.scss'

type ColorComponentsDisplay = 'hide-all-on-hover' | 'all-on-hover' | 'hide-individual-on-hover' | 'individual-on-hover' | 'none' 

interface ColorButtonProps {
  onClick: (color: HexColor) => void
  color: HexColor
  revealed: boolean
  picked: boolean
  isAnswer: boolean
  colorComponentsDisplay: ColorComponentsDisplay
  [key: string]: any
}

const ColorButton: FunctionComponent<ColorButtonProps> = ({
  onClick,
  color,
  revealed,
  picked,
  isAnswer,
  colorComponentsDisplay,
  ...rest
}) => {
  const colorComponents = color.match(/^#(\w\w)(\w\w)(\w\w)$/)?.slice(1, 4) ?? null

  if (colorComponents === null) throw new Error(`${color} is not an hex color!`)

  return (
    <button
      className={`button ${styles['color-button']} ${
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
      onClick={() => onClick(color)}
      disabled={revealed}
      {...rest}>
      #
      {colorComponents.map((component, i) => {
        const value = parseInt(component, 16)
        const rgbValues = [0, 0, 0]
        rgbValues[i] = 255
        return (
          <span
            className={`${styles['color-component']} ${styles[colorComponentsDisplay]}`}
            style={{ '--component-background-color': `rgba(${rgbValues.join(',')},${value / 255})` } as CSSProperties}>
            {component}
          </span>
        )
      })}
    </button>
  )
}

export default ColorButton
export type { ColorComponentsDisplay }
