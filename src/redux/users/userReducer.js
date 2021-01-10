import * as actions from './userTypes';

let initialState = {
  userDetail: null,
  isLoggedIn: false,
  loading: false,
};

// const getAsyncStorageData = async () => {
//   try {
//     const existingUserToken = await AsyncStorage.getItem(userToken);
//     const existingUserName = await AsyncStorage.getItem(userName);
//     if (existingUserToken !== null && existingUserName !== null) {
//       return {
//         userToken: JSON.parse(existingUserToken),
//         userName: JSON.parse(existingUserName),
//         isLoggedIn: true,
//         loading: false,
//       };
//     }
//     return {
//       userName: null,
//       userToken: null,
//       isLoggedIn: false,
//       loading: false,
//     };
//   } catch (error) {
//     console.log(err);
//   }
// };

// getAsyncStorageData()
//   .then((res) => {
//     initialState = res;
//     console.log('asdasd');
//   })
//   .catch((err) => console.log(err));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNUP_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userDetail: action.payload,
        error: '',
      };
    case actions.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.LOGIN_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userDetail: action.payload,
        error: '',
      };
    case actions.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.UPDATE_PROFILE_INIT:
      return {
        ...state,
        loading: true,
      };
    case actions.UPDATE_PROFILE_SUCCESS:
      if (state.userDetail.data)
        state.userDetail.data.user = action.payload.data.data.user;
      return {
        ...state,
        loading: false,
        error: '',
      };
    case actions.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.UPDATE_PROFILE_PIC_INIT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case actions.UPDATE_PROFILE_PIC_SUCCESS:
      if (state.userDetail) {
        state.userDetail.data.user.profile_pic = action.payload;
      }
      return {
        ...state,
        loading: false,
        error: '',
      };
    case actions.UPDATE_PROFILE_PIC_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.LOGOUT:
      //localStorage.removeItem('persist:root');
      return {
        ...state,
        loading: false,
        userDetail: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
