import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Post from './../components/Post';
import CreatePost from './../components/CreatePost';
import { fetchFeed } from './../redux/feed/feedActions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#F3F2EF',
  },
  feed: {
    marginTop: '80px',
  },
  createPostBtn: {
    width: '100%',
    marginBottom: '10px',
  },
  '@media (max-width: 768px)': {
    feed: {
      margin: '10px',
    },
  },
}));

const Feed = () => {
  const feedPosts = useSelector((state) => state.feed);
  const postState = useSelector((state) => state.createPostState);
  const dispatch = useDispatch();
  const classes = useStyles();
  const comment = useSelector((state) => state.commentInAPostState);
  const reply = useSelector((state) => state.replyState);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [postState, dispatch, comment, reply]);

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item md={4} sm={4} xs={12} />
      <Grid className={classes.feed} item md={4} sm={4} xs={12}>
        <CreatePost />
        {feedPosts.feedDetail
          ? feedPosts.feedDetail.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                user_name={post.user.user_name}
                profile_pic={post.user.profile_pic}
                user_id={post.user.id}
                content={post.content}
                likes={post.likes}
                image={post.image}
                comments={post.comments}
                commentOnPosts={post.commentOnPosts}
                createdAt={post.createdAt}
              />
            ))
          : null}
      </Grid>
      <Grid item md={4} sm={4} xs={12} />
    </Grid>
  );
};

export default Feed;
