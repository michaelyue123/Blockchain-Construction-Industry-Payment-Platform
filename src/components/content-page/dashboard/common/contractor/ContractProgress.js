import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import { useSelector } from 'react-redux';


// CSS style
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const ContractProgress = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector(state => state.authentication.user);
  const contractProgress = useSelector(state => state.dashboard_data_display.projectProgress);

  let showData;
  let labelArray;
  if (user && user.status && contractProgress){
    showData = [];
    labelArray = [];
    for(var i = 0; i<contractProgress.length; i++ ){
      labelArray.push(contractProgress[i].statusName);
      showData.push(contractProgress[i].count);
    }
  }else{
    if (user && user.status){
      showData = [0,0,0];
    }else{
      showData = [63, 15, 22];
    }
    labelArray = ['To Do', 'In Progress', 'Done']
  }

  const data = {
    datasets: [
      {
        data: showData,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: labelArray
  };

  const options = {
    animation: false,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      // borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: labelArray[0],
      value: showData[0],
      icon: FormatListNumberedIcon,
      color: colors.indigo[500]
    },
    {
      title: labelArray[1],
      value: showData[1],
      icon: TrendingUpIcon,
      color: colors.red[600]
    },
    {
      title: labelArray[2],
      value: showData[2],
      icon: AssignmentTurnedInOutlinedIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Contract Progress" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

ContractProgress.propTypes = {
  className: PropTypes.string
};

export default ContractProgress;
