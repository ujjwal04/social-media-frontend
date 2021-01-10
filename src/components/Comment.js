import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
import Reply from './Reply';

import { reply } from './../redux/replies/replyActions';

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

const Comment = ({
  id,
  profile_pic,
  user_name,
  postDate,
  content,
  replies,
  replyOnComments,
}) => {
  const classes = useStyles();
  const [commentDate, setCommentDate] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [replyContent, setReplyContent] = useState(false);
  const dispatch = useDispatch();

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
    const date = new Date(postDate);
    setCommentDate(
      `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    );
  }, [postDate]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const submitReply = () => {
    dispatch(reply(id, replyContent));
  };

  return (
    <Card className={classes.comment} component={Paper} elevation={3}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar src={profile_pic} />}
        title={user_name}
        subheader={commentDate}
      />
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
          <b>{replies}</b> replies
        </Typography>
        <Divider />
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton>
          <CommentIcon onClick={handleExpandClick} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.commentInput}>
            <TextField
              type="text"
              placeholder="Type a reply"
              value={replyContent}
              onChange={handleReplyChange}
              fullWidth
            />
            <SendIcon onClick={submitReply} />
          </div>
          {replyOnComments &&
            replyOnComments.length > 0 &&
            replyOnComments.map((comment) => (
              <Reply
                profile_pic={comment.user.profile_pic}
                user_name={comment.user.user_name}
                postDate={comment.createdAt}
                content={comment.content}
              />
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Comment;
