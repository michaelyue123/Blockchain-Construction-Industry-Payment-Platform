import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from '../dashboard/navbar/';
import { alertActions } from '../../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { alertConstants } from '../../../constants';

// CSS style
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 40,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

// confirm users to update their profile 
function confirmStatus(dispatch) {
    let title = 'Don\'t forget to update your profile!';
    let text = 'You won\'t be able to use premium features if your profile is not updated!';
    let confirmButtonText = 'Yes, update it';
    let cancelButtonText = 'No, do it later';

    alertActions.warning(
      title, 
      text, 
      confirmButtonText, 
      cancelButtonText,
      (result) => {
        console.log(result);
        if(result.isConfirmed) {
          dispatch(confirmSuccess(result.isConfirmed));
        }
      }
    );   
}

// dispatch action to reducer to set value in redux
function confirmSuccess(status) { return { type: alertConstants.IS_CONFIRMED, status } }

const OwnerHome = () => {

  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const user = useSelector(state => state.authentication.user);
  const isConfirmed = useSelector(state => state.authentication.isConfirmed);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
      {
        isConfirmed === undefined ?
        (
          user === undefined ?
          <div />
          :
          (
            user.status === false ?
            confirmStatus(dispatch)
            :
            <div />
          )
        )
        :
        (
          isConfirmed === true ?
          <div />
          :
          confirmStatus(dispatch)
        )
      }
    </div>
  );
};

export default OwnerHome;
