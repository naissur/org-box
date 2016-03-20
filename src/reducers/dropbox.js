import { 
  DROPBOX_OAUTH
} from '../constants';

const initialState = {
  configLoaded: false,
  config: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case DROPBOX_OAUTH:
      return {
        ...state,
        config: action.config,
        configLoaded: true
      }

    default:
      return state;
  }
}
