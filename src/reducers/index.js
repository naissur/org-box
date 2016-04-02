import { combineReducers } from 'redux';
import user from './user';
import dropbox from './dropbox';
import folder from './folder';
import file from './file';

export default combineReducers({
  user,
  dropbox,
  folder,
  file
});
