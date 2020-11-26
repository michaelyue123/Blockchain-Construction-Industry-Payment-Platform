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
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  }
}));

const MarginSummary = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const summaryInfo = useSelector(state => state.dashboard_data_display.summaryInfo);
  let margin;

  if (user && user.status && summaryInfo){
    if (summaryInfo.totalMargin){
      margin = String(utils.formatCurrency(summaryInfo.totalMargin));
    }
    else {
      margin = 0;
    }
  }else{
    if (user && user.status){
      margin = 0;
    }else{
      margin = String(utils.formatCurrency(23000));
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
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Margin Summary
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              $ {margin}
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

MarginSummary.propTypes = {
  className: PropTypes.string
};

export default MarginSummary;
