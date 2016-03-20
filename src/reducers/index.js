import { combineReducers } from 'redux';
import user from './user';
import dropbox from './dropbox';
import folder from './folder';

export default combineReducers({
  user,
  dropbox,
  folder
});
