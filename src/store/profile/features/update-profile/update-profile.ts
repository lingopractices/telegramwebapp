import { createDeferredAction } from '@store/common/actions';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { languagesSelector } from '@store/languages/selectors';
import { IProfileState } from '@store/profile/types';
import { addPendingRequest } from '@utils/cancel-request';
import { AxiosResponse, CancelTokenSource } from 'axios';
import { ILanguage, IUpdateUserRequest, IUser } from 'lingopractices-models';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { UpdateProfileFailure } from './update-profile-failure';
import { UpdateProfileSuccess } from './update-profile-success';

export class UpdateProfile {
  static get action() {
    return createDeferredAction<IUpdateUserRequest>('profile/UPDATE_PROFILE');
  }

  static get reducer() {
    return (draft: IProfileState) => {
      draft.requests.updateProfilePending = true;
    };
  }

  static get saga() {
    return function* (action: ReturnType<typeof UpdateProfile.action>): SagaIterator {
      const {
        countryName,
        gender,
        interfaceLanguageId,
        languageLevel,
        practiceLanguageId,
        userId,
        timeZoneId,
        city,
      } = action.payload;

      const languages: ILanguage[] = yield select(languagesSelector);

      const getLanguageNameById = (languagesArray: ILanguage[], id: string) => {
        const languageObj = languagesArray.find((lang) => lang.id === id);

        return languageObj ? languageObj.name : '';
      };

      try {
        UpdateProfile.httpRequest.call(
          yield call(() =>
            UpdateProfile.httpRequest.generator(action.payload, (token: CancelTokenSource) =>
              addPendingRequest(userId, token),
            ),
          ),
        );

        const profileInfo: IUser = {
          practiceLanguage: {
            id: practiceLanguageId,
            name: getLanguageNameById(languages, practiceLanguageId),
          },
          interfaceLanguage: {
            id: interfaceLanguageId,
            name: getLanguageNameById(languages, interfaceLanguageId),
          },
          id: userId,
          countryName,
          gender,
          languageLevel,
          timeZoneId,
          city,
        };

        yield put(UpdateProfileSuccess.action(profileInfo));
        action.meta?.deferred.resolve();
      } catch (e) {
        yield put(UpdateProfileFailure.action());
        action.meta?.deferred.reject(e);
      }
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IUser>, IUpdateUserRequest>(
      MAIN_API.UPDATE_USER,
      HttpRequestMethod.Put,
    );
  }
}
