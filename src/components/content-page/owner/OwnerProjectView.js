import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import OwnerProject from './OwnerProject'; 

// CSS style
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minWidth: '50rem',
    height: 'auto',
    marginTop: '5rem',
    marginBottom: '2rem',
    [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(22),
    },
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(25),
    },
    [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(30),
    },
  },
}));


const ProjectView = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg">
        <Grid
        item
        lg={10}
        md={10}
        sm={8}
        xs={7}
        >
        <OwnerProject />
        </Grid>
    </Container>
  );
};

export default ProjectView;
