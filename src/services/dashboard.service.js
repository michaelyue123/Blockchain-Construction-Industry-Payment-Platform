import { API_URL } from '../constants';

export const dashboardService = {
    summaryInfo,
    topFiveProject,
    projectProgress,
    topFiveProjectBudget,
    top5LatestContracts,
    marginsByMonth,
    retentionMoney
};


async function summaryInfo(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/summaryInfo", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}


async function retentionMoney(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/retention", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}

async function topFiveProject(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/top5ClosingProject", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}


async function projectProgress(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/totalProgress", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}


async function topFiveProjectBudget(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/budgetPercentage", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}

async function top5LatestContracts(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/contractWithProgress", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}

async function marginsByMonth(role, userId){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, userId})
    };

    const response = await fetch(API_URL + "/dashboard/profitByMonth", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}