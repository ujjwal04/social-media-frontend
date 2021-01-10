import axios from './../../utils/axios';

import * as actions from './profileTypes';

export const getUserById = (user_id) => async (dispatch) => {
  try {
    dispatch(getUserByIdInit());
    const user = await axios.get(`users/${user_id}`);
    if (user) {
      dispatch(getUserByIdSuccess(user.data));
    }
  } catch (error) {
    dispatch(getUserByIdFail(error));
  }
};

const getUserByIdInit = () => {
  return {
    type: actions.GET_USER_BY_ID_INIT,
  };
};

const getUserByIdSuccess = (user) => {
  return {
    type: actions.GET_USER_BY_ID_SUCCESS,
    payload: user,
  };
};

const getUserByIdFail = (error) => {
  return {
    type: actions.GET_USER_BY_ID_FAIL,
    payload: error,
  };
};

export const getUserByUserName = (user_name) => async (dispatch) => {
  try {
    dispatch(getUserByUserNameInit());
    const user = await axios.get(`users/${user_name}`);
    if (user) {
      dispatch(getUserByUserNameSuccess(user.data));
    }
  } catch (error) {
    dispatch(getUserByUserNameFail(error));
  }
};

const getUserByUserNameInit = () => {
  return {
    type: actions.GET_USER_BY_USER_NAME_INIT,
  };
};

const getUserByUserNameSuccess = (user) => {
  return {
    type: actions.GET_USER_BY_USER_NAME_SUCCESS,
    payload: user,
  };
};

const getUserByUserNameFail = (error) => {
  return {
    type: actions.GET_USER_BY_USER_NAME_FAIL,
    payload: error,
  };
};
