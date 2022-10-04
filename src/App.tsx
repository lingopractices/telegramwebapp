import { useEffect } from 'react';

import SignWithGoogle from '@components/SignWithGoogle/SignWithGoogle';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from 'store/profile/actions';
import { getProfileDataSelector } from 'store/profile/selectors';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const profileData = useSelector(getProfileDataSelector);

  return (
    <div>
      <pre>{JSON.stringify(profileData)}</pre>
      <SignWithGoogle />
    </div>
  );
};

export default App;
