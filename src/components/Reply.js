import React, { useState, useEffect } from 'react';

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
  reply: {
    marginTop: '10px',
  },
  '@media (max-width: 768px)': {
    feed: {
      margin: '10px',
    },
  },
}));

const Reply = ({ profile_pic, user_name, postDate, content }) => {
  const classes = useStyles();
  const [commentDate, setCommentDate] = useState(null);

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
  return (
    <Card className={classes.reply} component={Paper} elevation={3}>
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
      </CardContent>
    </Card>
  );
};

export default Reply;
