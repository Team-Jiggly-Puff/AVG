import { combineReducers } from 'redux';
import reducer from './reducer'

const rootReducer = combineReducers({
  reducer: reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;