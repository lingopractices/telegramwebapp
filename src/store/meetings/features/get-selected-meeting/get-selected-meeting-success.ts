import { createAction } from '@reduxjs/toolkit';
import { IMeetingsState } from '@store/meetings/types';
import { IMeeting } from 'lingopractices-models';

export class GetSelectedMeetingSuccess {
  static get action() {
    return createAction<IMeeting>('meetings/GET_SELECTED_MEETING_SUCCESS');
  }

  static get reducer() {
    return (
      draft: IMeetingsState,
      { payload }: ReturnType<typeof GetSelectedMeetingSuccess.action>,
    ) => {
      draft.requests.getSelectedMeetingPending = false;
      draft.selectedMeeting = payload;

      return draft;
    };
  }
}
