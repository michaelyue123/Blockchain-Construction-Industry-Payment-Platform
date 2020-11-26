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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { useSelector } from 'react-redux';



// CSS style
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.grey[600],
    height: 56,
    width: 56
  }
}));

const OverallContractProgress = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const summaryInfo = useSelector(state => state.dashboard_data_display.summaryInfo);
  let overallContractProgress;
  if (user && user.status && summaryInfo){
    if (summaryInfo.overallContractProgress){
      overallContractProgress = summaryInfo.overallContractProgress;
    }
    else {
      overallContractProgress = 0;
    }
  }else{
    if (user && user.status){
      overallContractProgress = 0;
    }else{
      overallContractProgress = 30;
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
              Overall Contract Progress
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {overallContractProgress} %
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertDriveFileIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={overallContractProgress}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

OverallContractProgress.propTypes = {
  className: PropTypes.string
};

export default OverallContractProgress;
