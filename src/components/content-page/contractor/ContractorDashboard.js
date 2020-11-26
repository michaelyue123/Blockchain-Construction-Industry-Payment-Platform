import React from 'react';
import { Container, Grid, makeStyles} from '@material-ui/core';
import Page from '../Page';
import ContractNumber from '../dashboard/common/contractor/ContractNumber';
// import LatestOrders from './LatestOrder';
// import LatestProducts from './LatestProduct';
import TopFiveContract from '../dashboard/common/contractor/TopFiveContract';
import TotalContractAmount from '../dashboard/common/contractor/TotalContractAmount';
import MarginSummary from '../dashboard/common/contractor/MarginSummary';
import OverallContractProgress from '../dashboard/common/contractor/OverallContractProgress';
import ContractProgress from '../dashboard/common/contractor/ContractProgress';
import MarginsByMonth from '../dashboard/common/contractor/MarginsByMonth';
import '../../styles/content-page/ContentPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardService } from '../../../services';
import { dashboardConstants } from '../../../constants';


// style web page
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
function top5LatestContracts_success(top5Contracts) {
    return { type: dashboardConstants.TOP_FIVE_CONTRACTS_SUCCESS, top5Contracts }
}

// dispatch action to reducer to set value in redux
function projectProgress_success(projectProgress) {
    return { type: dashboardConstants.PROJECT_PROGRESS_SUCCESS, projectProgress }
}

// dispatch action to reducer to set value in redux
function marginsByMonth_success(marginByMonth) {
    return { type: dashboardConstants.MARGIN_BY_MONTH_SUCCESS, marginByMonth }
}

const ContractorDashboard = () =>  {

    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    // Call API to fetch Data
    if (user && user.status){
        dashboardService.summaryInfo(user.role, user.userId).then(
            result => {
                if (result.resultCode === 10403001) {
                    dispatch(summaryInfo_success(result.returnObj));
                }   

                dashboardService.top5LatestContracts(user.role, user.userId).then(
                    result => {
                        if (result.resultCode === 10406001) {
                            dispatch(top5LatestContracts_success(result.returnObj));
                        }

                        dashboardService.projectProgress(user.role, user.userId).then(
                            result => {
                                if (result.resultCode === 10407001) {
                                    dispatch(projectProgress_success(result.returnObj));
                                }

                                dashboardService.marginsByMonth(user.role, user.userId).then(
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
        );
    }


    return(
        <Page className={classes.root} title="ContractorDashboard">
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
                        <ContractNumber />
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
                        <TotalContractAmount />
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
                        lg={7}
                        md={7}
                        xl={7}
                        xs={12}
                    >
                        <TopFiveContract />
                    </Grid>
                    <Grid
                        item
                        lg={5}
                        md={5}
                        xl={5}
                        xs={12}
                    >
                        <ContractProgress />
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

export default ContractorDashboard;