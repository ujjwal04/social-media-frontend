import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';

import LikeButton from './LikeButton';
import Comment from './Comment';
import { commentOnAPost } from './../redux/comment/commentActions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#F3F2EF',
  },
  feed: {
    marginTop: '10px',
  },
  media: {
    width: '100%',
    height: '400px',
  },
  post: {
    marginBottom: '20px',
  },
  cardContent: {
    paddingBottom: 0,
  },
  cardActions: {
    paddingTop: 0,
  },
  likeStats: {
    marginTop: '20px',
  },
  cardHeader: {
    cursor: 'pointer',
  },
  commentInput: {
    display: 'flex',
    marginBottom: '20px',
  },
  comment: {
    marginTop: '10px',
  },
  '@media (max-width: 768px)': {
    feed: {
      margin: '10px',
    },
  },
}));

const Post = ({
  id,
  user_name,
  profile_pic,
  content,
  likes,
  comments,
  image,
  createdAt,
  commentOnPosts,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [commentContent, setCommentContent] = useState(null);
  const [postDate, setPostDate] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const submitComment = () => {
    dispatch(commentOnAPost(id, commentContent));
  };
  useEffect(() => {
    const months = [
      'Jan',
      'Fed',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(createdAt);
    setPostDate(
      `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    );
  }, [createdAt]);

  const handleProfileClick = () => {
    history.push(`/${user_name}`);
  };
  return (
    <Card className={classes.post} component={Paper} elevation={3}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar src={profile_pic} />}
        title={user_name}
        subheader={postDate}
        onClick={handleProfileClick}
      />
      {image !== 'image' && (
        <CardMedia className={classes.media} image={image} title="Pic" />
      )}
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
        <Typography
          className={classes.likeStats}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <b>{likes} </b>likes &nbsp;&nbsp;<b>{comments}</b> comments
        </Typography>
        <Divider />
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton>
          <LikeButton post_id={id} />
        </IconButton>
        <IconButton>
          <CommentIcon onClick={handleExpandClick} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.commentInput}>
            <TextField
              type="text"
              placeholder="Type a comment"
              value={commentContent}
              onChange={handleCommentChange}
              fullWidth
            />
            <SendIcon onClick={submitComment} />
          </div>
          {commentOnPosts &&
            commentOnPosts.length > 0 &&
            commentOnPosts.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                replies={comment.replies}
                profile_pic={comment.user.profile_pic}
                user_name={comment.user.user_name}
                postDate={comment.createdAt}
                content={comment.content}
                replyOnComments={comment.replyOnComments}
              />
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
