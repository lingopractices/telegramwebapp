import React, { useCallback, useMemo, useRef } from 'react';

import { ReactComponent as LingoLogo } from '@assets/lingo-logo.svg';
import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import MeetingItem from '@components/MeetingItem/MeetingItem';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { getMyMeetingsAction } from '@store/meetings/actions';
import { getMyMeetingHasMoreSelector, getMyMeetingsSelector } from '@store/meetings/selectors';
import useTgBackButton from 'hooks/useTgBackButton';
import useTgMainButton from 'hooks/useTgMainButton';
import { IMeeting } from 'lingopractices-models';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const getMeetings = useActionWithDispatch(getMyMeetingsAction);

  useTgBackButton(false);
  useTgMainButton(false, false);

  const loadMore = useCallback(() => {
    getMeetings();
  }, [getMeetings]);

  const renderMeetings = useCallback(
    (meeting: IMeeting) => (
      <MeetingItem
        id={meeting.id}
        key={meeting.id}
        date={meeting.meetingDate}
        mainRoute={MEETING_PATH}
        defaultText='Meeting'
      />
    ),
    [],
  );

  const renderedMeetings = useMemo(
    () => myMeetings.map(renderMeetings),
    [myMeetings, renderMeetings],
  );

  return (
    <div className={styles.container}>
      <Link to={ACCOUNT_PATH} className={styles.account}>
        account
      </Link>
      <LingoLogo className={styles.logo} />
      <div className={styles.buttonWrapper}>
        <Link to={CREATE_LANGUAGES_PATH} className={styles.button}>
          create meeting
        </Link>
        <Link to={JOIN_LANGUAGES_PATH} className={styles.button}>
          joing meeting
        </Link>
      </div>
      <div ref={infiniteContainer} className={styles.myMeetingsWrapper}>
        {myMeetings.length ? (
          <InfiniteScroll
            hasMore={hasMore}
            containerRef={infiniteContainer}
            onReachBottom={loadMore}
          >
            {renderedMeetings}
          </InfiniteScroll>
        ) : (
          <div>theres is no any meetings</div>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
