import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useSelector } from 'react-redux';


const TopFiveProjects = ({ className, ...rest }) => {
  
  const theme = useTheme();
  const user = useSelector(state => state.authentication.user);
  const top5ClosingProject = useSelector(state => state.dashboard_data_display.top5ClosingProject);

  let labelArray;
  let showData;
  if (user && user.status && top5ClosingProject){
    showData = [];
    labelArray = [];
    for(var i = 0; i<top5ClosingProject.length; i++ ){
      showData.push(top5ClosingProject[i].progress);
      labelArray.push(top5ClosingProject[i].projectTitle);
    }
  }else{
    if (user && user.status){
      showData = [];
    }else{
      // mock data
      showData = [18, 5, 19, 27, 29, 30];
    }
    labelArray = ['Project One', 'Project Two', 'Project Three', 'Project Four', 'Project Five']
  }

  const data = {
    datasets: [
      {
        label: "Progress",
        backgroundColor: colors.indigo[500],
        data: showData
      }
    ],

    labels: labelArray
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            callback: function(value) {
              return value + '%';
            },
            min: 0,
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          barThickness: 25,
          maxBarThickness: 30,
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card
      className={clsx(className)}
      {...rest}
    >
      <CardHeader
        title="Top 5 Latest Projects"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <HorizontalBar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          More
        </Button>
      </Box>
    </Card>
  );
};

TopFiveProjects.propTypes = {
  className: PropTypes.string
};

export default TopFiveProjects;
