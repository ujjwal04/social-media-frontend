import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FavouriteIcon from '@material-ui/icons/Favorite';

import { likeOnAPost, unlikeOnAPost } from './../redux/likes/likeActions';

const LikeButton = ({ post_id }) => {
  const likeState = useSelector((state) => state.likeOnAPostState);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likeState.likeDetail && likeState.likeDetail.length > 0) {
      const index = likeState.likeDetail.findIndex(
        (like) => like.post_id === post_id
      );
      if (index === -1) setLiked(false);
      else {
        setLiked(true);
      }
    } else setLiked(false);
  }, [post_id, likeState.likeDetail]);

  const handleLike = (type, emoji, post_id) => {
    dispatch(likeOnAPost(type, emoji, post_id));
  };

  const handleUnike = (post_id) => {
    dispatch(unlikeOnAPost(post_id));
  };

  return liked ? (
    <FavouriteIcon color="error" onClick={() => handleUnike(post_id)} />
  ) : (
    <FavouriteIcon onClick={() => handleLike('post', 'like', post_id)} />
  );
};

export default LikeButton;
