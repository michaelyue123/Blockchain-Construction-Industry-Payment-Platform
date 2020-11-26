import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles,
  Accordion,
  AccordionSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProjectSubNavItem from './ProjectSubNavItem';
import ContractSubNavItem from './ContractSubNavItem';

import {
  FileText as FileTextIcon,
  FilePlus as FilePlusIcon,
  Info as InfoIcon
} from 'react-feather';

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
    marginLeft: theme.spacing(4),
    width: '1.8rem',
    height: 'auto'
  },
  projectIcon: {
    marginRight: theme.spacing(1.2),
  },
  title: {
    marginRight: 'auto',
    fontSize: '1.4rem'
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

const itemTwo = [
  {
    href: '',
    icon: FilePlusIcon,
    title: ''
  },
  {
    href: '',
    icon: InfoIcon,
    title: ''
  }
];

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);

  if(user !== undefined) {
    if(user.role === "owner") {
      if(title === "Project") {
        itemTwo[0].href = '/ownerCreateProject';
        itemTwo[0].title = 'Create Project';
        itemTwo[1].href = '/ownerViewProject';
        itemTwo[1].title = 'View Project';
      }
      else if (title === "Contract") {
        itemTwo[0].href = '/ownerContract';
        itemTwo[0].title = 'Create Contract';
        itemTwo[1].href = '/ownerViewProject';
        itemTwo[1].title = 'View Contract';
      }
    }
    else if(user.role === "lead") {

    }
    else {

    }
  }

  
  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >  
      {
        title === 'Project' ?
        <div>
          <Accordion 
            style={{ 
              WebkitBoxShadow: "none",
              MozBoxShadow: "none",
              boxShadow: "none",
              marginLeft: "1.8rem"
            }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.title} variant="h6" noWrap>
              <FileTextIcon
                size="22"
                className={classes.projectIcon}
              />
                {title}
              </Typography>
            </AccordionSummary>
            {
              itemTwo.map((item) => (
                <ProjectSubNavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))
            }
          </Accordion>
        </div>
        :
        (
          title === 'Contract' ?
          <div>
            <Accordion 
              style={{ 
                WebkitBoxShadow: "none",
                MozBoxShadow: "none",
                boxShadow: "none",
                marginLeft: "1.8rem"
              }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.title} variant="h6" noWrap>
                <FileTextIcon
                  size="22"
                  className={classes.projectIcon}
                />
                  {title}
                </Typography>
              </AccordionSummary>
              {
                itemTwo.map((item) => (
                  <ContractSubNavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                  />
                ))
              }
            </Accordion>
          </div>
          :
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
        )
      }  
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
