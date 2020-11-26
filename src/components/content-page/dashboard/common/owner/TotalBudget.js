import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector } from 'react-redux';
import { utils } from '../../../../../actions';


// CSS style
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalBudget = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const summaryInfo = useSelector(state => state.dashboard_data_display.summaryInfo);
  let totalBudget;

  if (user && user.status && summaryInfo){
    if (summaryInfo.totalBudget){
      totalBudget = String(utils.formatCurrency(summaryInfo.totalBudget));
    }
    else {
      totalBudget = 0;
    }
  }else{
    if (user && user.status){
      totalBudget = 0;
    }else{
      totalBudget = String(utils.formatCurrency(200000));
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
              Total Budget
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              ${totalBudget}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
        </Box>
      </CardContent>
    </Card>
  );
};

TotalBudget.propTypes = {
  className: PropTypes.string
};

export default TotalBudget;
