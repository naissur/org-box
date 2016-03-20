import { NO_OP } from '../constants';
import { combineReducers } from 'redux';
import user from './user';
import dropbox from './dropbox';

export default combineReducers({
  user,
  dropbox
});
