import { ReactComponent as LingoInner } from '@assets/logo-inner.svg';
import { ReactComponent as LingoOuter } from '@assets/logo-outer.svg';

import styles from './AnimatedLogo.module.scss';

const AnimatedLogo = () => (
  <div className={styles.container}>
    <LingoOuter className={styles.outer} />
    <LingoInner className={styles.inner} />
  </div>
);
export default AnimatedLogo;
