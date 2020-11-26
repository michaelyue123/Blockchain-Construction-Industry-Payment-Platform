import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';


import Avatar2 from '../../images/avatars/avatar_2.png';
import Avatar6 from '../../images/avatars/avatar_6.png';
import Avatar9 from '../../images/avatars/avatar_9.png';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: '',
  name: ''
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const people = useSelector(state => state.authentication.user);
  let photo;

  // check role after user's login and render pages accordingly
  if(people !== undefined) {
    if(people.role === "owner") {
      user.jobTitle = "Project Owner";
      photo = Avatar2;
    }
    else if(people.role === "lead") {
      user.jobTitle = "Project Lead";
      photo = Avatar6;
    }
    else {
      user.jobTitle = "Contractor";
      photo = Avatar9;
    }
    user.name = people.firstName + " " + people.lastName;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={photo}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
