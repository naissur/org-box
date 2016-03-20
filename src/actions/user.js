import {
  USER_AUTHORIZE,
  USER_AUTHORIZE_SUCCESSFUL,
  USER_AUTHORIZE_FAILURE
} from '../constants';

const userAuthorize = () => ({ type: USER_AUTHORIZE });
const userAuthorizeSuccessful = () => ({ type: USER_AUTHORIZE_SUCCESSFUL });
const userAuthorizeFailure = () => ({ type: USER_AUTHORIZE_FAILURE });

export const authorizeUser = () => (
  (dispatch, getState) => {
    dispatch(userAuthorize());

    setTimeout(() => {
      dispatch(userAuthorizeSuccessful());
    }, 1000);
  }
)
