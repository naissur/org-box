import { 
  USER_INFO,
  USER_INFO_SUCCESSFUL,
  USER_INFO_FAILURE,

  DROPBOX_OAUTH
} from '../constants';

const initialState = {
  authorized: false,

  info: null,
  infoLoaded: false,
  infoLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case DROPBOX_OAUTH:
      return {
        ...state,
        authorized: true
      };

    case USER_INFO:
      return {
        ...state,
        infoLoading: true,
        infoLoaded: false,
        info: null
      }

    case USER_INFO_SUCCESSFUL:
      return {
        ...state,
        infoLoading: false,
        infoLoaded: true,
        info: action.value
      }

    case USER_INFO_FAILURE:
      return {
        ...state,
        infoLoading: false,
        infoLoaded: false,
        info: null
      }

    default:
      return state;
  }
}
