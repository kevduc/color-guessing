import { forwardRef, FunctionComponent } from 'react'
import styles from './ColorDisplay.module.scss'

interface ColorDisplayProps {
  color: string | null
  [key: string]: any
}

const ColorDisplay: FunctionComponent<ColorDisplayProps> = forwardRef<HTMLDivElement, ColorDisplayProps>(
  ({ color, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={styles.display} style={{ backgroundColor: color ?? 'transparent' }} {...rest}>
        {children}
      </div>
    )
  }
)

export default ColorDisplay
