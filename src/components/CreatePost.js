import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';

import firebase from './../utils/firebase';
import { post } from './../redux/posts/postActions';

const useStyles = makeStyles(() => ({
  createPostBtn: {
    width: '100%',
    marginBottom: '10px',
  },
  imagePreview: {
    width: '100%',
    height: '300px',
  },
  '@media (max-width: 768px)': {},
}));

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setContent(null);
    setImage(null);
    setOpen(false);
  };

  const handlePostContent = (e) => {
    setContent((content) => e.target.value);
  };

  const handlePostImage = (e) => {
    setImage((image) => e.target.files[0]);
    setPreviewImage((preview) => URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    if (image) {
      const imageName = `${Math.round(Math.random() * 1000000000000)}.jpeg`;
      const uploadImageTask = firebase
        .storage()
        .ref(`/posts/${imageName}`)
        .put(image);
      uploadImageTask.on(
        'state-changed',
        (snapshot) => {},
        (err) => console.log(err),
        () =>
          firebase
            .storage()
            .ref(`/posts/${imageName}`)
            .getDownloadURL()
            .then((url) => {
              dispatch(post(content, url));
              setContent(null);
              setImage(null);
              setOpen(false);
            })
      );
    } else {
      dispatch(post(content, 'image'));
      setContent(null);
      setImage(null);
      setOpen(false);
    }
  };

  //const uploadImage = () => {};

  return (
    <>
      <Button
        className={classes.createPostBtn}
        variant="contained"
        color="primary"
        startIcon={<PostAddIcon />}
        onClick={handleClickOpen}
      >
        Create Post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="content"
            label="Content"
            value={content}
            onChange={handlePostContent}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            type="file"
            onChange={handlePostImage}
            fullWidth
          />
        </DialogContent>
        {previewImage && (
          <DialogContent>
            <img
              className={classes.imagePreview}
              alt="Post"
              src={previewImage}
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePost;
