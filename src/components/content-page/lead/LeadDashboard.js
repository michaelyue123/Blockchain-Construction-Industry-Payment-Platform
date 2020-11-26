import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../Page';
import ProjectNumber from '../dashboard/common/owner/ProjectNumber';
// import LatestOrders from './LatestOrder';
// import LatestProducts from './LatestProduct';
import TopFiveProjects from '../dashboard/common/owner/TopFiveProjects';
import TopFiveBudgetPercentage from '../dashboard/common/owner/TopFiveBudgetPercentage';
import OverallContractProgress from '../dashboard/common/contractor/OverallContractProgress';
import OverallProjectProgress from '../dashboard/common/owner/OverallProjectProgress';
import ProjectProgress from '../dashboard/common/owner/ProjectProgress';
import MarginSummary from '../dashboard/common/contractor/MarginSummary';
import MarginsByMonth from '../dashboard/common/contractor/MarginsByMonth';
import RetentionMoneyList from '../dashboard/common/owner/RetentionMoneyList';
import '../../styles/content-page/ContentPage.css';
import { useSelector } from 'react-redux';
import { dashboardService } from '../../../services';
import { dashboardConstants } from '../../../constants';
import { useDispatch } from 'react-redux';


// CSS style
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
    }
}));


// dispatch action to reducer to set value in redux
function summaryInfo_success(summaryInfo) {
    return { type: dashboardConstants.SUMMARY_INFO_SUCCESS, summaryInfo }
}

// dispatch action to reducer to set value in redux
function top5ClosingProject_success(top5ClosingProject) {
    return { type: dashboardConstants.TOP_FIVE_PROJECTS_SUCCESS, top5ClosingProject }
}

// dispatch action to reducer to set value in redux
function projectProgress_success(projectProgress) {
    return { type: dashboardConstants.PROJECT_PROGRESS_SUCCESS, projectProgress }
}

// dispatch action to reducer to set value in redux
function top5ProjectBudget_success(top5ProjectBudget) {
    return { type: dashboardConstants.BUDGET_OF_TOP_FIVE_PROJECTS_SUCCESS, top5ProjectBudget }
} 

// dispatch action to reducer to set value in redux
function marginsByMonth_success(marginByMonth) {
    return { type: dashboardConstants.MARGIN_BY_MONTH_SUCCESS, marginByMonth }
}

// dispatch action to reducer to set value in redux
function retentionMoney(retentionMoney) {
    return { type: dashboardConstants.RETENTION_MONEY_SUCCESS, retentionMoney }
}

const LeaderDashboard = () =>  {

    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    let role = user.role;
    let userId = user.userId;

    // Call API to fetch data
    dashboardService.summaryInfo(role, userId)
    .then(
        result => {
            if (result.resultCode === 10403001) {
                dispatch(summaryInfo_success(result.returnObj));
            }

            dashboardService.retentionMoney(role, userId)
            .then(
                result => {
                    if(result.resultCode === 10408001) {
                        dispatch(retentionMoney(result.returnObj));
                    }

                    dashboardService.topFiveProject(role, userId)
                    .then(
                        result => {
                            if (result.resultCode === 10404001) {
                                dispatch(top5ClosingProject_success(result.returnObj));
                            }

                            dashboardService.projectProgress(role, userId)
                            .then(
                                result => {
                                    if (result.resultCode === 10407001) {
                                        dispatch(projectProgress_success(result.returnObj));
                                    }

                                    dashboardService.topFiveProjectBudget(role, userId)
                                    .then(
                                        result => {
                                            if (result.resultCode === 10402001) {
                                                dispatch(top5ProjectBudget_success(result.returnObj));
                                            }
                                            
                                            dashboardService.marginsByMonth(user.role, user.userId)
                                            .then(
                                                result => {
                                                    if (result.resultCode === 10405001) {
                                                        dispatch(marginsByMonth_success(result.returnObj));      
                                                    }
                                                }
                                            )    
                                        }
                                    )    
                                }
                            )    
                        }
                    )
                }
            )    
        }
    )  

    return(
        <Page className={classes.root} title="LeadDashboard">
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    {
                        user.status === false ?
                        <Grid 
                            item
                            lg={12}
                            sm={12}
                            xl={12}
                            xs={12}
                            style={{ backgroundColor: 'red' }}
                            className="text-center"
                        >
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>Please update your profile!</span>
                        </Grid>
                        :
                        <div></div>
                    }
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <ProjectNumber />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <MarginSummary />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <OverallProjectProgress />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <OverallContractProgress />
                    </Grid>

                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <RetentionMoneyList />
                    </Grid>

                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <TopFiveProjects />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={12}
                    >
                        <TopFiveBudgetPercentage />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={12}
                    >
                        <ProjectProgress />
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <MarginsByMonth />
                    </Grid>
                </Grid>
            </Container>
        </Page>  
    )  
}

export default LeaderDashboard;