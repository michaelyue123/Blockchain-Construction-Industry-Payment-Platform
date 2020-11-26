import { API_URL } from '../constants';

export const authService = {
    login,
    registerUser,
    updateProfile
};

async function login(email, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    };

    const response = await fetch(API_URL + "/user/login", requestOptions);
    const response_1 = await handleResponse(response);

    return response_1;
}

async function registerUser(role, firstName, lastName, email, password, phone, abn, companyVba, companyName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role, firstName, lastName, email, password, phone, abn, companyVba, companyName})
    };
    
    const response = await fetch(API_URL + "/user/register", requestOptions);

    const response_1 = await handleResponse(response);
        
    return response_1;
}

async function updateProfile(formDate) {
    const requestOptions = {
        method: 'POST',
        body: formDate
    };
    
    const response = await fetch(API_URL + "/user/profileUpdate", requestOptions);

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