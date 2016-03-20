import {
  FOLDER_GET,
  FOLDER_GET_SUCCESS,
  FOLDER_GET_FAILURE
} from '../constants';

import {
  getFolder
} from '../utils/dropbox';

const folderGetSuccessful = value => ({ type: FOLDER_GET_SUCCESS, value });
const folderGetFailure = error => ({ type: FOLDER_GET_FAILURE, error });


export const folderGet = path => (
  (dispatch, getState) => {
    dispatch({ type: FOLDER_GET, path });

    const { configLoaded, config } = getState().dropbox;

    if (!configLoaded) return dispatch(folderGetFailure('Invalid DB config'));

    getFolder(config, path)
    .then(res => dispatch(folderGetSuccessful(res)),
          err => dispatch(folderGetFailure(err)));

  }
);
