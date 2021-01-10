import axios from './../../utils/axios';
import * as actions from './userTypes';

// LOGIN ACTIONS
export const login = ({ user_name, password }) => async (dispatch) => {
  try {
    dispatch(loginInit());
    const user = await axios.post('users/login', {
      user_name,
      password,
    });
    if (user) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.data.token}`;
      // await AsyncStorage.setItem(userToken, JSON.stringify(user.data.token));
      // await AsyncStorage.setItem(
      //   userName,
      //   JSON.stringify(user.data.data.user.user_name)
      // );
      dispatch(loginSuccess(user.data));
    }
  } catch (error) {
    dispatch(loginFail(error));
  }
};

const loginInit = () => {
  return {
    type: actions.LOGIN_INIT,
  };
};

const loginSuccess = (user) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: user,
  };
};

const loginFail = (error) => {
  return {
    type: actions.LOGIN_FAIL,
    payload: error,
  };
};

// SIGNUP ACTIONS
export const signup = ({ user_name, name, password, email, bio }) => async (
  dispatch
) => {
  try {
    dispatch(signupInit());
    const user = await axios.post('users/signup', {
      user_name,
      name,
      password,
      email,
      bio,
    });
    if (user) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.data.token}`;
      dispatch(signupSuccess(user.data));
    }
  } catch (error) {
    dispatch(signupFail(error));
  }
};

const signupInit = () => {
  return {
    type: actions.SIGNUP_INIT,
  };
};

const signupSuccess = (user) => {
  return {
    type: actions.SIGNUP_SUCCESS,
    payload: user,
  };
};

const signupFail = (error) => {
  return {
    type: actions.SIGNUP_FAIL,
    payload: error,
  };
};

export const uploadProfilePic = (profile_pic) => async (dispatch) => {
  try {
    dispatch(updateProfilePicInit());
    const updatedUser = await axios.patch('users/updateProfilePic', {
      profile_pic,
    });
    if (updatedUser) {
      dispatch(updateProfilePicSuccess(updatedUser.data.data.user.profile_pic));
    }
  } catch (error) {
    dispatch(updateProfilePicFail(error));
  }
};

const updateProfilePicInit = () => {
  return {
    type: actions.UPDATE_PROFILE_PIC_INIT,
  };
};

const updateProfilePicSuccess = (updatedUser) => {
  return {
    type: actions.UPDATE_PROFILE_PIC_SUCCESS,
    payload: updatedUser,
  };
};

const updateProfilePicFail = (error) => {
  return {
    type: actions.UPDATE_PROFILE_PIC_FAIL,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actions.LOGOUT,
  };
};

export const updateProfile = (updatedUserData) => async (dispatch) => {
  try {
    dispatch(updateProfileInit());
    const updatedUser = await axios.patch('users/update', updatedUserData);
    if (updatedUser) {
      dispatch(updateProfileSuccess(updatedUser));
      alert('user updated');
    }
  } catch (error) {
    dispatch(updatedProfileFail(error));
  }
};

const updateProfileInit = () => {
  return {
    type: actions.UPDATE_PROFILE_INIT,
  };
};

const updateProfileSuccess = (updatedUser) => {
  return {
    type: actions.UPDATE_PROFILE_SUCCESS,
    payload: updatedUser,
  };
};

const updatedProfileFail = (error) => {
  return {
    type: actions.UPDATE_PROFILE_FAIL,
    payload: error,
  };
};
