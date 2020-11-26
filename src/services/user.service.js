import { API_URL } from '../constants';

export const userService = {
    getUser,
    getCompany
};

async function getUser (userId, role, email) {
    const requentOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role, email })
    };

    const response = await fetch(API_URL + "/user/getUser", requentOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

async function getCompany (companyId) {
    const requentOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId })
    };

    const response = await fetch(API_URL + "/user/getCompany", requentOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            if(response.status === 401) {
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}