import React, { useCallback, useEffect, useMemo, useState } from 'react';

import LevelList from '@components/LevelList/LevelList';
import StepBox from '@components/StepBox/StepBox';
import SubmitButton from '@components/SubmitButton/SubmitButton';
import { TooltipType } from '@components/Tooltip/Tooltip';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { useBackSwipe } from '@hooks/use-swipe';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getMeetingDaysAction } from '@store/meetings/actions';
import { getLanguageLevelSelector } from '@store/profile/selectors';
import { mapLevels } from '@utils/map-levels';
import { FULL_DATE } from 'common/constants';
import dayjs from 'dayjs';
import useTgBackButton from 'hooks/useTgBackButton';
import { LanguageLevel } from 'lingopractices-models';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JOIN_DATE_PATH, JOIN_LANGUAGES_PATH, JOIN_LEVELS_PATH } from 'routing/routing.constants';
import { JoinMeetingType } from 'screens/types';

import styles from './JoinMeetingLevel.module.scss';

const JoinMeetingLevel: React.FC = () => {
  const location = useLocation();
  const meetingData: JoinMeetingType = location?.state;
  const currentLevel = useSelector(getLanguageLevelSelector);
  const [newLevel, setNewLevel] = useState(
    meetingData?.level?.languageLevel || currentLevel || LanguageLevel.None,
  );
  const getMeetingsDays = useActionWithDeferred(getMeetingDaysAction);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setBackButtonOnClick } = useTgBackButton(true);

  const mappedLevels = useMemo(() => mapLevels(newLevel), [newLevel]);

  const locationData = useMemo(() => {
    if (newLevel) {
      return {
        ...meetingData,
        level: {
          languageLevel: newLevel,
          data: {
            path: JOIN_LEVELS_PATH,
            title: t(mappedLevels.length > 1 ? 'meetingInfo.levels' : 'meetingInfo.level'),
            value: mappedLevels.map((level) => t(`levels.${level}`)).join(', '),
          },
        },
      };
    }

    return meetingData;
  }, [newLevel, meetingData, mappedLevels, t]);

  const handleBack = useCallback(() => {
    navigate(JOIN_LANGUAGES_PATH, { state: { ...locationData } });
  }, [locationData, navigate]);

  useBackSwipe(handleBack);

  const handleForward = useCallback(() => {
    if (meetingData?.language?.currentLanguage && newLevel) {
      getMeetingsDays<string[]>({
        languageId: meetingData.language.currentLanguage.id,
        languageLevel: newLevel,
        from: dayjs().format(FULL_DATE),
      })
        .then((data: string[]) => {
          if (isEmpty(data)) {
            setNotification({
              id: dayjs().unix(),
              type: TooltipType.INFO,
              text: t('notifications.emptyDays'),
            });

            return;
          }
          navigate(JOIN_DATE_PATH, { state: { ...locationData } });
        })
        .catch((e) =>
          setNotification({
            id: dayjs().unix(),
            type: TooltipType.ERROR,
            text: t('errors.loadDyays'),
          }),
        );
    }
  }, [
    meetingData?.language?.currentLanguage,
    locationData,
    newLevel,
    getMeetingsDays,
    setNotification,
    navigate,
    t,
  ]);

  useEffect(() => {
    setBackButtonOnClick(handleBack);
  }, [handleBack, setBackButtonOnClick]);

  return (
    <div className={styles.container}>
      <StepBox meetingData={locationData} containerClass={styles.stepBoxContainer} />
      <LevelList
        onChangeLevel={setNewLevel}
        defaultLevelId={newLevel}
        title={t('level.chooseLevel')}
        multiple={!!true}
      />
      <SubmitButton
        onClick={handleForward}
        title={newLevel ? t('button.continue') : t('level.choose')}
        isActive={!!newLevel}
      />
    </div>
  );
};

export default JoinMeetingLevel;
