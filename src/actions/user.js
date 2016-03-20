import {
  USER_AUTHORIZE,
  USER_AUTHORIZE_SUCCESSFUL,
  USER_AUTHORIZE_FAILURE
} from '../constants';

import { authorize } from '../utils/dropbox';

const userAuthorize = () => ({ type: USER_AUTHORIZE });
const userAuthorizeSuccessful = value => ({ type: USER_AUTHORIZE_SUCCESSFUL, value });
const userAuthorizeFailure = error => ({ type: USER_AUTHORIZE_FAILURE, error });

export const authorizeUser = () => (
  (dispatch, getState) => {
    dispatch(userAuthorize());

    authorize().then(
      value => {
        dispatch(userAuthorizeSuccessful(value));
      },
      err => {
        dispatch(userAuthorizeFailure(err));
      }
    );

  }
)
