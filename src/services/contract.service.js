import { API_URL } from '../constants';

export const contractService = {
    getProjectList,
    createContract,
    getUserInfoByEmail
};

async function getProjectList(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    };
    const response = await fetch(API_URL + "/contract/getBriefProject", requestOptions);

    const response_1 = await handleResponse(response);
        
    return response_1;
}

async function createContract(email, password, projectId, contractTitle, partyAEmail, partyBEmail, startDate, 
                              dueDate, contractAmount, contractGst, retentionAmount, claimDate, description) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, projectId, contractTitle, partyAEmail, partyBEmail, startDate, dueDate, 
            contractAmount, contractGst, retentionAmount, claimDate, description})
    };
    const response = await fetch(API_URL + "/contract/add", requestOptions);

    const response_1 = await handleResponse(response);
        
    return response_1;
}

async function getUserInfoByEmail(email, password, companyId) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, companyId})
    };
    const response = await fetch(API_URL + "/contract/getUserInfoByEmail", requestOptions);

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