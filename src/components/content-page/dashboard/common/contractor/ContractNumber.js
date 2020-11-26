import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import { useSelector } from 'react-redux';


// CSS style
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const ContractNumber = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const summaryInfo = useSelector(state => state.dashboard_data_display.summaryInfo)
  let contractNumber;
  if (user && user.status && summaryInfo){
    if (summaryInfo.contractNumber){
      contractNumber = summaryInfo.contractNumber;
    }else{
      contractNumber = 0;
    }
  }else{
    if (user && user.status){
      contractNumber = 0;
    }else{
      contractNumber = 6
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Contract Number
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {contractNumber}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ContractNumber.propTypes = {
  className: PropTypes.string
};

export default ContractNumber;
