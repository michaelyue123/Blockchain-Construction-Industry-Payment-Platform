import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  Box,
  CardContent,
  LinearProgress,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { useSelector } from 'react-redux';



// CSS style
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const OverallProjectProgress = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const summaryInfo = useSelector(state => state.dashboard_data_display.summaryInfo)
  let overallProjectProgress;

  if (user && user.status && summaryInfo){
    if (summaryInfo.overallProjectProgress){
      overallProjectProgress = (summaryInfo.overallProjectProgress);
    }
    else {
      overallProjectProgress = 0;
    }
  }else{
    if (user && user.status){
      overallProjectProgress = 0;
    }else{
      overallProjectProgress = 50;
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
              Overall Project Progress
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {overallProjectProgress}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={overallProjectProgress}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

OverallProjectProgress.propTypes = {
  className: PropTypes.string
};

export default OverallProjectProgress;
