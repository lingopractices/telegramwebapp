import { Suspense, useMemo } from 'react';

import 'base.scss';
import './dayjs/day';
import './localization/i18n';
import AnimatedLogo from '@components/animatedLogo/AnimatedLogo';
import MainRouter from 'routing/routers/MainRouter';

const App = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return <Suspense fallback={<AnimatedLogo />}>{routing}</Suspense>;
};

export default App;
