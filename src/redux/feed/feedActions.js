import axios from './../../utils/axios';
import * as actions from './feedTypes';

export const fetchFeed = () => async (dispatch) => {
  try {
    dispatch(feedInit());
    const feed = await axios.get('posts');
    if (feed) {
      dispatch(feedSuccess(feed.data.data.posts));
    }
  } catch (error) {
    dispatch(feedFail(error));
  }
};

const feedInit = () => {
  return {
    type: actions.FEED_INIT,
  };
};

const feedSuccess = (feed) => {
  return {
    type: actions.FEED_SUCCESS,
    payload: feed,
  };
};

const feedFail = (error) => {
  return {
    type: actions.FEED_FAIL,
    payload: error,
  };
};

// export const fetchFeedByUserId = (user_id) => async (dispatch) => {
//   try {
//     dispatch(fetchFeedByUserIdInit());
//     const feed = await axios.get(`users/${user_id}/posts`);
//     if (feed) {
//       dispatch(fetchFeedByUserIdSuccess(feed.data.data.posts));
//     }
//   } catch (error) {
//     dispatch(fetchFeedByUserIdFail(error));
//   }
// };

// const fetchFeedByUserIdInit = () => {
//   return {
//     type: actions.FEED_BY_USER_ID_INIT,
//   };
// };

// const fetchFeedByUserIdSuccess = (feed) => {
//   return {
//     type: actions.FEED_BY_USER_ID_SUCCESS,
//     payload: feed,
//   };
// };

// const fetchFeedByUserIdFail = (error) => {
//   return {
//     type: actions.FEED_BY_USER_ID_FAIL,
//     payload: error,
//   };
// };
