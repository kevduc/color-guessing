import { FunctionComponent } from 'react'
import styles from './ColorDisplay.module.scss'

interface ColorDisplayProps {
  color: string | null
  [key: string]: any
}

const ColorDisplay: FunctionComponent<ColorDisplayProps> = ({ color, ...rest }) => {
  return <div className={styles.display} style={{ backgroundColor: color ?? 'transparent' }} {...rest}></div>
}

export default ColorDisplay
