import { useEffect, useMemo } from 'react';

import 'base.scss';
import './dayjs/day';
import './localization/i18n';
import AnimatedLogo from '@components/animatedLogo/AnimatedLogo';
import { isAuthenticatedSelector } from '@store/auth/selectors';
import { AppInit } from '@store/initiation/features/app-init/app-init';
import { useDispatch, useSelector } from 'react-redux';
import MainRouter from 'routing/routers/MainRouter';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const routing = useMemo(() => <MainRouter />, []);

  useEffect(() => {
    dispatch(AppInit.action());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <AnimatedLogo />;
  }

  return routing;
};

export default App;
