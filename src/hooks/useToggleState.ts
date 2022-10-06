import { useCallback, useState } from 'react';

function useToggledState(initialState: boolean): [boolean, () => void, () => void, () => void] {
  const [state, setState] = useState(initialState);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);
  const setTrue = useCallback(() => {
    setState(true);
  }, []);
  const toggleState = useCallback(() => setState((oldState) => !oldState), []);

  return [state, setTrue, setFalse, toggleState];
}
export default useToggledState;
