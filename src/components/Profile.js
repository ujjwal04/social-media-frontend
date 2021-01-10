import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import Post from './../components/Post';
import { getUserByUserName } from './../redux/profile/profileActions';
import { updateProfile } from '../redux/users/userActions';
import EditProfile from './EditProfile';

import firebase from './../utils/firebase';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#F3F2EF',
    paddingTop: '80px',
  },
  feed: {
    marginTop: '50px',
  },
  profilePic: {
    width: '130px',
    height: '130px',
    borderRadius: '100%',
    marginBottom: '10px',
  },
  divider: {
    marginTop: '30px',
  },
  editIcon: {
    cursor: 'pointer',
  },
  editProfilePicBtn: {
    display: 'none',
  },
  '@media (max-width: 768px)': {
    feed: {
      margin: '10px',
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user_name } = useParams();
  const user = useSelector((state) => state.profileState);
  const loggedInUser = useSelector((state) => state.user);
  const [profilePic, setProfilePic] = useState(null);
  const uploadProfilePicRef = useRef(null);
  const comment = useSelector((state) => state.commentInAPostState);

  useEffect(() => {
    setProfilePic(loggedInUser.userDetail.data.user.profile_pic);
  }, []);

  useEffect(() => {
    dispatch(getUserByUserName(user_name));
  }, [user_name, dispatch, loggedInUser, comment]);

  const handleOpenEditProfilePic = () => {
    uploadProfilePicRef.current.click();
  };

  const handleProfilePicUpload = (e) => {
    const imageName = `${Math.round(Math.random() * 1000000000000)}.jpeg`;
    const uploadImageTask = firebase
      .storage()
      .ref(`/users/${imageName}`)
      .put(e.target.files[0]);
    uploadImageTask.on(
      'state-changed',
      (snapshot) => {},
      (err) => console.log(err),
      () =>
        firebase
          .storage()
          .ref(`/users/${imageName}`)
          .getDownloadURL()
          .then((url) => {
            setProfilePic((image) => url);
            dispatch(updateProfile({ profile_pic: url }));
          })
    );
  };

  console.log(user.profileDetail);
  return user.profileDetail && loggedInUser.userDetail.data.user ? (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item md={4} sm={4} xs={12} />
      <Grid item md={4} sm={4} xs={12}>
        <Grid
          container
          item
          xs={12}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {/* <img
            className={classes.profilePic}
            alt="profile_pic"
            src="././assets/test_pic.jpg"
          /> */}

          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={
              user_name === loggedInUser.userDetail.data.user.user_name && (
                <EditIcon
                  className={classes.editIcon}
                  onClick={handleOpenEditProfilePic}
                  fontSize="small"
                />
              )
            }
          >
            <Avatar
              className={classes.profilePic}
              alt={user.profileDetail.data.user.name}
              src={
                user_name === loggedInUser.userDetail.data.user.user_name
                  ? profilePic
                  : user.profileDetail.data.user.profile_pic
              }
            />
          </Badge>
          <input
            className={classes.editProfilePicBtn}
            type="file"
            ref={uploadProfilePicRef}
            onChange={handleProfilePicUpload}
          />
          <Typography variant="body2" color="textPrimary" component="p">
            {user.profileDetail.data.user.user_name}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <Box fontWeight="fontWeightBold" m={1}>
              {user.profileDetail.data.user.name}
            </Box>
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {user.profileDetail.data.user.bio}
          </Typography>
          {user_name === loggedInUser.userDetail.data.user.user_name && (
            <EditProfile />
          )}
        </Grid>
        <Divider className={classes.divider} />
        <Grid className={classes.feed} item xs={12}>
          {user.profileDetail.data.user.posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user_name={user.profileDetail.data.user.user_name}
              user_id={user.profileDetail.data.user.id}
              profile_pic={user.profileDetail.data.user.profile_pic}
              content={post.content}
              likes={post.likes}
              image={post.image}
              commentOnPosts={post.commentOnPosts}
              comments={post.comments}
              createdAt={post.createdAt}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item md={4} sm={4} xs={12} />
    </Grid>
  ) : (
    <h1>Loading</h1>
  );
};

export default Profile;
