import { 
  FOLDER_GET,
  FOLDER_GET_SUCCESS,
  FOLDER_GET_FAILURE
} from '../constants';

const initialState = {
  folder: null,
  folderPath: null,
  folderLoaded: false,
  folderLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FOLDER_GET:
      return {
        ...state,
        folderLoading: true,
        folderLoaded: false,
        folder: null,
        folderPath: action.path
      }

    case FOLDER_GET_SUCCESS:
      return {
        ...state,
        folderLoading: false,
        folderLoaded: true,
        folder: action.value
      }

    case FOLDER_GET_FAILURE:
      return {
        ...state,
        folderLoading: false,
        folderLoaded: false,
        folder: null
      }

    default:
      return state;
  }
}
