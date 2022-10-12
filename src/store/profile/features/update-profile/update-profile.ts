import { createAction } from '@reduxjs/toolkit';
import { httpRequestFactory } from '@store/common/http-request-factory';
import { HttpRequestMethod } from '@store/common/http-request-method';
import { MAIN_API } from '@store/common/path';
import { languagesSelector } from '@store/languages/selectors';
import { IProfileState } from '@store/profile/types';
import { AxiosResponse } from 'axios';
import { ILanguage, IUpdateUserRequest, IUser } from 'lingopractices-models';
import { call, put, select } from 'redux-saga/effects';

import { UpdateProfileSuccess } from './update-profile-success';

export class UpdateProfile {
  static get action() {
    return createAction<IUpdateUserRequest>('profile/UPDATE_PROFILE_REQUEST');
  }

  static get reducer() {
    return (draft: IProfileState) => draft;
  }

  static get saga() {
    return function* ({ payload }: ReturnType<typeof UpdateProfile.action>) {
      const {
        countryName,
        gender,
        interfaceLanguageId,
        languageLevel,
        practiceLanguageId,
        userId,
      } = payload;

      const languages: ILanguage[] = yield select(languagesSelector);

      UpdateProfile.httpRequest.call(
        yield call(() => UpdateProfile.httpRequest.generator(payload)),
      );

      const getLanguageNameById = (languagesArray: ILanguage[], id: string) => {
        const languageObj = languagesArray.find((lang) => lang.id === id);

        return languageObj ? languageObj.name : '';
      };

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
      };

      yield put(UpdateProfileSuccess.action(profileInfo));
    };
  }

  static get httpRequest() {
    return httpRequestFactory<AxiosResponse<IUser>, IUpdateUserRequest>(
      MAIN_API.UPDATE_USER,
      HttpRequestMethod.Put,
    );
  }
}
