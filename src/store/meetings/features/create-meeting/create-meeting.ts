import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { IMeetingsState } from '@store/meetings/types';
import { getProfileDataSelector } from '@store/profile/selectors';
import { getTopicsSelector } from '@store/topics/selectors';
import { AxiosResponse } from 'axios';
import {
  ICreateMeetingRequest,
  ICreateMeetingResponse,
  IMeeting,
  ITopic,
  IUser,
} from 'lingopractices-models';
import { call, put, select } from 'redux-saga/effects';

import { CreateMeetingSuccess } from './create-meeting-success';

export class CreateMeeting {
  static get action() {
    return createAction<ICreateMeetingRequest>('meetings/CREATE_MEETING');
  }

  static get reducer() {
    return (draft: IMeetingsState) => {
      draft.requests.createMeetingPending = true;
      return draft;
    };
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof CreateMeeting.action>) {
      const {
        data: { googleMeetLink, id, isCreated },
      } = CreateMeeting.httpRequest.call(
        yield call(() => CreateMeeting.httpRequest.generator(payload)),
      );

      if (isCreated) {
        const userCreator: IUser = yield select(getProfileDataSelector);
        const topics: ITopic[] = yield select(getTopicsSelector);
        const meetingTopic = topics.find((topic) => topic.id === payload.topicId);
        const questions = topics.find((topic) => topic.id === payload.topicId);
        const createdMeeting: IMeeting = {
          id,
          meetingDate: payload.meetingAt,
          googleMeetLink,
          maxParticipantsCount: payload.peopleNumber,
          participantsCount: 1,
          topic: {
            id: payload.topicId,
            name: meetingTopic?.name || '',
            questions: questions?.questions || [],
          },
          userCreator,
        };

        yield put(CreateMeetingSuccess.action(createdMeeting));
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<ICreateMeetingResponse>, ICreateMeetingRequest>(
      MAIN_API.CREATE_MEETING,
      HttpRequestMethod.Post,
    );
  }
}
