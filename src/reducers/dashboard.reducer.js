import { dashboardConstants } from '../constants';

const initialState = {};

// reducer for different dashboard contents
export function dashboard_data_display (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case dashboardConstants.SUMMARY_INFO_SUCCESS:
            return {
                summaryInfo: action.summaryInfo
            };
        case dashboardConstants.SUMMARY_INFO_FAILURE:
            return {};
        case dashboardConstants.RETENTION_MONEY_SUCCESS:
            return {
                summaryInfo: state.summaryInfo,
                retentionMoney: action.retentionMoney
            };
        case dashboardConstants.RETENTION_MONEY_FAILURE:
            return {};
        case dashboardConstants.TOP_FIVE_PROJECTS_SUCCESS:
            return {
                summaryInfo: state.summaryInfo,
                retentionMoney: state.retentionMoney,
                top5ClosingProject: action.top5ClosingProject
            };
        case dashboardConstants.TOP_FIVE_PROJECTS_FAILURE:
            return {};
        case dashboardConstants.PROJECT_PROGRESS_SUCCESS:
            return {
                summaryInfo: state.summaryInfo,
                retentionMoney: state.retentionMoney,
                top5ClosingProject: state.top5ClosingProject,
                projectProgress: action.projectProgress,
                top5Contracts: state.top5Contracts
            };
        case dashboardConstants.PROJECT_PROGRESS_FAILURE:
            return {};
        case dashboardConstants.BUDGET_OF_TOP_FIVE_PROJECTS_SUCCESS:
            return {
                summaryInfo: state.summaryInfo,
                retentionMoney: state.retentionMoney,
                top5ClosingProject: state.top5ClosingProject,
                projectProgress: state.projectProgress,
                projectBudget: action.top5ProjectBudget
            };
        case dashboardConstants.TOP_FIVE_CONTRACTS_SUCCESS:
            return {
                summaryInfo: state.summaryInfo,
                top5Contracts: action.top5Contracts
            }
        case dashboardConstants.MARGIN_BY_MONTH_SUCCESS:
            return {
                summaryInfo: state.summaryInfo,
                retentionMoney: state.retentionMoney,
                top5Contracts: state.top5Contracts,
                top5ClosingProject: state.top5ClosingProject,
                projectBudget: state.projectBudget,
                projectProgress: state.projectProgress,
                marginByMonth: action.marginByMonth
            }
        default:
            return state;
    }
}