import {
  FILE_GET,
  FILE_GET_SUCCESS,
  FILE_GET_FAILURE
} from '../constants';

import {
  getFile
} from '../utils/dropbox';

const fileGetSuccessful = value => ({ type: FILE_GET_SUCCESS, value });
const fileGetFailure = error => ({ type: FILE_GET_FAILURE, error });


export const fileGet = (path, name) => (
  (dispatch, getState) => {
    dispatch({ type: FILE_GET, path, name });

    const { configLoaded, config } = getState().dropbox;

    if (!configLoaded) return dispatch(fileGetFailure('Invalid DB config'));

    getFile(config, path)
    .then(res => dispatch(fileGetSuccessful(res)),
          err => dispatch(fileGetFailure(err)));

  }
);
