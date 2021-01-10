import axios from 'axios';
import reduxStore from './../redux/store';
const instance = axios.create({
  //baseURL: 'http://localhost:8000/api/v1/',
  baseURL: 'https://social-media-backend1.herokuapp.com/api/v1/',
});

// (async () => {
//   try {
//     const user = await AsyncStorage.getItem('user');
//     if (user) {
//       instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
//         user.token
//       )}`;
//       console.log(JSON.parse(user.token));
//     }
//   } catch (error) {}
// })();

instance.interceptors.request.use(function (config) {
  const item = localStorage.getItem('persist:root');
  const userObject = JSON.parse(item);
  const user = JSON.parse(userObject.user);
  if (user.userDetail) {
    const token = user.userDetail.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else config.headers.Authorization = '';
  }
  return config;
});

export default instance;
