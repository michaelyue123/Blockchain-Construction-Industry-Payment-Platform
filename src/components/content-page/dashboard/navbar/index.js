import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
  BarChart as BarChartIcon,
  User as UserIcon,
  Folder as FolderIcon,
  UserPlus as UserPlusIcon,
  FilePlus as FilePlusIcon
} from 'react-feather';

import Avatar2 from '../../../images/avatars/avatar_2.png';
import Avatar6 from '../../../images/avatars/avatar_6.png';
import Avatar9 from '../../../images/avatars/avatar_9.png';
import { useSelector } from 'react-redux';

import NavItem from './NavItem';

const user = {
  jobTitle: '',
  name: ''
};

const items = [
  {
    href: '',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '',
    icon: UserIcon,
    title: 'Profile'
  },
  {
    href: '',
    icon: '',
    title: ''
  },
  {
    href: '',
    icon: '',
    title: ''
  },
  {
    href: '',
    icon: '',
    title: ''
  }
];


// CSS style
const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 82.5,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 80,
    height: 80
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const people = useSelector(state => state.authentication.user);

  if(people !== undefined) {
    if(people.role === "owner") {
      if(people.status === false) {
        user.jobTitle = "Project Owner";
        items[0].href = "/owner";
        items[1].href = "/ownerProfile";
        items[2].href = "/owner"; 
        items[3].href = "/owner"; 
        items[4].href = "/owner"; 
      }
      else {
        user.jobTitle = "Project Owner";
        items[0].href = "/owner";
        items[1].href = "/ownerProfile";
        items[2].icon = FolderIcon;
        items[2].title = "Project";
        items[3].icon = UserPlusIcon;
        items[3].title = 'Invitation';
        items[3].href = "/ownerInvitation"; 
        items[4].icon = FilePlusIcon;
        items[4].title = 'Contract';
        items[4].href = "/ownerContract"; 
      }
    }
    else if(people.role === "lead") {
      if(people.status === false) {
        user.jobTitle = "Project Lead";
        items[0].href = "/lead";
        items[1].href = "/leadProfile";
        items[2].href = "/lead"; 
        items[3].href = "/lead"; 
        items[4].href = "/lead"; 
      }
      else {
        user.jobTitle = "Project Lead";
        items[0].href = "/lead";
        items[1].href = "/leadProfile";
        items[2].icon = FolderIcon;
        items[2].title = "Project";
        items[3].icon = UserPlusIcon;
        items[3].title = 'Invitation';
        items[3].href = "/leadInvitation";
        items[4].icon = FilePlusIcon;
        items[4].title = 'Contract';
        items[4].href = "/ownerInvitation";  
      }
    }
    else {
      if(people.status === false) {
        user.jobTitle = "Contractor";
        items[0].href = "/contractor";
        items[1].href = "/contractorProfile";
        items[2].href = "/contractor"; 
        items[3].href = "/contractor"; 
        items[4].href = "/contractor";     
      }
      else {
        user.jobTitle = "Contractor";
        items[0].href = "/contractor";
        items[1].href = "/contractorProfile";
        items[2].icon = FolderIcon;
        items[2].href = "/ContractorContract";
        items[2].title = "Contract";
        items[3].icon = UserPlusIcon;
        items[3].title = 'Invitation';
        items[3].href = "/contractorInvitation"; 
        items[4].icon = FilePlusIcon;
        items[4].title = 'Contract';
        items[4].href = "/ownerInvitation";  
      }
    }
    user.name = people.firstName + " " + people.lastName;
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        {
          people !== undefined ?
          (
            people.role === "owner" ?
            <Avatar
              className={classes.avatar}
              component={RouterLink}
              src={Avatar2}
              to="/ownerProfile"
            />
            :
            (
              people.role === "lead" ? 
              <Avatar
                className={classes.avatar}
                component={RouterLink}
                src={Avatar6}
                to="/leadProfile"
              />
              :
              <Avatar
                className={classes.avatar}
                component={RouterLink}
                src={Avatar9}
                to="/contractorProfile"
              />
            )
          )
          : <div></div>
        }
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          <span style={{ fontSize: "2rem" }}>{user.name}</span>
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          <span style={{ fontSize: "1.5rem" }}>{user.jobTitle}</span>
        </Typography>
        
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {
            items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))
          }
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <div>  
      {people !== undefined ? 
        <>
          <Hidden lgUp>
            <Drawer
              anchor="left"
              classes={{ paper: classes.mobileDrawer }}
              onClose={onMobileClose}
              open={openMobile}
              variant="temporary"
            >
              {content}
            </Drawer>
          </Hidden>
          <Hidden mdDown>
            <Drawer
              anchor="left"
              classes={{ paper: classes.desktopDrawer }}
              open
              variant="persistent"
            >
              {content}
            </Drawer>
          </Hidden>
        </>
      :<></>} 
      
    </div>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};


export default NavBar;
