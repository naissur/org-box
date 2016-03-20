import { NO_OP } from '../constants.js';

const initialState = { noop: 'no_op' };

export default (state = initialState, action) => {
  switch(action.type) {
    case NO_OP:
        return {...state, noop: 'initialized!'};
    break;

    default:
      return initialState;
  }
}
