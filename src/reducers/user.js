import { 
  USER_AUTHORIZE,
  USER_AUTHORIZE_SUCCESSFUL,
  USER_AUTHORIZE_FAILURE
} from '../constants';

const initialState = {
  authorized: false,
  authorizing: false,
  data: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_AUTHORIZE:
      return {
        ...state,
        authorizing: true,
        authorized: false,
        data: null
      }

    case USER_AUTHORIZE_SUCCESSFUL:
      return {
        ...state,
        authorizing: false,
        authorized: true,
        data: action.value
      }

    case USER_AUTHORIZE_FAILURE:
      return {
        ...state,
        authorizing: false,
        authorized: false,
        data: null
      }

    default:
      return initialState;
  }
}
