import { API_URL } from '../constants';

export const projectService = {
    createProject
};

async function createProject(ownerId, projectTitle, street, description, suburb, postcode, state, dueDate,
    startDate, projectAmount, projectBsb, projectAccount, invitations) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ownerId, projectTitle, street, description, suburb, postcode, state, dueDate,
            startDate, projectAmount, projectBsb, projectAccount, invitations})
    };
    const response = await fetch(API_URL + "/project/add", requestOptions);

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