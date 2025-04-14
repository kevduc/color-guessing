import { FunctionComponent } from 'react';
import styles from './TutorialInfo.module.scss';

interface TutorialInfoProps {}

const TutorialInfo: FunctionComponent<TutorialInfoProps> = () => {
  return <span className={styles.pointer}>👆</span>;
};

export default TutorialInfo;
