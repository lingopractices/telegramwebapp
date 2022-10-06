import React from 'react';

import styles from './QuestionItem.module.scss';

interface IQuestionItemProps {
  label: string;
}

const QuestionItem: React.FC<IQuestionItemProps> = ({ label }) => (
  <li className={styles.container}>{label}</li>
);

export default React.memo(QuestionItem);
