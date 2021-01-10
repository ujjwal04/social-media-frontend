import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { updateProfile } from '../redux/users/userActions';

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [profileDetail, setProfileDetail] = useState({
    user_name: user.userDetail.data.user.user_name,
    email: user.userDetail.data.user.email,
    name: user.userDetail.data.user.name,
    bio: user.userDetail.data.user.bio,
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setProfileDetail((editForm) => ({
      ...editForm,
      [event.target.id]: event.target.value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(updateProfile(profileDetail));
    handleClose();
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            margin="dense"
            id="user_name"
            label="Username"
            value={profileDetail.user_name}
            onChange={handleChange}
            type="text"
            fullWidth
          /> */}
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            value={profileDetail.email}
            onChange={handleChange}
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            label="Name"
            value={profileDetail.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="bio"
            type="text"
            label="Bio"
            value={profileDetail.bio}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfile;
