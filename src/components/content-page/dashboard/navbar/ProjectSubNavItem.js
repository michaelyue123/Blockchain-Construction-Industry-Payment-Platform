import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles,
  List
} from '@material-ui/core';
import { useSelector } from 'react-redux';


// CSS style
const useStyles = makeStyles((theme) => ({
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      justifyContent: 'flex-start',
      letterSpacing: 0,
      padding: '10px 8px',
      textTransform: 'none',
      width: '100%'
    },
    icon: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(2),
      width: '1.3rem',
      height: 'auto'
    },
    title: {
      marginRight: 'auto',
      fontSize: '1.2rem'
    },
    active: {
      color: theme.palette.primary.main,
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      },
      '& $icon': {
        color: theme.palette.primary.main
      }
    }
}));

const ProjectSubNavItem = ({ 
    className,
    href,
    icon: Icon,
    title,
    ...rest }) => {
    
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);

    if(user) {
      if(user.role === "owner") {
        if(title === "Create Project") {
          href = '/ownerCreateProject';
        }
        else if(title === "View Project") {
          href = '/ownerViewProject';
        }  
        else {
          href = '/ownerInvitation';
        }
      }
      else if(user.role === "lead") {
        if(title === "Create Project") {
          href = '/leadCreateProject';
        }
        else if(title === "View Project") {
          href = '/leadViewProject';
        } 
        else {
          href = '/leadInvitation';
        } 
      }
      else {}
    }

    return (
      <List style={{ marginBottom: "-1rem", marginTop: "-1.5rem" }}>
        <ListItem
          className={clsx(classes.item, className)}
          disableGutters
          {...rest}
        >    
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={RouterLink}
            to={href}
          >
            {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
            )}
            <span className={classes.title}>
              {title}
            </span>
          </Button>
        </ListItem>
      </List>
    ); 
}

ProjectSubNavItem.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string
};
  

export default ProjectSubNavItem;