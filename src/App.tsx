import { useMemo } from 'react';

import 'base.scss';
import './dayjs/day';
import MainRouter from 'routing/routers/MainRouter';

const App = () => {
  const routing = useMemo(() => <MainRouter />, []);

  return <div>{routing}</div>;
};

export default App;
