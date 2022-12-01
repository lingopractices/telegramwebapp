import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { ReactComponent as AccountIcon } from '@assets/account.svg';
import { ReactComponent as LingoLogo } from '@assets/lingo-logo.svg';
import Button from '@components/Button/Button';
import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import MeetingItem from '@components/MeetingItem/MeetingItem';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getLanguagesAction } from '@store/languages/actions';
import { languagesSelector } from '@store/languages/selectors';
import { getMyMeetingsAction } from '@store/meetings/actions';
import {
  getMyMeetingHasMoreSelector,
  getMyMeetingsSelector,
  myMeetingsPendingSelector,
} from '@store/meetings/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { IMeeting } from 'lingopractices-models';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  ACCOUNT_PATH,
  CREATE_LANGUAGES_PATH,
  JOIN_LANGUAGES_PATH,
  MEETING_PATH,
} from 'routing/routing.constants';

import styles from './MainScreen.module.scss';

const MainScreen: React.FC = () => {
  const myMeetings = useSelector(getMyMeetingsSelector);
  const infiniteContainer = useRef<HTMLDivElement>(null);
  const hasMore = useSelector(getMyMeetingHasMoreSelector);
  const languages = useSelector(languagesSelector);
  const myMeetingsPending = useSelector(myMeetingsPendingSelector);
  const getLanguages = useActionWithDispatch(getLanguagesAction);
  const getMeetings = useActionWithDispatch(getMyMeetingsAction);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useTgBackButton(false);
  useTgMainButton(false, false);

  const loadMore = useCallback(() => {
    getMeetings();
  }, [getMeetings]);

  const createMeeting = useCallback(() => {
    navigate(CREATE_LANGUAGES_PATH);
  }, [navigate]);

  const joinMeeting = useCallback(() => {
    navigate(JOIN_LANGUAGES_PATH);
  }, [navigate]);

  useEffect(() => {
    if (!languages.length) {
      getLanguages();
    }
  }, [languages, getLanguages]);

  const renderMeetings = useCallback(
    (meeting: IMeeting) => (
      <MeetingItem
        id={meeting.id}
        key={meeting.id}
        date={meeting.meetingDate}
        mainRoute={MEETING_PATH}
        defaultText={t('meetings.meetingTitles.meeting')}
      />
    ),
    [t],
  );

  const renderedMeetings = useMemo(
    () => myMeetings.map(renderMeetings),
    [myMeetings, renderMeetings],
  );

  const testRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container} ref={infiniteContainer}>
      <div className={styles.stickyHeader}>
        <Link to={ACCOUNT_PATH} className={styles.account}>
          <AccountIcon />
        </Link>
        <div ref={testRef} className={styles.wrapSvg}>
          <LingoLogo className={styles.logo} />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            title={t('mainScreen.create')}
            onClick={createMeeting}
            containerClass={styles.createButton}
          />
          <Button
            title={t('mainScreen.join')}
            onClick={joinMeeting}
            containerClass={styles.joinButton}
          />
        </div>
        <h3 className={styles.meetingsHeader}>{t('mainScreen.meetingsHeader')}</h3>
      </div>
      <InfiniteScroll hasMore={hasMore} containerRef={infiniteContainer} onReachBottom={loadMore}>
        {renderedMeetings}
        {myMeetingsPending && (
          <AnimatedLogo containerClass={styles.containerLoader} size={LogoSize.SMALL} />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default MainScreen;
