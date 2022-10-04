import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import MainRouter from 'routing/routers/MainRouter';
import { getProfileAction } from 'store/profile/actions';
import { getProfileDataSelector } from 'store/profile/selectors';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const profileData = useSelector(getProfileDataSelector);

  const routing = useMemo(() => <MainRouter />, []);

  return (
    <div>
      <div>{routing}</div>
    </div>
  );
};

export default App;
