import { API_URL } from '../constants';

export const invitationService = {
    inviteOthers
};

async function inviteOthers(userId, inviteList) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId, inviteList})
    };
    const response = await fetch(API_URL + "/user/sendInvitation", requestOptions);

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