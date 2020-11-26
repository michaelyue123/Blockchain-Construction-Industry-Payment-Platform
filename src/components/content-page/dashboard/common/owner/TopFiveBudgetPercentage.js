import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
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

const TopFiveBudget = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector(state => state.authentication.user)
  const projectBudget = useSelector(state => state.dashboard_data_display.projectBudget);


  let labelArray;
  let showData1;
  let showData2;
  let label1;
  let label2;
  if (user && user.status && projectBudget){
    showData1 = [];
    labelArray = [];
    showData2 = [];
    for(var i = 0; i<projectBudget.length; i++ ){
      if (user.role === 'owner'){
        showData1.push(projectBudget[i].paidAmount);
        showData2.push(projectBudget[i].unpaidAmount);
      }else{
        showData1.push(projectBudget[i].remainAmount);
        showData2.push(projectBudget[i].usedAmount);
      }
      labelArray.push(projectBudget[i].projectTitle);
    }

    if (user.role === 'owner'){
      label1 = "Paid Amount";
      label2 = "Unpaid Amount";
    }else{
      label1 = "Remain Amount";
      label2 = "Used Amount";
    }
  }else{
    if (user && user.status){
      showData1 = [];
      showData2 = [];
    }else{
      // mock data
      showData1 = [18, 5, 19, 27, 29, 30];
      showData2 = [11, 20, 12, 29, 30, 25, 13];
    }
    labelArray = ['Project One', 'Project Two', 'Project Three', 'Project Four', 'Project Five']
  }


  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: showData1,
        label: label1
      },
      {
        backgroundColor: colors.grey[200],
        data: showData2,
        label: label2
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
          barThickness: 25,
          maxBarThickness: 30,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
            callback: function(label) {
              if (/\s/.test(label)) {
                return label.split(" ");
              }else{
                return label;
              }              
            }
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
        title={
          user && user.role === 'owner' ?
          "Payment of Top 5 Latest Projects":
          "Budget of Top 5 Latest Projects"
        }
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
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

TopFiveBudget.propTypes = {
  className: PropTypes.string
};

export default TopFiveBudget;
