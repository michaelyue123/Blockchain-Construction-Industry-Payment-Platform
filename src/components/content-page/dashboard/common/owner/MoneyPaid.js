import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector } from 'react-redux';
import { utils } from '../../../../../actions';


// CSS style
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const MoneyPaid = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const summaryInfo = useSelector(state => state.dashboard_data_display.summaryInfo);
  let moneyPaid;

  if (user && user.status && summaryInfo){
    if (summaryInfo.totalPaidAmount){
      moneyPaid = String(utils.formatCurrency(summaryInfo.totalPaidAmount));
    }
    else {
      moneyPaid = 0;
    }
  }else{
    if (user && user.status){
      moneyPaid = 0;
    }else{
      moneyPaid = String(utils.formatCurrency(23000));
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
              Money Paid
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              ${moneyPaid}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MoneyPaid.propTypes = {
  className: PropTypes.string
};

export default MoneyPaid;
