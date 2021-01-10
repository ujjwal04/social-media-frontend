import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './users/userReducer';
import postReducer from './posts/postReducer';
import profileReducer from './profile/profileReducer';
import feedReducer from './feed/feedReducer';
import { commentReducer } from './comment/commentReducer';
import { likeOnAPostReducer, likeOnACommentReducer } from './likes/likeReducer';
import replyReducer from './replies/replyReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  createPostState: postReducer,
  feed: feedReducer,
  commentInAPostState: commentReducer,
  likeOnAPostState: likeOnAPostReducer,
  likeOnACommentState: likeOnACommentReducer,
  replyState: replyReducer,
  profileState: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareEnhancer = applyMiddleware(logger, thunk);

//const store = createStore(rootReducer, middlewareEnhancer);

const store = () => {
  let store = createStore(persistedReducer, middlewareEnhancer);
  let persistor = persistStore(store);
  return { store, persistor };
};

export default store;
