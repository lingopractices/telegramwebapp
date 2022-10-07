import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as DownArrow } from '@assets/icons/down-arrow.svg';
import { ReactComponent as UpArrow } from '@assets/icons/up-arrow.svg';
import QuestionItem from '@components/QuestionItem/QuestionItem';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import useToggledState from 'hooks/useToggleState';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'routing/routing.constants';

import styles from './MeetingInfo.module.scss';

const MeetingInfo = () => {
  const [date, setDate] = useState('12.36.123');
  const [topic, setTopic] = useState('Art');
  const [participantCount, setParticipantCount] = useState(2);
  const [questions, setQuestions] = useState(['asd1', 'asd2', 'asd3']);

  const [isOpenQuestions, , , toggleOpenQuestions] = useToggledState(false);

  const navigate = useNavigate();

  const { setBackButtonOnClick } = useTgBackButton(true);

  const { setMainButtonOnClick } = useTgMainButton(true, true, 'SUBMIT');

  const handleBack = useCallback(() => {
    navigate(MAIN_PATH);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(MAIN_PATH);
  }, [navigate]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  useEffect(() => {
    setMainButtonOnClick(handleForward);
  }, [handleForward, setMainButtonOnClick]);

  return (
    <div className={styles.container}>
      <h2>{`MEETING #1`.toUpperCase()}</h2>
      <div className={styles.content}>
        <div className={styles.timeLine}>
          <span>
            Date: &nbsp; <span className={styles.data}>{date}</span>
          </span>
          <span>
            Time: &nbsp; <span className={styles.data}>{date}</span>
          </span>
        </div>
        <span>
          Participiants: &nbsp; <span className={styles.data}>{participantCount}</span>
        </span>
        <span>
          Free <span className={styles.data}>&nbsp; 2 &nbsp; </span> from{' '}
          <span className={styles.data}>&nbsp; 3 &nbsp;</span> places
        </span>
        <span>
          Creator from: &nbsp; <span className={styles.data}>Belarus, Male</span>
        </span>
        <span>
          Topic: &nbsp; <span className={styles.data}>{topic}</span>
        </span>
        <span onClick={toggleOpenQuestions}>
          Questions{' '}
          {isOpenQuestions ? (
            <UpArrow className={styles.arrow} />
          ) : (
            <DownArrow className={styles.arrow} />
          )}
        </span>
        {isOpenQuestions && questions.map((question) => <QuestionItem label={question} />)}
      </div>
      <div className={styles.buttons}>
        <button className={styles.join} type='button'>
          {'join meeting'.toUpperCase()}
        </button>
        <button className={styles.leave} type='button'>
          {'leave meeting'.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default MeetingInfo;
