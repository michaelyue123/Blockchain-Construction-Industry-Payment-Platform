import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import { useSelector } from 'react-redux';


// CSS style
const useStyles = makeStyles(() => ({
  root: {}
}));

const MarginsByMonth = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector(state => state.authentication.user);
  const marginByMonth = useSelector(state => state.dashboard_data_display.marginByMonth);

  let forecast, margin, monthArray;
  let thisYear = new Date().getFullYear();
  let lastYear = thisYear-1;
  let fig_title ="Margins By Month("+lastYear+"-"+thisYear+")" ;

  if (user && user.status && marginByMonth){
    forecast = [];
    margin = [];
    monthArray = [];
    for(var i = 0; i<marginByMonth.length; i++ ){
      monthArray.push(marginByMonth[i].monthName);
      margin.push(marginByMonth[i].margin);
      forecast.push(marginByMonth[i].forecast);
    }
  }else{
    if (user && user.status){
      forecast = [];
      margin = [];
    }else{
      // mock data
      forecast = [18, 5, 19, 27, 29, 19, 20, 49, 35, 23, 10, 18, 18, 5, 19, 27, 29, 19, 20, 49, 35, 23, 10, 18];
      margin = [18, 5, 19, 27, 29, 18, 5, 19, 27, 29, 19, 20, 49, 35, 23, 10, 18, 19, 20, 49, 35, 23, 10, 18];
    }
    monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.red[200],
        borderColor: colors.red[300],
        data: forecast,
        label: 'Forecast',
        fill: false,
        steppedLine: false,
        lineTension: 0.2
      },
      {
        backgroundColor: colors.blue[200],
        borderColor: colors.blue[300],
        data: margin,
        label: 'Margin',
        fill: false,
        steppedLine: false,
        lineTension: 0.2
      }
    ],
    labels: monthArray
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
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
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
        title= {fig_title}
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      {/* <Divider />
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
      </Box> */}
    </Card>
  );
};

MarginsByMonth.propTypes = {
  className: PropTypes.string
};

export default MarginsByMonth;
