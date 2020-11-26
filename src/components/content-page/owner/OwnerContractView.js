import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import OwnerContract from './OwnerContract'; 


// CSS style
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: 'auto',
    marginTop: '5rem',
    marginBottom: '2rem'
  },
}));


const ContractView = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
        <Grid
        item
        lg={12}
        md={12}
        sm={8}
        xs={7}
        >
        <OwnerContract />
        </Grid>
    </Container>
  );
};

export default ContractView;
