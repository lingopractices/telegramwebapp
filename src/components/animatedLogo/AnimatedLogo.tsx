import { ReactComponent as LingoInner } from '@assets/logo-inner.svg';
import { ReactComponent as LingoOuter } from '@assets/logo-outer.svg';

import styles from './AnimatedLogo.module.scss';

const AnimatedLogo: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <LingoOuter className={styles.outer} />
      <LingoInner className={styles.inner} />
    </div>
  </div>
);

export default AnimatedLogo;
