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
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useSelector } from 'react-redux';


// CSS style
const useStyles = makeStyles(() => ({
  root: {}
}));

const TopFiveContract = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector(state => state.authentication.user);
  const top5Contracts = useSelector(state => state.dashboard_data_display.top5Contracts);

  let labelArray;
  let showData;
  if (user && user.status && top5Contracts){
    showData = [];
    labelArray = [];
    for(var i = 0; i<top5Contracts.length; i++ ){
      showData.push(top5Contracts[i].progress);
      labelArray.push(top5Contracts[i].contractName);
    }
  }else{
    if (user && user.status){
      showData = [];
    }else{
      // mock data
      showData = [18, 5, 19, 27, 29, 30];
    }
    labelArray = ['Contract One', 'Contract Two', 'Contract Three', 'Contract Four', 'Contract Five']
  }


  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: showData,
        label: 'This year'
      }
    ],
    labels: labelArray
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
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
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Top 5 Latest Contracts"
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

TopFiveContract.propTypes = {
  className: PropTypes.string
};

export default TopFiveContract;
