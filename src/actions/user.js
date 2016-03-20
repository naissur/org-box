import {
  USER_INFO,
  USER_INFO_SUCCESSFUL,
  USER_INFO_FAILURE
} from '../constants';

import { authorize, getAccountInfo } from '../utils/dropbox';

const userInfo = () => ({ type: USER_INFO });
const userInfoSuccessful = value => ({ type: USER_INFO_SUCCESSFUL, value });
const userInfoFailure = error => ({ type: USER_INFO_FAILURE, error });

export const userGetInfo = () => (
  (dispatch, getState) => {
    dispatch(userInfo());

    const { configLoaded, config } = getState().dropbox;

    if (!configLoaded) return dispatch(userInfoFailure('Invalid DB config'));

    getAccountInfo(config)
    .then(res => dispatch(userInfoSuccessful(res)),
          err => dispatch(userInfoFailure(err)));

  }
);

export const authorizeUser = () => (
  () => {
    authorize();
  }
)
