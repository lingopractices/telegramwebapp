import { useEffect, useMemo, lazy, Suspense } from 'react';

import 'base.scss';
import './dayjs/day';
import './localization/i18n';
import { isAuthenticatedSelector } from '@store/auth/selectors';
import { AppInit } from '@store/initiation/features/app-init/app-init';
import { useDispatch, useSelector } from 'react-redux';
import LogoScreen from 'screens/logo/LogoScreen';

const MainRouter = lazy(async () => {
  await Promise.all([
    import('@store/initiation/sagas'),
    import('@store/auth/module'),
    import('@store/languages/module'),
    import('@store/meetings/module'),
    import('@store/profile/module'),
    import('@store/topics/module'),
  ]);

  return import('routing/routers/MainRouter');
});

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const routing = useMemo(() => <MainRouter />, []);

  useEffect(() => {
    dispatch(AppInit.action());
  }, [dispatch]);

  return <Suspense fallback={<LogoScreen />}>{isAuthenticated && routing}</Suspense>;
};

export default App;
