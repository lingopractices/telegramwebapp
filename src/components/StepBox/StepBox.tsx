import React, { useCallback, useMemo } from 'react';

import StepItem from '@components/StepBox/StepItem/StepItem';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { CreateMeetingType, JoinMeetingType, StepDataType } from 'screens/types';

import styles from './StepBox.module.scss';

interface IStepBox {
  meetingData: CreateMeetingType | JoinMeetingType;
  containerClass?: string;
}

const StepBox: React.FC<IStepBox> = ({ meetingData, containerClass }) => {
  const location = useLocation();

  const mapMeetingDataToStep = useCallback(
    (step: StepDataType) => (
      <StepItem
        key={step.path}
        path={step.path}
        title={step.title}
        value={step.value}
        data={meetingData}
      />
    ),
    [meetingData],
  );

  const renderedSteps = useMemo(
    () =>
      meetingData
        ? Object.values(meetingData)
            .map((item) => item.data)
            .filter((item) => item.path !== location.pathname)
            .filter((item) => item.value)
            .map(mapMeetingDataToStep)
        : [],
    [meetingData, location.pathname, mapMeetingDataToStep],
  );

  return renderedSteps.length ? (
    <div className={classNames(styles.container, containerClass)}>
      {renderedSteps}
      <div className={styles.line} />
    </div>
  ) : null;
};

export default StepBox;
