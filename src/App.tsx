import React from 'react';

import SignWithGoogle from '@components/SignWithGoogle/SignWithGoogle';
import { ITopic } from 'lingopractices-models';


const exampleTopic: ITopic = {
  id: 1,
  name: '2',
  questions: [],
};

console.warn(exampleTopic);

const App = () => (
  <div>
    <SignWithGoogle />
  </div>
);

export default App;
