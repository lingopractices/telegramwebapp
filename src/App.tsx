import { useMemo } from 'react';

import MainRouter from 'routing/routers/MainRouter';
import { getProfileAction } from 'store/profile/actions';
import { getProfileDataSelector } from 'store/profile/selectors';
import 'base.scss';
import './dayjs/day';

const App = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return <div>{routing}</div>;
};

export default App;
