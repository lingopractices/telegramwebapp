import React, { useCallback, useRef } from 'react';

import { ReactComponent as AccountIcon } from '@assets/account.svg';
import { ReactComponent as LingoLogo } from '@assets/lingo-logo.svg';
import Button from '@components/Button/Button';
import InfiniteScroll from '@components/InfinteScroll/InfiniteScroll';
import MeetingItem from '@components/MeetingItem/MeetingItem';
import SecondaryLogo from '@components/SecondaryLogo/SecondaryLogo';
import { TooltipType } from '@components/Tooltip/Tooltip';
import AnimatedLogo, { LogoSize } from '@components/animatedLogo/AnimatedLogo';
import { useActionWithDeferred } from '@hooks/use-action-with-deferred';
import { useActionWithDispatch } from '@hooks/use-action-with-dispatch';
import { Skeleton } from '@mui/material';
import { setNotificationAction } from '@store/app-notifications/actions';
import { getMyMeetingsAction } from '@store/meetings/actions';
import {
  getMyMeetingHasMoreSelector,
  getMyMeetingsSelector,
  myMeetingsPendingSelector,
} from '@store/meetings/selectors';
import { getProfileDataSelector } from '@store/profile/selectors';
import { createAndFillArray } from '@utils/create-fill-array';
import { MY_MEETINGS_LIMITS } from '@utils/pagination-limits';
import classNames from 'classnames';
import { SCROLL_DOWN, SCROLL_TOP } from 'common/constants';
import dayjs from 'dayjs';
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
  WITH_GOOGLE_PATH,
} from 'routing/routing.constants';

import styles from './MainScreen.module.scss';

const MainScreen: React.FC = () => {
  const myMeetings = useSelector(getMyMeetingsSelector);
  const infiniteContainer = useRef<HTMLDivElement>(null);
  const hasMore = useSelector(getMyMeetingHasMoreSelector);
  const myMeetingsPending = useSelector(myMeetingsPendingSelector);
  const mainLogoRef = useRef<HTMLDivElement>(null);
  const secondaryLogoRef = useRef<HTMLDivElement>(null);
  const previousScrollTop = useRef(0);
  const user = useSelector(getProfileDataSelector);

  const getMeetings = useActionWithDeferred(getMyMeetingsAction);
  const setNotification = useActionWithDispatch(setNotificationAction);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useTgBackButton(false);
  useTgMainButton(false, false);

  const loadMore = useCallback(() => {
    getMeetings().catch((e) => {
      setNotification({
        id: dayjs().unix(),
        text: t('errors.meetings'),
        type: TooltipType.ERROR,
      });
    });
  }, [getMeetings, setNotification, t]);

  const createMeeting = useCallback(() => {
    let path = '';
    if (user?.countryName) {
      path = CREATE_LANGUAGES_PATH;
    } else {
      path = WITH_GOOGLE_PATH;
    }

    navigate(path);
  }, [user?.countryName, navigate]);

  const joinMeeting = useCallback(() => {
    navigate(JOIN_LANGUAGES_PATH);
  }, [navigate]);

  const renderMeetings = useCallback(
    () =>
      myMeetings.map((meeting: IMeeting) => (
        <MeetingItem
          id={meeting.id}
          key={meeting.id}
          date={meeting.meetingDate}
          mainRoute={MEETING_PATH}
          defaultText={t('meetings.meetingTitles.meeting')}
        />
      )),
    [myMeetings, t],
  );

  const renderMeetingSkelet = useCallback(
    () =>
      createAndFillArray(MY_MEETINGS_LIMITS * 2).map((value: number) => (
        <Skeleton key={value} className={styles.skeletContainer} animation='wave'>
          <MeetingItem id={value} date='' mainRoute='' defaultText='' />
        </Skeleton>
      )),
    [],
  );

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop } = target;
    const secondaryLogo = secondaryLogoRef.current;
    const mainLogo = mainLogoRef.current;

    if (mainLogo && secondaryLogo) {
      if (scrollTop >= previousScrollTop.current) {
        if (scrollTop >= SCROLL_TOP) {
          mainLogo.classList.remove(styles.start);
          mainLogo.classList.remove(styles.showMainLogo);
          secondaryLogo.classList.remove(styles.hideSecondaryLogo);
          mainLogo.classList.add(styles.hideMainLogo);
          secondaryLogo.classList.add(styles.showSecondaryLogo);
        }
      } else if (scrollTop <= previousScrollTop.current) {
        if (scrollTop <= SCROLL_DOWN) {
          mainLogo.classList.remove(styles.start);
          secondaryLogo.classList.remove(styles.showSecondaryLogo);
          secondaryLogo.classList.remove(styles.showSecondaryLogo);
          mainLogo.classList.add(styles.showMainLogo);
          secondaryLogo.classList.add(styles.hideSecondaryLogo);
        }
      }
    }

    previousScrollTop.current = scrollTop;
  }, []);

  return (
    <div
      className={classNames(styles.container, {
        [styles.pending]: !myMeetings.length && myMeetingsPending,
      })}
      ref={infiniteContainer}
      onScroll={handleScroll}
    >
      <div className={styles.stickyHeader}>
        <div className={styles.headerLine}>
          <div className={styles.item}>
            <div ref={secondaryLogoRef} className={styles.secondaryLogo}>
              <SecondaryLogo />
            </div>
          </div>
          <div className={classNames(styles.item, styles.logoWrapper)}>
            <div ref={mainLogoRef} className={classNames(styles.logo, styles.start)}>
              <LingoLogo />
            </div>
          </div>
          <div className={styles.item}>
            <Link to={ACCOUNT_PATH} className={styles.account}>
              <AccountIcon />
            </Link>
          </div>
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
        <h2 className={styles.meetingsHeader}>{t('mainScreen.meetingsHeader')}</h2>
      </div>

      <div className={styles.meetingsWrapper}>
        <InfiniteScroll hasMore={hasMore} containerRef={infiniteContainer} onReachBottom={loadMore}>
          {renderMeetings()}
          {myMeetingsPending && myMeetings.length ? (
            <AnimatedLogo containerClass={styles.containerLoader} size={LogoSize.SMALL} />
          ) : null}
        </InfiniteScroll>

        {!myMeetings.length && myMeetingsPending ? renderMeetingSkelet() : null}

        {!myMeetings.length && !hasMore ? <div>{t('mainScreen.noMeetings')}</div> : null}
      </div>
    </div>
  );
};

export default MainScreen;
