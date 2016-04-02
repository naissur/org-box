import { 
  FILE_GET,
  FILE_GET_SUCCESS,
  FILE_GET_FAILURE
} from '../constants';

const initialState = {
  file: null,
  filePath: null,
  fileName: null,
  fileLoaded: false,
  fileLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FILE_GET:
      return {
        ...state,
        fileLoading: true,
        fileLoaded: false,
        file: null,
        filePath: action.path,
        fileName: action.name
      }

    case FILE_GET_SUCCESS:
      return {
        ...state,
        fileLoading: false,
        fileLoaded: true,
        file: action.value
      }

    case FILE_GET_FAILURE:
      return {
        ...state,
        fileLoading: false,
        fileLoaded: false,
        file: null,
        fileName: null
      }

    default:
      return state;
  }
}
