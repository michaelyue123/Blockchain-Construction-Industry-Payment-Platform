import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../Page';
import ViewContract from './ViewContract'; 

// CSS style
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5),
    marginTop: "2rem",
  }
}));

const ContractListView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="View Projects"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ViewContract />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ContractListView;
