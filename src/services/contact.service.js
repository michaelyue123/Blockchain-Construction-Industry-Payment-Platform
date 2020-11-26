import { API_URL } from '../constants';

export const contactService = {
    sendContactService
};

async function sendContactService (name, email, phone, message) {
    const requentOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
    };

    const response = await fetch(API_URL + "/common/contact", requentOptions);
    const response_1 = await handleResponse(response);
    return response_1;
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            if(response.status === 401) {
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}